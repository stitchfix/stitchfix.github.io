---
title: Anatomy of a Rails Service Object
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
published: true
location: "Washington, DC"
---

We've given up on “fat models, skinny controllers” as a design style for our Rails apps—in fact we abandoned it before we started.  Instead, we factor our code into special-purpose classes, commonly called _service objects_.  We've thrashed on exactly how these classes should be written, so this post is going to outline what I think is the most successful way to create a service object.

## Purpose of a Service Object

A service object's job is to hold the code for a particular bit of business logic.  For example, when we process a customer's returned items in the warehouse, we use an instance of `ReturnProcessor` to handle that.  Unlike the “fat model” style, where a small number of objects contain many, many methods for all necessary logic, using service objects results in many classes, each of which are [single purpose][srp].

Where a classic Rails design would add Yet Another Method™ to the nearest ActiveRecord object (in this case, `Shipment`), using service objects allows us to keep all of our code separate and organized.  This makes it easy to understand, modify, and test our business logic.  It also alleviates some pain when extracting this code into separate HTTP services.

### Aren't these still models, in the classic sense?

In [Domain-driven design][ddd], pretty much everything is considered a model.  In effect, our `ReturnProcessor` is _modeling_ the returns processing activity.

But, like it or not (and _intended_ or not), Rails has co-opted the term _model_ to mean “a class that extends `ActiveRecord::Base`”.  Even more modern interpretations in the Rails world still view a model as a data container or stateful class of some sort.

Because of this, I believe it makes sense to think of classes that model a process as different, and _service object_ seems to be the term most will understand.

### What about Concerns?

Concerns (i.e. modules that you mixin to the classes where they are needed) *do* serve a similar function to service objects, but they have many of the same problems as fat-model/skinny-controller.

The main problem with putting all business logic into modules is that you end up bloating the classes where they are mixed-in.  You also end up creating complex dependencies between a model’s internals and your mixin.  And, mixin modules fall victim to some of the issues we’ll discuss here, namely that they are global to the VM and can have confusing side-effects.

Let’s dive into designing a service object.

## Designing a Service Object

Designing the class for a service object is relatively straightforward, since you need no special gems, don’t have to learn a new DSL, and can more or less rely on the software design skills you already posses. That said, a service object isn’t just any old class—it exists to implement business logic or a business process.

That means that we can realize some advantages by following a few simple rules when creating the class for our service object. Here are mine:

* Do not store state
* Use instance methods, not class methods
* There should be very few public methods
* Method parameters should be value objects, either to be operated on or needed as input
* Methods should return rich result objects and not booleans
* Dependent service objects should be accessible via private methods, and created either in the constructor or lazily

Let’s go through each one of these rules to understand the benefit it provides.

### Do not store state

Service objects should be as _functional_ as possible—the methods should operate on only what’s passed to them, and the results should be completely describable in the return value. In other words, calling a method should not affect the internal state of the service object in any way.

We have a few service objects that store state, and it's been a nightmare to use them.  Many of them cannot effectively be used in multi-threaded code because race conditions could squash the internal state of these objects, leading to hard-to-diagnose errors.

This isn't to say your service object can't have instance variables, but that their values should not ever change.  A common example would be configuration or a dependent service object:

```ruby
class MyService
  def initialize(timeout: 1000)
    @helper_service = MyHelper.new
    @timeout = timeout
  end
end
```

The code above implies that users of service objects use _objects_ created from a class, and not the class itself.

### Use Instance Methods

A class in Ruby is a global symbol, which means that class _methods_ are global symbols.  Coding to globals is why we don't use PHP any more.

A great example of where a service-as-a-global-symbol is problematic is [Resque][resque].  All Resque methods are available via `Resque`, which means that any Ruby VM has exactly one resque it can use.  

```ruby
Resque.enqueue(MyJob)
```

The real issue is that Resque's _internals_ also use `Resque`.  Meaning, if your app needs to communicate with more than one Resque instance, it's basically impossible, since there is no way to tell Resque what implementation to use.

If, on the other hand, Resque was implemented as an object, instead of a global, any code that needed to access a different Resque instance would not have to change—it would just be given a different object.

If your service object has a lot of configuration—as is the case with API clients, for example—a single VM-wide instance as a global symbol is going to be bad.

By designing our service objects to use instance methods, it means the users of our service will depend on objects, not global symbols.  Although we have to type four additional characters—`.new`—our code using our service can more easily adapt to change, since we can modify the class of the object we're using without changing the code that uses it.  It also makes it easier to reason about thread-safety, because we have a stateless object instead of a stateful, VM-wide symbol.

To keep our service object focused and cohesive, we want to limit the size of their public APIs.

### Have Few Public Methods

