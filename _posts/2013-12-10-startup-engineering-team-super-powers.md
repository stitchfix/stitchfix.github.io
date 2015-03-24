---
title: Startup Engineering Team Super Powers
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
tags:
published: true
---

Stitch Fix is the third startup I've worked at, and the second where I joined at a fairly early stage.  So far, we've been able to avoid creating a single monolithic application, and have been consistently delivering and deploying solutions to our users.  I believe this is because we've developed a set of "super powers" which have been extremely helpful, and I believe these powers will keep our team and technology healthy for years to come.

These "Super Powers" are skills that we've cultivated, activities that we've not shyed away from, or complex processes that we've automated away and no longer think about.  This powers are easily gathered by a small development team early on, and can be passed to newer members (whereas they are hard to develop later, when the team is larger).  They are:

* Provision Applications With Ease
* Continuous Deployment
* Publish Shared Libraries
* Proper Data Modeling Using a Powerful Database
* Databases as a Service
* Background Processing
* Monitoring & Logging

Which leads to the best Super Power of them all:

* Trust from the Rest of the Company

Let's dig a little deeper on each one.

<!-- more -->

## Provision Applications With Ease

Nothing contributes to monolithic do-everything applications more than the inability to provision new applications to share the load.  We decided early on
to stop putting any more features at `www.stitchfix.com/admin` and put them in special-purpose apps.  Because we use a cloud-based hosting service
(Heroku), that decision is an easy one: we just provision and deploy a new application.

When discussing new applications, we tend to discuss what the application should do and not worry about how long it will take to create.  This skill is not
easy to develop later a company's lifecycle and often requires a dedicated team to build the necessary infrastructure and migrate the applications—often
at a time when such activities carry higher risk and affect more customers.

## Continuous Deployment

When a change to the system is ready, it goes up.  When we merge code to our master branch in GitHub, it is bound for production.  Our Continuous
Integration server is a gatekeeper, of course, but we don't have release cycles, versions, or timed releases.  We may hold a feature until the next day if
it represents a radical change in an internal process, but generally we aren't trying to sync up a bunch of features to do a weekly release.

The technical aspects of achieving this aren't nearly as interesting as the culural impact it has. Because we don't have a formalized QA process, we all know that the only thing between our code and production is the test suite, so that test suite needs to be reliable.  Whenever there is a production bug, our first question is "Why didn't the tests catch this?".

## Publish Shared Libraries 

Because we have several applications, those applications often need to share business logic or other code.  While dedicated services might someday be a
way we do that, for now, we share logic and code via libraries (in our case, RubyGems).  Just like easily provisioning new applications, we can
easily create and publish a new library in a matter of minutes.  

To keep our libraries codebases consistent, we initially had a wiki page of instructions, however
this has now been reduced to a command-line app: `y my_new_gem` which creates an empty code library the "Stitch Fix Way" that can be deployed to our
hosted private code server instantly.

## Proper Data Modeling Using a Powerful Database

When you have a single monolithic application as the only accessor to your database, you can rely on your code to keep the data clean.  However, in a
setup where many applications are sharing a database, you run the risk that one application will put bad data in, causing another application to break.
The solution to this has been a part of many popular relational databases for years: constraints.

It's unfortunate that MySQL—which is quite popular and usable—lacks real constraints.  We use Postgres, which provides not just "not null" constraints and
foreign key constraints (both part of MySQL as well), but also _check constraints_.  A check constraint allows us to put sophisitcated requirements on our
data to ensure it is always correct.  

For example, we have a table that tracks events on a shipment (a shipment being what we send to our customers in hopes of a purchase).

        Column     |           Type           | Modifiers                           
    ---------------+--------------------------+---------------
     id            | integer                  | not null
     shipment_id   | integer                  | not null
     status_id     | integer                  | not null
     event_name    | character varying(255)   | not null
     admin_user_id | integer                  | 
     client_id     | integer                  | 
     created_at    | timestamp with time zone | default now()

We have two types of users in our system: our clients (aka our customers), and our internal users (which we call "admin users").  In the table above, you
can see we have a reference to both a client ID and an admin user ID.  We want exactly one of those fields to have a value, so that we can attribute the
event to an actual person.  A check constraint allows us to do that:

{% highlight sql %}
alter table shipment_events add CONSTRAINT 
  "must_reference_a_user" CHECK (admin_user_id IS NOT NULL OR 
                                 client_id     IS NOT NULL)
{% endhighlight %}

