---
title: "Assume the user is correct"
layout: posts
location: "Washington, DC"
author: Dave Copeland
author_url: 'http://naildrivin5.com'
image: "hizzy.jpg"
published: true
---

A mentioned [previously][internal-apps-post], a lot of what we do at Stitch Fix is create software to *run* Stitch Fix.
While we have a team dedicated to our (external) customers' experience, most engineers are working on software for internal users.

[internal-apps-post]: http://technology.stitchfix.com/blog/2014/08/27/tip-of-the-iceberg/

Having a good relationship with our internal users is a key part of our success.
We encourage them to reach out to us with any questions, and created avenues for them to do so.
We also reach out to them when needed, too<sup><a href="#1">1</a></sup><a name="back-1"></a>.

When the users reach out, they typically have straightforward questions, or report fairly obvious bugs.
But, on occasion, they report behavior so strange, it can't be believed.
I'll be absolutely *convinced* what they are saying could never happen.
But, when I dig in, I find that the user was spot-on.

Now, we have a saying: “assume the user is correct”.  Let me give you a recent example.

## Disrupting Warehouse Operations with 1 Click

Our warehouse production process begins with printing pick-slips in bulk (the “pick-slip” contains basic information needed to locate the items that go into a shipment, and acts as a physical “token” that lets everyone know who's working on a shipment).
Bulk-printing these pick-slips is a critical activity.  Printing a pick-slip twice means two people work on the same shipment.  Losing (or not printing) a pick-slip means the shipment gets lost and won't ship.
As such, very few users have access to do this and those that do are given special training.

On Thursday, one of our warehouse managers reached out to engineering to find out why an employee they didn't know had printed all their pick-slips (we keep a lot of detailed logs).
When the pick-slips are printed, the system remembers this so they won't be printed in a future batch.
So, the warehouse saw that a large batch of pick-slips were printed, but they didn't have the physical printouts.

Looking into it, the user that printed them was one of our customer service (CS) agents (who works at our headquarters, not in a warehouse).
CS agents shouldn't have access to print a warehouse's pick-slips, though they do occasionally print one-offs.
There's no restriction on printing a single pick-slip, but for some reason, this agent, and this agent only, had access to bulk-print.
So, we reached out to her.

## The Investigation Continues

She claimed she had just printed a one-off, and not initiated the bulk-printing process.
The bulk-printing process is a huge, red button, and pops up a modal confirmation, requiring re-entering the number of pick-slips to print.
It's loud, annoying, in-your-face, and not something your muscle memory can work around.
And she had definitely initiated and confirmed that entire process.

She maintained she hadn't, and had just done a one-off.

My initial instinct was that she was mistaken.
The log said she had done it, and how could anyone **not** see all the popup warnings and then *re-type* the number without knowing what was going on?
Just before I convinced myself she was wrong, I remembered our mantra: “assume the user is correct”.

So, I decided to try to **prove** that she was correct, rather than convince myself she wasn't.

## Correct, Until Proven Wrong

It turns out that doing exactly what she said she had done **did** lead to the system bulk-printing all the pick-slips.
I was astonished.
How could this not have caused massive problems?

Had the agent *not* been accidentally given access to the bulk-printing feature, what she had done would've triggered a harmless error message.
And because warehouse workers *with* access almost never print one-offs, the bug lay dormant, waiting for this confluence of seemingly unrelated events.

The bugfix was, as expected, a one line code change that took five minutes.  The deploy took longer than the fix.

This isn't the first time something like this has happened, and it won't be the last.
I'm just thankful the users make themselves available and help us understand how they're using the software.

## The Moral of the Story

Whether your users are internal or external, I *guarantee* that if you decide to believe the most outlandish things they say about your software, you will uncover bugs.
Assume the user is correct, and try to prove that what they say happened actually happened.
You'll be surprised (and grateful).


---

<footer class="footnotes">
  <ol>
  <li>
  <a name="1"></a>
  <sup>1</sup> I've been known to see an error in Bugsnag, check the user id, and email them that I'm aware of their problem, and working on it.  It may seem a bit creepy, but ultimately seems to be appreciated :) <a href="#back-1">↩</a>
  </li>
  </ol>
</footer>
