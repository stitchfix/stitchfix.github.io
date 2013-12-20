---
title: "Presenters: Delegation vs Just Making A Struct&trade;"
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
tags:
published: true
---

Like most good Rails developers, we use presenters at Stitch Fix.  We typically implement them using delegation, but I've been
finding that the time savings of this approach over just making a [struct]-like class is negligable, and results in code that's
harder to change and harder to use.

<!-- more -->

## What is a presenter?

Briefly, a presenter is a form of [adapter].  You use it when your view requires data that isn't in the form provided by your
controller.  For example, at Stitch Fix, we track events that occur on our shipments (a shipment being what we send to our
clients and the basic unit of work for our internal systems).  As described in [my previous post][superblog], these events are
either attributed to a client or to an internal user.

The view of an event, however, requires simply a username—who initiated the event?  In classic Rails, you might do:

{% highlight erb %}
<% if @event.admin_user.present? %>
  <%= @event.admin_user.name %>
<% else %>
  <%= @event.client.display_name %>
<% end %>
{% endhighlight %}

You might put this into a helper, but helpers have a way of getting out of control.  An alternative is to adapt our controller to
our view by means of a presenter:

{% highlight ruby %}
class EventPresenter
  def initialize(event)
    @event = event
  end

  def username
    if event.admin_user.present?
      event.admin_user.name
    else
      event.client.display_name
    end
  end
end
{% endhighlight %}

Which turns our template into:

{% highlight erb %}
<%= @event.username %>
{% endhighlight %}

Where `@event` is actually an `EventPresenter`.  The "problem" here is that we also need access to other attributes of `Event`,
such as the `event_name` and `created_at` date.  In a sense, we want our `EventPresenter` to behave just like the
`Event` that was given to its initializer, but with the additional `username` method as well.  We can do this by telling
`EventPresenter` to delegate methods to its internal `Event` instance.

## Delegation

Rails provides the method `delegate` that works as a "class macro", allowing you to declare attributes that get their values from
another object.

{% highlight ruby %}
class EventPresenter
  def initialize(event)
    @event = event
  end

  delegate :created_at, :event_name, to: "@event"
end
{% endhighlight %}

This means that objects of this class respond to the messages `created_at` and `event_name` and that they will do so by passing
the message along to the `@event` ivar.  Basically, shorthand for:

{% highlight ruby %}
  def created_at
    @event.created_at
  end
{% endhighlight %}

This tends to work pretty well, but you'll notice that the implementation of `EventPresenter` is very tightly coupled to `Event`.
If we want to create and display events in some other way, we really can't unless we have a bonafide `Event` instance.

I recently ran into this problem where I needed to merge two event streams into one logical view.  We (unfortunatley) have a
second log of changes made to shipments, and it's not feasible to convert the code generating the second log to use the shipment
events we have.  Worse, the schema of that log is fairly different from the shipment events.

While accessing the log is a snap, there wasn't a clear way to fit it into my existing view, which was based on `EventPresenter`.
I saw three possible options:

* Create non-persisted `Event` instances, based on the log entries, and feed those to `EventPresenter`
* Create a `LogPresenter` that exposed the same interface as `EventPresenter`, but adapter the second log entries
* Rework `EventPresenter` so that it could "present" either type of object.

I chose the later by changing `EventPresenter` into a simple struct that could get its values from anywhere.

## Structs Can Separate Concerns

A struct is often called a "Plain Ole' Ruby Object" or "Plain Ole' Java Object", but is simply a class that
groups data together, providing access to it via methods like so:

{% highlight ruby %}
class Event
  def initialize(event_name, created_at, admin_user, client)
    @event_name = event_name
    @create_at  = created_at
    @admin_user = admin_user
    @client     = client
  end

  attr_reader :event_name, :created_at, :admin_user, :client
end
{% endhighlight %}

You might be familiar with Ruby's [`Struct`][Struct] class.  It's a nice attempt to make generating a class like this simpler, but it's flawed:

* attributes are mutatable, which is not needed nor desired when generating a view
* the constructor it generates doesn't use an options hash, but instead a big blob of positional arguments, making construction
difficult to understand

Stitch Fix has our own version of `Struct` called `ImmutableStruct` which solves both of these.  For example:

{% highlight ruby %}
EventPresenter = ImmutableStruct.new(:event_name,
                                     :created_at,
                                     :admin_user,
                                     :client)

nil_event = EventPresenter.new # => all fields nil

name_only = EventPresenter.new(event_name: 'printed_labels')
name_only.event_name # => printed_labels


everything = EventPresenter.new(event_name: 'styled',
                                created_at: 4.days.ago,
                                admin_user: AdminUser.find(user_id))
{% endhighlight %}

Notice how our `EventPresenter` here has nothing to do with the `Event` class.  We can create objects usable by our view in any
way we'd like.  That means that to merge our two event log streams, we merely create `EventPresenter` instances.

We've lost the delgation aspects, so we must explicitly map the fields of our objects.  To do this, I created [factory methods]
inside the `EventPresenter` class itself:

{% highlight ruby %}
EventPresenter = ImmutableStruct.new(:event_name,
                                     :created_at,
                                     :admin_user,
                                     :client) do
  def self.from_event(event)
    self.new(event_name: event.event_name,
             created_at: event.created_at,
             admin_user: event.admin_user,
                 client: event.client)
  end

  def self.from_secondary_log(log)
    self.new(event_name: log.action_description,
             created_at: log.action_date,
                 client: log.user.client)
  end
end
{% endhighlight %}

We can then merge our log streams like so:

{% highlight ruby %}
events = shipment.events
logs   = SecondaryLogs.for_shipment(shipment)

shipment_event_log = (
    events.map(&EventPresenter.method(:from_event) +
      logs.map(&EventPresenter.method(:from_secondary_log))
  ).sort_by(&:created_at)
{% endhighlight %}

By using a struct instead of a delegator, we've separated what an `EventPresenter` *is* from  how its constructed.  Because our "classic" presenter
relied on delegation, there was no easy way to change it to get its attributes' values from a different place.  Here, the
attribute values are simply whatever was given to the constructor.

This also allows us to easily create instances of `EventPresenter` without having any particular backing data, which is handy for
testing.

## But, Lines of Code!

Yes, it's slightly longer than our delegation-backed version, but it's not *that* much longer, possibly taking an extra 30
seconds to type out, and it's *conceptually* the same size.  It's more flexible, simple to construct, and simple to understand.  It's just a Ruby class in its most basic form.

This is another way of saying that we get better, simpler code, without almost the same effort, if we just create a basic class
instead of using delegation.  `ImmutableStruct` is only 26 lines of code (it's very similar to the [values] gem, but works a bit
more to my personal tastes).

So, next time you're thinking about delegation when trying to adapt two different bits of code, consider a simple struct.  It's
not that much more difficult to create, and makes your code flexible and easy to understand while making tests easier to write.

[struct]: http://en.wikipedia.org/wiki/Struct_(C_programming_language)
[adapter]: http://en.wikipedia.org/wiki/Adapter_pattern
[superblog]: http://technology.stitchfix.com/blog/2013/12/10/startup-engineering-team-super-powers/
[Struct]: http://www.ruby-doc.org/core-2.0.0/Struct.html
[factory methods]: http://en.wikipedia.org/wiki/Factory_method_pattern
[values]: https://github.com/tcrayford/values
