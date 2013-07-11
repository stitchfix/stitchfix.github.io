---
layout: posts
title: "Getting OmniAuth with Google Apps to Work on Heroku"
author: "Dave Copeland"
date: 2013-07-11 11:01
published: true
categories: 
---

At [Stitch Fix][stitchfix], we outsource pretty much _all_ of our hosting and technical needs to Heroku or their add-ons.  Given
where we are now as a company, it makes total sense: we don't need to hire an admin, we don't need to adminster actual boxes, and
we can easily add/remove/change our technical infrastructure.  If you are a small startup and you are messing with Linode slices,
   you are probably wasting time.

One thing Heroku doesn't provide out of the box is a login system for "internal" users.  The vast majority of the software at
Stitch Fix is targeted at Stitch Fix employees - to operate the warehouse, choose what goes into a fix, etc.  The natural way to
allow them to login is via Google Apps.  We can use everyone's existing username/password, and employees can be added during
onboarding and removed when they leave the company, all in one place.

Getting it to work with our Rails apps _seemed_ easy enough with [OmniAuth], but it turned out to be a lot trickier, resulting in
random failures with the oh-so-helpful error "invalid_credentials".  Here's how to fix that, and why you can't just use the
out-of-box configurations recommend by OmniAuth.

<!-- more -->

_tl;dr scroll down_

This is not a dig at OmniAuth - it's super awesome.  It's just that it bakes in a lot of assumptions that may not hold if you are using Heroku or are following the [12-factor][12factor] app architecture.   You end up needing to know a bit more about how things are working, and you have to stop trusting default configurations.

First, the general setup of OmniAuth recommends this:

{% highlight ruby %}
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_apps, domain: 'your-domain.com'  
end
{% endhighlight %}

We use the [omniauth-google-apps] gem, which is a very thin extension of [omniauth-openid] that makes setup a bit simpler, and
allows us to only allow Stitch Fix employees access to our systems.

This setup has issues with SSL certificates, so we need to tell OpenID where the CA file is, and we just use curl's, checked-into
our source code because of Wacky Heroku Thing #1 - no guarantees about what's on the Dynos.

{% highlight ruby %}
require 'openid/fetchers'
OpenID.fetcher.ca_file = File.join(Rails.root,'config','curl.pem')
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_apps, domain: 'your-domain.com'  
end
{% endhighlight %}

We can't just assume that `curl` is even installed, much less make any assumptions about where the `pem` file is, so we have to
include it.  Another option would be to provide an environment variable based on where we know it is on the Dyno, but this seemed
simpler.

Now, the problem with this setup vis-a-vis Heroku is that there's a configuration option being set that is not apparent, because
OmniAuth/OpenID is using what it believes to be a sensible default, but is, in fact, not correct.  

OpenID requires the ability to store information server-side so that, after you are redirected back from the auth provider
(Google, in our case), the server can find this information and complete the login.  _How_ this information is stored can be
configured via the `:store` option to `provider`.  The default is an in-memory store, so it's equivalent to this:

{% highlight ruby %}
provider :google_apps, domain: 'your-domain.com', store: OpenID::Store::Memory.new
{% endhighlight %}

For development, this seems reasonable - it doesn't require any setup - but for deployment, it's Just Wrong, which we can tell by
reading the RubyDoc of the `OpenID::Store::Memory` class from `ruby-openid`:

{% highlight ruby %}
# An in-memory implementation of Store.  This class is mainly used
# for testing, though it may be useful for long-running single
# process apps.  Note that this store is NOT thread-safe.
#
# You should probably be looking at OpenID::Store::Filesystem
{% endhighlight %}

We'll get to `OpenID::Store::Filesystem`, but what's wrong with the memory store?

Let's assume Unicorn as the server (as
recommended for the Cedar stack for Rails apps).  The recommended configuration allows three unicorn processes per Dyno, which
gives use three processes, each with it's own separate memory space.