Many Rubyists have two very bad habits: using  a public `attr_accessor` for every instance variable, and declaring all methods public, even if they aren't part of the class' actual API.  Worse, many Rubyists feel the need to write tests for these private-but-public methods.

This style of coding makes refactoring pretty much impossible, and it also makes it hard to understand how a class is intended to be used.  If the intention is that users of your class just call one or two methods, those are the only ones that should be public (and your tests should only use those methods, too).

Consider our `ReturnProcessor` example from above.  Suppose the method users call is called `process!`, and it does two things: charge the customer for unpaid items, and record the return as having been processed.  It uses a private method—`record_return`—and another service object—`checkout_service`—to do this.

```ruby
class ReturnProcessor
  def process!(the_return, user)
    if unpaid_items(the_return).any?
      checkout_service.charge!(unpaid_items(the_return))
    end
    record_return(the_return,user)
  end
end
```

Making `record_return` and `checkout_service` public is wrong:

```ruby
class ReturnProcessor
  attr_accessor :checkout_service
  def initialize
    @checkout_service = CheckoutService.new
  end

  def process!(the_return,user)
    # …
  end

  def record_return(the_return,user)
  end
end
```

This means that instances of `ReturnProcessor` can:

* process a return
* provide access to a `CheckoutService` instance
* record the processing of a return without charging customers for unpaid items

This is clearly unintended (and a bad idea—a class named `ReturnProcessor` should not be vending instances of `CheckoutService`).  This is how this class _should_ look:

```ruby
class ReturnProcessor
  def initialize
    @checkout_service = CheckoutService.new
  end

  def process!(the_return,user)
    # …
  end

private

  attr_reader :checkout_service

  def record_return(the_return,user)
  end
end
```

Now, the class is much easier to understand and use, plus we can modify the implementation of `process!` as we see fit, without worry that someone, somewhere is calling `checkout_service` or `record_return`.