If any application (or even someone at a SQL prompt) tries to insert a row into this table that doesn't have an `admin_user_id` or `client_id`, the
database will refuse the insert.  Which means that we can write this code:

{% highlight ruby %}
if event.admin_user.present?
else
  # we know for a fact that event.client is present
end
{% endhighlight %}

Moreover, this means that an errant or buggy application cannot cause trouble for other applications by putting bad data in the database.  And *this*
means that we can use the database as an integration point much more reliably than if we had only weak assurances of the data inside.  Which allows us to
reap the benefits of multiple applications and shared code without having to immediately start standing up RESTful services.

## Databases as a Service

On the subject of databases, our databases work just like our applications - we can create new ones, set up replication, access backups, rollback to
previous versions, and download production dumps with a simple command.  This is because, like our applications, our databases are setup via a cloud
hosting service (Heroku Postgres) that provides all of that.  

We recently found that three back-end reporting systems were competing for resources on our single replication slave database. So, we spun up two more,
and now they each have their own.  We never had to discuss the difficulty in physically setting up the systems—just whether or not it made sense to do
architecturally.

## Background Processing

When building internal tools, or interfacing with third party systems, the easiest way to improve performance and reliability is to run long-running
processes in the background.  Setting this up the first time can be painful, but once it's there, you can start to background everything that's not
strictly needed in the user-facing request cycle.

When we started seeing long delays from our shipping label provider, Jon took the extra effort needed to not just background the external call, but also to
set up an easy way for the front-end to use AJAX to wait for the result back.  The user still has to wait, but our application would no longer time out.
When we later needed to add a second call to another third party, Joel was able to easily build on Jon's work to do that.  Up-front investment can often
pay off.

## Monitoring & Logging

With all of this infrastructure, you need to know what's going on with it.  In addition to basic ping checks of our applications, we also monitor the size
of our background queues, get alerted when any job fails, get notified when our applications crash or timeout, and can even be alerted when certain SQL
statements that should never return a value do, in fact, return a value.

This means that we know about problems before our users do.  It's so important to have this knowledge, because users have been trained over the years to
accept flaky software as being normal—they won't report problems right away or at-all.  

Because of our monitoring set up, I can email an internal user that I'm aware of their problem, but also if there's a
workaround they can try to get their work done, often before they realize what's going on.  It might sound creepy, but it helps—I can get real-time
information from them, and they know that we're on top of it.

We can currently add alerts for any log message our applications produce, meaning it's dead simple to stay on top of our system.

## Trust from the Rest of the Company

All of the previous superpowers mean that we can deliver solutions for our clients and internal users quickly without acquiring a lot of technical debt.  Because we aren't messing around with server configuration, debugging odd data, or figuring out why something's slow or unresponsive, we spend most of our time delivering the business value we're paid to deliver.

This means that when we discuss potential solutions, we're taken seriously.  When we give estimates for how long work will take, we are believed (and when
an estimate is perceived to as "too long", the solutions proposed from the non-tech side are almost always around cutting scope and delivering a smaller
solution earlier).  Finally, when we *do* need some time to do some technical things behind the scenes (such as upgrade to Rails 4), it's understood that
we wouldn't be asking if there weren't an upside to the company in doing so.

We'll see what happens over the next year, but it's my belief that our team will continue to function efficiency and effectively as a partner to the
business and not the dreaded "IT Department".  All because we've cultivated some technical super powers.

## Specifics

For the curious, here are the specific tools and services we use:

* [Ruby on Rails](http://www.rubyonrails.org)
* [Postgres](http://www.postgresql.org/)
* [GitHb](http://github.com) (source code management)
* [Heroku](http://heroku.com) (hosts our apps and Postgres databases)
* [Resque](https://github.com/resque/resque/tree/1-x-stable) (background processing)
* [Heroku Scheduler](https://addons.heroku.com/scheduler#standard) (cron-like)
* [TDDium](http://tddium.com) (Continunous Integration)
* [Hubot](http://hubot.github.com/) (Chat-based assistance for deployment, issue tracking, and questionable images)
* [GemFury](http://fury.io) (Private Gem Hosting)
* [PaperTrail](http://papertrailapp.com) (Logging)
* [PagerDuty](http://www.pagerduty.com) (alerting rotation)
* [Pingdom](http://www.pingdom.com) (application monitoring)
* [NewRelic](http://www.newrelic.com) (performance monitoring)
* [Google Apps](http://apps.google.com) (knowledge sharing and management)