Because unicorn uses _process-based_ concurrency, which means that, when a new process is started, it gets a _copy_ of the parent's
memory, all three unicorns on a single Dyno *do not* share memory. Meaning if process 1 started the OpenID dance, but, after
redirect, your request was handled by process 2, it doesn't have the necessary information stored in memory.  Boom!
invalid_credentails error.  

So, what about that filesystem-based one?
OmniAuth's docs *do* mention `OpenID::Store::Filesystem`, but it's still wrong on Heroku.  Why?

Here's how we'd set up the filesystem-based store:

{% highlight ruby %}
provider :google_apps, 
         domain: 'your-domain.com', 
         store: OpenID::Store::Filesystem.new(File.join(Rails.root,'tmp'))
{% endhighlight %}

We can't even be guaranteed of `/tmp` existing, so we set up the store inside our Rails app.  This configuration works great in
development, because I'm running my server on one machine - all three Unicorn processes share the same data store.  

If we deployed to Heroku using just one Dyno, this would work.  However, the second we scale up our app to use more Dynos, the
entire thing falls apart.  Why?

Two reasons:

* filesystem is ephemeral - it could go away at any moment.  Between redirects it's possible (however unlikely) that the files go
away.
* Dynos don't share filesystems.  Even if we *could* guarantee the filesystem would live forever, you still run the risk that
your OpenID dance will be handled by two different Dynos, and thus: invalid_credentials.

This is especially nasty because you might run your app for quite a while on one Dyno, thinking things are working when, instead,
you're sitting on a ticking timebomb.

What we need as a centralized place to store this information, accessible to all Dynos and that persists across reboots.  This brings us to the third option included with `ruby-openid`, which is `OpenID::Store::Memcache`.

Of course, we can't just plop `store: OpenID::Store::Memcache.new` into our configuration.  We first need to add memcache to our app, and then extract the needed connection parameters from the environment.  We also need to provide a memcache client object.

On Heroku, they recommend Dalli - strongly - so I went with that.  The interface that `OpenID::Store::Memcache` expects from the
memcache client is supported by Dalli, so we're off to the races:

    $ heroku addons:add memcache

{% highlight ruby %}
gem 'dalli'
{% endhighlight %}

{% highlight ruby %}
require 'openid/fetchers'
require 'openid/store/filesystem'
require 'openid/store/memcache'
require 'dalli'

OpenID.fetcher.ca_file = File.join(Rails.root,'config','curl.pem')

Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.staging? || Rails.env.production? || ENV['OPENID_STORE'] == 'memcache'
    # Locally, these env vars will be blank, and it will connect to the local memcached
    # client running on the standard port
    memcached_client = Dalli::Client.new(ENV['MEMCACHE_SERVERS'], 
                                         :username => ENV['MEMCACHE_USERNAME'], 
                                         :password => ENV['MEMCACHE_PASSWORD'])
    provider :google_apps, domain: 'your-domain.com', 
                           store: OpenID::Store::Memcache.new(memcached_client)
  else
    provider :google_apps, domain: 'your-domain.com', 
                           store: OpenID::Store::Filesystem.new(File.join(Rails.root,'tmp'))
  end
end
{% endhighlight %}

Whew!  This setup doesn't require memcache for development, but allows it as an option by setting the `OPENID_STORE` environment
variable.  Although the Dalli client claims to use the environment variables automatically, the code doesn't indicate this to be
true when there is a username and password, and I'm kindof prefering some explicit configuration after all this.

Now, no more "invalid_credentials" error!

The way Heroku makes us design our apps is a good thing, but it's easy to forget it because many "beginner" scenarios seem to
work even if we've configured things incorrectly.  Anything this crucial to your application is worth your while understanding at a detail level how it works - at least orient yourself around the default configuration.  And deploy to two Dynos as quickly as you can.

[stitchfix]: http://www.stitchfix.com
[OmniAuth]: http://github.com/intridea/omniauth
[omniauth-google-apps]: https://github.com/sishen/omniauth-google-apps
[omniauth-openid]: https://github.com/intridea/omniauth-openid
[12factor]: http://www.12factor.net 