You may think that private methods are a code smell.  If you believe that, making them public does not solve the problem.  Extract private methods to classes if you feel there are too many in your service object’s class (we'll see how to manage dependent services in a little bit).

Once we’ve identified the very few public methods we need, our next step is to figure out what parameters they should accept and what values they should return.

## Method parameters should be value objects

The purpose of your service object's methods are to operate on some data or perform some process using some data as input.  This is the primary differentiator between a service object and other objects.  As we saw above, the `process!` method in `ReturnProcessor` handles marking a return as processed and charging a customer for unpaid items.  This means it needs the data for the return as well as the user who processed it.

What you *should not* be passing to your service object's methods are other service objects.  We saw that `ReturnProcessor` will charge customers for unreturned items using an instance of `CheckoutService`.  

Passing it in requires all callers to deal with how to create a `CheckoutService` properly as well as exposes them to the internal implementation of `process!`, thus making it harder to change:

```ruby
# Bad
ReturnProcessor.new.process!(the_return,user,CheckoutService.new)
```

If `process!` simply accepts the data its operating on and/or needs to read, it makes more sense.  The caller is going to have the return being processed and the user processing it.

```ruby
# Good
ReturnProcessor.new.process!(the_return,user)
```

Passing in dependent service objects puts undue burden on the caller, requiring code duplication and needless coupling to the service object's implementation.

We'll see in a second how the service object should get access to dependent service objects.  But first, let’s see what sorts of data our methods should be returning.

## Methods should return rich result objects, not booleans

Service object methods typically have three possible outcomes:

* The requested action succeeded
* It failed, but in an expected way
* An exceptional condition occurred

Distinguishing failure from exceptions can be subtle, but it's important.  A failure is something the caller is expected to deal with. The distinction between success and failure is also potentially subtle, as both represent “valid things that could happen as a result of this call”.  Those valid things could require additional context to interpret.  

For example, a successful return might require that some items be set aside for donation, and others returned to inventory.  A failed return might need to indicate which items were accounted for incorrectly and a suggestion as to how the user can resolve it.  A simple `true` or `false` doesn’t communicate that information, nor could it ever.

This means that the common pattern of returning `true` or `false` should be avoided. Neither `true` nor `false` can contain any sort of context. They are also not extensible in any way.  If a simple `true` is fine today, but you later need to return more information, you’ve got a much bigger re-design on your hands than if you’d used a richer object initially.

For this reason, I prefer returning result objects that have a more fluent API.  Creating these objects is trivial with libraries like [immutable-struct][is]<a name="back-1"></a><sup><a href="#1">1</a></sup>:

```ruby
class ReturnProcessor
  Result = ImmutableStruct.new(:return_processed?, 
                               :error_messages)
end
```

Notice that instead of a method like `success?`, I’ve used an explicit name for what happened—`return_processed?`.  Users of `ReturnProcessor` will then benefit from clear, intention-revealing code:

```ruby
result = return_processor.process!(the_return,user)

unless result.return_processed?
  flash[:error] = result.error_messages.join(",")
  redirect_to 'new'
end
```

The result object, being a real object and not a primitive, can grow to encapsulate further details and context if the need should arrive.  It may seem like wrapping a boolean in an object is [YAGNI][yagni], but a result object has almost no build cost, and no carry cost.

Now that we know how to design our methods, the last bit is how to access dependent service objects—those objects that _our_ service object needs to get its job done (or that we extract from an existing service object to tame complexity).

## Managing dependent service objects

We said earlier that our service object's methods should not take other service objects as parameters.  This leaves open the question of how our service object can get access to other service objects it needs to do its work.  Our example had our `ReturnProcessor` using a `CheckoutService` to charge customers for unreturned items that weren't paid for.

It's not uncommon to see code just instantiate the needed objects where needed, but this is not ideal.

```ruby
def process!(the_return,user)
  if unpaid_items(the_return).any?
    # Bad--this business logic is coupled to the 
    #      creation of another service object
    result = CheckoutService.new.charge!(unpaid_items(the_return))
    unless result.charge_succeeded?
      return Result.new(return_processed: false, 
                        error_messages: result.error_messages)
    end
  end

  # remainder of the method

end
```

The problem is that `process!`—which should just be concerned with the details of processing a return—also has to know how to create a `CheckoutService` instance.  *This* means that if we need to change how `CheckoutService` is created, we have to change this method (and likely its tests).  We don't want this method to change unless the _business process_ of processing returns changes.

The simplest thing to do is move it to a private method:

```ruby
class ReturnProcessor
  def process!(the_return,user)
    if unpaid_items(the_return).any?
      # Good--our code just depends on an object 
      #       that we can assume has been set up for us
      result = checkout_service.charge!(unpaid_items(the_return))
      unless result.charge_succeeded?
        return Result.new(return_processed: false, 
                          error_messages: result.error_messages)
      end
    end

    # remainder of the method

  end

private

  def checkout_service
    @checkout_service ||= CheckoutService.new
  end
end
```

Although `ReturnProcessor` is still coupled to how `CheckoutService` gets created, the `process!` method no longer is.  Meaning it has less reasons to change, meaning our system is overall more resilient to changes.

Another alternative is to allow callers to pass in a `CheckoutService` to `ReturnProcessor`'s constructor along with a sensible default.

```ruby
class ReturnProcessor

  def initialize(checkout_service: nil)
    @checkout_service = checkout_service || CheckoutService.new
  end

  def process!(the_return,user)
    if unpaid_items(the_return).any?
      result = checkout_service.charge!(unpaid_items(the_return))
      unless result.charge_succeeded?
        return Result.new(return_processed: false, 
                          error_messages: result.error_messages)
      end
    end

    # remainder of the method

  end

private

  attr_reader :checkout_service
end
```

This is more verbose, but is a useful pattern if:

* The way `CheckoutService` is created is unstable and likely to change, and we wish to store that code outside this class.
* We will need different implementations of `CheckoutService` for different situations.
* `CheckoutService` is a singleton or something that's relatively difficult to construct, and we want that code to life elsewhere.
* We want to fail fast if creating the `CheckoutService` results in an error (as opposed to failing when the object is actually needed).

Also note that our `attr_reader` is private.  As mentioned, callers should not use `ReturnProcessor` instances to gain access to `CheckoutService` instances, and we communicate that via `private`.

## Wrapping Up

That was a bit of a journey, but after a lot of thrashing on service object design, these rules of thumb seem to work the best and produce the simplest code.

The idea is to keep the methods implementing your business logic as focused as possible, so that they _only_ contain business logic, and only need to change when a business process changes.

And, we can do it without any new DSLs or frameworks (other than `immutable-struct`, which really only exists due to deficiencies in Ruby's stdlib).  Designing features in Rails using service objects just requires vanilla Ruby and a few rules of thumb.


[is]: https://github.com/stitchfix/immutable-struct
[yagni]: http://martinfowler.com/bliki/Yagni.html
[resque]: https://github.com/resque/resque
[ddd]: http://en.wikipedia.org/wiki/Domain-driven_design
[srp]: http://en.wikipedia.org/wiki/Single_responsibility_principle

----

<footer class="footnotes">
 <ol>
   <li>
     <a name="1"></a>
     <sup>1</sup> You can also do this with <code>Struct</code> from the standard library, but the constructor isn't as nice, and the class created is completely mutable, which is not what you want for result classes.<a href="#back-1">↩</a>
   </li>
</ol>
</footer>
