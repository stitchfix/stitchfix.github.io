---
title: Unassuming Apps w/ AngularJS
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
published: true
---

On my personal blog, I outlined [some issues with Rails' front-end support][davepost].
A lot of discussion around that post had to do with the notion that Rails isn't for building “ambitious” apps that are client-side heavy.
The thinking further goes that for un-ambitious apps, “The Rails Way” (server-generated JavaScript) and JQuery is Just Fine™.

I disagree, and thought it would be interesting to talk about how we're using Angular in some unambitious ways to give a good user experience as well as a good _developer_ experience.

<!-- more -->

## Setting the Stage

I work on an application used in our warehouse.
It's custom-designed to how Stitch Fix ships Fixes to our clients (_client_ is our lingo for what is normally considered a “customer”), and is essentially a lot of mini-applications rolled into one Rails app.

One of these “mini-apps” is for what we call “digital picking“, which most seasoned warehouse professionals would probably just call “picking”, which is to say “finding the thing to ship to someone”.

The basic process is that a “picker” will scan the barcode of a client's Fix and be shown the “digital picking“ app, which leads them through the process of locating the five items our stylists have chosen.
When they arrive at the location in the warehouse where an item is supposed to be, they scan the item's barcode to indicate they've found and thus _picked_ that item.

If the item is missing or damaged, however, the picker must indicate as such so that a replacement can be found.
For tracking purposes, we want to know how many items are damaged vs missing, so there are two buttons labeled, naturally, “Damaged” and “Missing“.
This situation is a called a “short pick”.

All of that is to set the stage for some code.
The way we handle a short pick is to give the user a warning, and then ask them to confirm that, in fact, the item is missing or damaged.
Only when they confirm do we record this information and allow them to move on.

## Just Using JQuery

To keep our UI logic separate from our markup, and to avoid a situation where a CSS refactor breaks application functionality, we tend to use `data` elements and prefixed CSS classes to glue the markup to the code.
Here's a simplified view of the button toolbar that allows pickers to indicate a short pick (lots of irrelevant CSS omitted):

{% highlight html %}
<ul class=“js-buttons-list”>
  <li>
    <a href="#" 
       class="btn js-short-pick" 
       id="shortpick-missing-link" 
       data-short-pick-exception="missing">
      Missing
    </a>
  </li>
  <li>
    <a href="#"
       class="btn js-short-pick"
       data-short-pick-exception="damaged">
      Damaged
    </a>
  </li>
</ul>

<!-- later in the page -->

<%= form_tag(fix_pick_path(@fix_pick_status.fix_id), 
             method: :put, 
             class: "js-submit-on-scan" %>
    <%= hidden_field_tag "item_id" %>
    <%= hidden_field_tag "exception" %>
<% end %>
{% endhighlight %}

The way we want this to work is to attach click handlers to these links, where the click handler will show the user a warning and ask for confirmation.
Once confirmation has been received, we populate the form and submit it (the form is also used for the “good pick” handling, which we've omitted).

Already our markup kinda sucks.
We have all these `js-` classes hanging around, because they really, really need to stay there to make the JavaScript work.
We also have some meta-data stuck into some `data-` attributes that our JavaScript expects to be there.

The JavaScript (actually CoffeeScript) looks like so:

{% highlight coffeescript %}
setup_short_pick_handling = ->
  $(".js-short-pick").each ->
    $(this).click ->
      item_id   = $("[data-current-item-id]").attr("data-current-item-id")
      exception = $(this).attr("data-short-pick-exception")

      notifications.open("lower_warning", 
                         "Short-picking item #{item_id} for reason: #{exception}")
      if confirm("Marking this item as #{exception} will require refixing later")
        $(".js-submit-on-scan #exception").val(exception)
        $(".js-submit-on-scan").submit()
      else
        notifications.close("lower_warning")
{% endhighlight %}

Yech.
This is pretty awful.
We're plucking data from all corners of our page and, as is typical of JQuery-based logic, we're mixing low-level concerns—like DOM manipulation—with core business logic like requiring a confirmation before short-picking.

We could certainly extract some functions to clean this up, but it just feels wrong.  What would this look like using AngularJS?

## AngularJS

Our markup is going to be a lot better.
First, we'll use ERB to send the submit path to the Angular “mini-app”:

{% highlight html %}
<div ng-app="rma" 
     ng-init="pickPath = '<%= fix_pick_path(@fix) %>'">
  <div class="view-container">
    <div ng-view class="view-frame"></div>
  </div>
</div>
{% endhighlight %}

Then, our template markup is pretty straightforward:

{% highlight html %}
<ul>
  <li>
    <a class="btn" ng-click="shortPick('missing')">Missing</a>
  </li>
  <li>
    <a class="btn" ng-click="shortPick('damaged')“>Damaged</a>
  </li>
</ul>
{% endhighlight %}

Even if you don't know Angular, you can look at this and have a lot better guess as to what's going on.
The two links trigger a method called `shortPick` that we can easily `grep` for.
Note that we also don't need to use a form as a means of storing data during the interaction, since we can do that using variables more directly.

The code is also much nicer:

{% highlight coffeescript %}
controllers = angular.module('controllers')
controllers.controller('PicksController', [
  '$scope','$http','$location'
  ($scope , $http , $location)->
    $scope.shortPick = (exception)->
      notifications.open(
        "lower_warning", 
        "Short-picking item #{$scope.item_id} for reason: #{exception}")

      if confirm("Marking this item as #{exception} will require refixing later")
        $http.put($scope.pickPath).success ->
          $location.reload
{% endhighlight %}

There's no mucking with the DOM, just pure UI logic relevant to our domain: when `shortPick` is triggered, show a warning, ask for confirmation, and submit the short pick to the back-end (we're reloading the page here only to have parity with the existing user-experience; we could obviously do much better than this if we wanted to).

This was a minimal change to a small portion of the application that reduced the amount of markup and code we had to write.
Each part of the resulting markup is more clear as to its purpose, and the code is similarly clear.
It's also a lot more testable, since we don't need to arrange any HTML fixtures just to execute our UI logic.

Don't get too side-tracked by the particulars.  Certainly the JQuery-based solution could be done differently, and the AngularJS
version could be further refined (e.g. by removing explicit calls to open a notification view via `notification.open`).

This isn't the point.
The point is that our digital-picking app is far from ambitious.
It's rather un-assuming, and it has benefited greatly from access to Angular's modern features.

## Un-assuming Apps Shouldn't Have to Settle

I don't think it's controversial to say that code written at a higher-level of abstraction than JQuery is going to be cleaner and easier to deal with.
What is, apparently, controversial is that it's worth buying into something like Angular even if we aren't making GMail.

Our tiny little app that helps workers through the task of fulfilling a fix for our clients is seeing a lot of benefit from the use of these advanced front-end technologies.
This app will never be the scope of a todo list, much less whatever an “ambitious” app is, but it'll still be a lot easier to build, maintain, test, and enhance by taking advantage of tools like AngularJS.

What un-assuming apps could _you_ make if you had more powerful tools than JQuery?

[davepost]: http://www.naildrivin5.com/blog/2014/08/07/rails-degenerate-front-end-support.html
