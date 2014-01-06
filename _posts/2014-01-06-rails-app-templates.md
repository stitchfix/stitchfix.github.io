---
title: Rails Application Templates
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
tags:
published: true
---

The ability to quickly create and deploy an application is crucial to avoiding a monolithic architecture.  I touched on this in my 
[talk at RubyNation][3], as well as [my post][4] here, but a key part of that ability is to script the actual creation of the application so that it's
ready for your infrastructure and your team.  At Stitch Fix, we  use Ruby on Rails for most of our applications and, fortunately enough, Rails provides a handy feature called [applicaiton templates][1] that allows you to script the creation of a new applications with whatever boilerplate you need.

For example, internal apps at Stitch Fix use Google Apps and OmniAuth for login, Twitter Bootstrap (with a customized skin) for
CSS, RSpec for tests, and a smattering of other gems needed for deployment to Heroku.  Setting this up by hand for new apps can be error prone and
time-consuming.

While there *is* documentation for Rails Application Templates, it's not great, and basically amounts to two different pages of RDoc.  What I'd like to do
here is show how to use the API as well as some tips for how I think you *should* write your template (which, in some cases, means avoiding some of the
Rails-provided API methods).

## The Basics

An application template works like a Rails generator, so if you've written one before, this should look familiar.  The entire
thing is based on [Thor][5], which provides handy commands for manipulating and creating files.  You place your commands into a single Ruby file, and
then reference that file when creating your Rails app.

The basic process for setting this up is:

1. Create your generator file, e.g. `rails-app-template.rb`
2. Add commands in `rails-app-template.rb` to modify any files Rails generates (e.g. `Gemfile` or `routes.rb`)
3. Create files or ERB templates for any *new* files you'll be adding, and add commands in your generator file that copy the files to the newly-generated Rails app.
4. Create your new app using your generator

## Create your Generator File

This file is just a Ruby source file that will be run in the context of Rails, specifically in the context of `Rails::Generators::AppGenerator`, itself having the context of Thor.  Both the [Rails Guide][1] and the the Thor `Actions` [rdoc][6] outline some methods you'll have available.  These pages are fairly short, so read them over once before starting, and then keep them handy while you work.

## Add commands to modify files Rails generates

The most basic thing you'd do in an application template is add gems to the `Gemfile` that gets generated.  The `gem` method does that, and the
`gem_group` method can be used to create gem groups in the `Gemfile`:

{% highlight ruby %}
# Add commonly used gems
gem 'pg'
gem 'omniauth'
gem 'omniauth-google-apps'
gem 'unicorn'
gem 'foreman'
gem 'newrelic_rpm'
gem 'airbrake'
gem 'brakeman'
gem 'cancan'

# add gems for a particular group
gem_group :production, :staging do
  gem 'rails_12factor'
  gem 'rails_stdout_logging'
  gem 'rails_serve_static_assets'
end
{% endhighlight %}

Rails also provides similar methods to allow you add gem sources (`gem_source`), add lines to your application configuration
(`environment`), and add routes (`route`).

The API also provides methods for creating initializers and rake tasks, but **you should not use them**.  We'll see why in a
minute.

Outside of the few methods we just mentioned, you may need to make more specific changes to files that aren't supported directly by the API.  Thor provides
two methods to give you this control: `insert_into_file` and `gsub_file`.

For example, suppose you want to remove sqlite3 from your `Gemfile` and, while you'are at it, get rid of Turbolinks:

