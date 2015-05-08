---
title: How We Deal with Failed Resque Jobs
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
tags:
published: true
---

The [Grouper Engineering Blog][grouperblog] posted a good description of what it's like [to host Resque on Heroku][grouperpost]:

> Recently we ran into a common problem with Resque deployments on Heroku – our jobs were being sent TERM signals in the middle of processing.

This happens to us as well (and will happen to anyone on Heroku running Resque at even moderate scale).
Heroku will send `TERM` to any dyno at any time for any reason, and your code is expected to deal with it.

When this happens, the Resque workers will, by default, raise `Resque::TermException`, which effectively puts the job into the failed queue.
Grouper is proposing an enhancement to Resque to make it easier to catch that exception and try to clean up (Heroku gives you 10 seconds to do so before definitively killing your job).
The reason they've gone this route is mentioned in their post:

> Except that not all of our jobs are fully idempotent. Running them multiple times could cause users to be charged more than once or to get emails more than once which is definitely not desirable.

Trapping `Resque::TermException` is really just kicking the can down the road.
You might prevent some of your jobs from failing, but you'll still get failed jobs.
Granted, they will fail at a lower rate, but it's still a rate correlated to the scale of your business.

The underlying problem is that jobs aren't [idempotent].

## Idem-what?

In the context of a Resque job, _idempotent_ essentially means that you can retry your job any number of times, and it won't do something undesirable (or dangerous) like double-charge your customer or sending them 20 emails.  Jobs that are idempotent are largely immune from arbitrary restarts because they be blindly retried.

At Stitch Fix, we wanted our jobs to "just work" and be automatically retriable, so we set out to make them as idempotent as we could.
The trickiest one was in charging a client's credit card.

<a name="return_1"></a>
We charge our clients a styling fee (inside a Resque job) before we ship out their Fix. 
We saw the same issues that Grouper did–as our service grew in popularity, we had more and more of these jobs, and were therefore seeing more and more of them fail due to a `TERM` signal.
Because these jobs use a third party<sup><a href="#1">1</a></sup> to charge our clients (namely, the awesomely secure and pretty-much-always-on [Braintree] _[except for the 5 minutes before I posted this, when they had a system-wide outage.  So, the following is really being used as you read this! -DBC]_), they are tricky to retry, and hard to make idempotent.

The reason it's so hard is that it's not always clear if the charge to their card actually went through at Braintree or not.
Did our job die before the charge went through and we can retry, or did the charge go through and now we have to update our database (manually) with the results?

Like I said, it's tricky. But not impossible.

## Idempotently Charging Credit Cards

To make a job like this idempotent requires some work on our end, but also some help on Braintree's side.  Fortunately, Braintree allows you to send
arbitrary data with your calls, and it will store it for later examination.  This enables a common pattern for making a job idempotent:

1. Create a record in our database in a table like `BRAINTREE_TRANSACTIONS`
2. Make the remote call to Braintree, passing the id of the row we created.
3. When the call is complete, update that row with the results of the transaction.

If we get interrupted at any step, we can safely pick up where we left off.

1. Get all credit card transactions for our client, and check for the id of our row in `BRAINTREE_TRANSACTIONS`
2. If we find it, that means the charge went through before we got interrupted, so we just need to update our database.
3. If we **don't** find it, it means the charge *didn't* go through, so we just try the charge again.

This logic is certainly more complex than just fire-and-forget, but now our styling-fee-charging job is bulletproof.
We configured it to automatically retry using [resque-retry][resqueretry], and it hasn't bothered us since (nor have our clients been double-charged).
This has a nice side effect in that if Braintree (or our connection to Braintree) goes down, we can blindly retry all the jobs that failed when it comes back up.

## Design for Idempotence 

By designing your jobs to be idempotent, you insulate them against any external factors like Heroku, third-party maintenance windows, or gophers chewing
through cables.  It's a bit more up-front cost, but it's also much simpler to test that it's working.

Now, we try to make all of our jobs idempotent and retriable. I'd recommend you do the same, as you can stop worrying about operations and start worrying
about growing your business.

---
<footer class="footnotes">
  <ol>
  <li>
  <a name="1"></a>
  <sup>1</sup> If you aren't familiar with payment processing, this is absolutely the best way to do it, because we don't have any sensitive information
  stored in our systems anywhere.  We use a secret, meaningless internal identifier to ask our secure (and heavily audited) partner to charge the client on
  our behalf.  Even if someone stole our entire database, they'd have **zero** access to our client's credit card info.  I definitely sleep better at night
  knowing this :) <a href="#return_1">↩</a>
  </li>
  </ol>
</footer>

[grouperblog]: http://eng.joingrouper.com/
[grouperpost]: http://eng.joingrouper.com/blog/2014/06/27/too-many-signals-resque-on-heroku/
[resqueretry]: https://github.com/lantins/resque-retry
[idempotent]: http://en.wikipedia.org/wiki/Idempotence
[Resque]: http://github.com/resque/resque
[Braintree]: https://www.braintreepayments.com/