{% highlight ruby %}
gsub_file "Gemfile", /^gem\s+["']sqlite3["'].*$/,''
gsub_file "Gemfile", /^gem\s+["']turbolinks["'].*$/,''
{% endhighlight %}

Further, suppose you want to explicitly set the version of Ruby in your `Gemfile`:

{% highlight ruby %}
insert_into_file 'Gemfile', "\nruby '2.1.0'", 
                 after: "source 'https://rubygems.org'\n"
{% endhighlight %}

This sort of string manipulation isn't a great API, (as [Aaron Patterson attests](https://twitter.com/tenderlove/statuses/417048556533329920), but it has the virtue of working well and being flexible.

Before we leave this section, it's important to make sure you are using the method `inside` which allows you to set the directory
a certain file is in when asking to manipulate it.  

Suppose you want to add a line to the top of `environment.rb` to force stdout to sync.  You could do:

{% highlight ruby %}
insert_into_file 'config/environment.rb', "$stdout.sync = true\n"
                 before: "# Load the rails application"
{% endhighlight %}

A better way, as we'll see later, is to do this:

{% highlight ruby %}
inside 'config' do
  insert_into_file 'environment.rb', "$stdout.sync = true\n"
                   before: "# Load the rails application"
end
{% endhighlight %}

As your template gets more complex, you'll be making a lot of changes to files, and having the indentation of your file match the
directory structure of your Rails app will help keep things sane and understandable.  It also reduces the repetition when you need to manipulate files in
the same directory.

Once you've done this, you can now move to the (much easier) task of adding totally new files to your Rails app.

## Create files or ERB templates for files you'd like to add

Presumably, you'll want to add your own files to your new app, such as initializers, configuration, or even controllers and
views.  As mentioned, you don't want to use the provided methods like `file`, `rakefile`, or `initializer` to do this, because
they take strings representing the file contents.  Instead, you'll use one of two methods, provided by Thor: `copy_file` and `template`, which take filenames.  This way, you can store and edit your file templates as files and not strings inside of your main application template file.

Suppose you have a boilerplate Unicorn configuration.  You would first place it in `rails_root/config/unicorn.rb`, where
`rails_root` is a sibling of your app template, `rails-app-template.rb`.  You need to tell your application template about this directory, and you can do so by overriding the method `source_paths`, like so:

{% highlight ruby %}
def source_paths
  Array(super) + 
    [File.join(File.expand_path(File.dirname(__FILE__)),'rails_root')]
end
{% endhighlight %}

To understand what this does, let's look at the code we'd write for copying our Unicorn configuration into our newly-generated app:

{% highlight ruby %}
inside 'config' do
  copy_file 'unicorn.rb'
end
{% endhighlight %}

Rails will search all the source paths for a file named `config/unicorn.rb` to copy into the app being generated.  If we hadn't overridden `source_paths`, it wouldn't find this file, because it's not part of the standard Rails boilerplate.  Since we added our own directory, and placed the file in `rails_root/config/unicorn.rb`, it's found and copied to the analogous place in the new Rails app.

You can repeat this for any files you'd like to add.  If you want to _replace_ a file provided by Rails, you might want to remove it first, with
`remove_file`.  Copying over an existing file will cause the generator to stop and ask the user if they want to overwrite the file, which goes against our
desire to automate application setup.  If you remove the file first, the user won't get interrupted.

You can also templatize these files to include dynamic content.  For example, suppose you want to provide your own application
layout, and you'd like it to use the application name the user provided when running your generator.  Create
`rails_root/app/views/layouts/application.html.erb` as normal, but escape the ERB normally found in that file.  You can then use ERB
that will be interpolated at app generation time to include the app name, handily available as `@app_name`:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <!-- this ERB will be processed when we generate our app -->
  <title><%= @app_name.humanize %></title>
  <!-- this will end up as ERB in the generated file and 
       not processed during application generation -->
  <%%= stylesheet_link_tag    "application", media: "all" %>
  <%%= javascript_include_tag "application" %>
  <%%= csrf_meta_tags %>
</head>
<body>
  <h1>Welcome to <%= @app_name.humanize %>!</h1>
  <%%= yield %>
</body>
</html>
{% endhighlight %}

Once you have this file, use `template` instead of `copy_file`:

{% highlight ruby %}
inside 'app' do
  inside 'views' do
    inside 'layouts' do
      template 'applicaiton.html.erb'
    end
  end
end
{% endhighlight %}

Viola!  Now, you can create your app.

## Creating your App (and testing the template)

    > rails new your_app -m path/to/rails-app-template.rb

One thing to note is that because the API is so simplistic, it's easy to create a nonfunctional application due to a typo or
other error in your code—this is just string manipulation so you don't get a lot of checking on your output.

My suggestion would be to work in a cycle like so:

1. Generate application
2. Copy and paste from a script any shell commands required for manually completing setup (hopefully there aren't any)
3. Start up the app and check it
4. If possible, deploy the app somewhere to see if it works in a production-like environment
4. If you want to change anything, remove the app directory, make your changes, and proceed to step 1.

You should try to reduce the number of manual steps required in #1.  
The more manual steps you have, the more likely it is someone will make a mistake creating a new app,
and that's the sort of friction you're trying to get rid of.

## Conclusion

I set this up for a "Stitch Fix-like" app in several hours on a weekend.  It certainly took longer than just creating a new Rails
app, but I now have a repeatable way to make new apps in our environment that doesn't leave anything out.

For the curious, here's what our application template does:

* Gems and configuration for Heroku
* Postgres instead of SQLite
* Ruby 2.1 and associated ruby version manager files
* A better `.gitignore`
* OmniAuth set up for our authentication system
* Deployment and CI hooks
* Airbrake, New Relic, and Brakeman configuration
* RSpec, Capybara, and Factory Girl
* Access to our shared data model
* A simple home page requiring login, and a logged-out page for unauthenticated monitoring
* Customized layout and CSS using Bootstrap 3, but with our fonts, sizes, and colors


[1]: http://guides.rubyonrails.org/rails_application_templates.html
[2]: http://rspec.info/
[3]: http://davetron5000.github.io/you_might_are_gonna_need_it/
[4]: http://technology.stitchfix.com/blog/2013/12/10/startup-engineering-team-super-powers/
[5]: http://whatisthor.com/
[6]: http://rdoc.info/github/erikhuda/thor/master/Thor/Actions
[tenderlove]: http://www.twitter.com/tenderlove
