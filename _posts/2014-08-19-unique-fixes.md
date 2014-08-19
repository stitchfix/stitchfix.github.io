---
layout: posts
title: As Unique as You
author: Eric Colson
author_url: 'https://www.linkedin.com/in/ecolson'
date: 2014-08-19 15:31
published: true 
tags:
---

![Client Style Vectors](/assets/images/blog/client_style_vectors.png)

Each of our clients is unique.  The visualization above shows a small sample of our clients represented by just one feature: a vector of style preferences.  This alone isn’t enough to make every client unique, but our algorithms and stylists take into consideration many other features such as size, height, profession, age, geography, fit preferences, price preferences, past purchases, adventurousness, etc.  When we take into account all the features combined, every single client is truly unique.  And, since clothing preferences are so deeply personal, it therefore stands to reason that each Fix <sup><a href="#1">1</a></sup> should also be unique.

And, indeed they are.  In all of our history, no two Fixes have contained the same selection of items.   This may seem surprising at first; it’s intuitive to think that random luck alone would generate a few occurrences.  But when you take into account the vast inventory we have to choose from, it is easy to see how our Fixes can be as unique as our clients.   Our buyers are constantly sourcing new merchandise from a variety of vendors large and small.  They look for up-and-coming labels,  experiment with new brands, and buy in very small lots from a large number of vendors.   This creates a set of inventory that is extremely dynamic and diverse.  When it comes time to prepare each Fix there is a very broad and fresh set of items to choose from.  From a mathematical perspective, one can think of it as a [n choose k][binomial_coefficient] problem.  That is, the number of possible sets of _k_ that can be made from _n_ items is given by:

<img src="/assets/images/blog/nchoosek.png" alt="N choose K" style="width:152px;height:53px">

For Stitch Fix, the _k_ is fixed at five (we select 5 items for each Fix).  However, the _n_ - the number of distinct items from which we have to choose - is always changing and huge!   I can’t disclose the exact number of distinct items we have available at any given time.  However, the resulting number of sets of 5 items you can make from our inventory is typically in the billions to trillions.  Therefore, if one were to draw random sets of 5 items, the probability of pulling two sets that shared the same 5 items is extremely small - even after millions of tries.

But, of course, our Fixes are anything but random.  Rather they are the synthesis of machine-learning algorithms and expert-human judgment (see my previous post [here][post_on_humans_and_machines]).  Each item is carefully selected to meet each client’s specific preferences.   Interestingly, while each client’s preferences are unique, they are also correlated.    This is because preferences for apparel are individual as well as social.   We are influenced by trends and fads that pervade our culture.  We discover new styles by seeing what others are wearing. And, we want to assimilate - either consciously or unconsciously.  We want to fit in. We want to be “current” or “in-style”.  As a result, we would expect some concentration in popular items.   And indeed, we do see evidence of social influence and observe that some Fixes do share a few items.   But, individual preferences make it exceedingly rare for any two Fixes to share more than a few items.   Regardless of how fashionable, the clothes need to look good on _her_ body and to be in-line with _her_ specific preferences for fit, size, color, price, material, etc.    These individual preferences act as a tension to social pressures and ultimately produce the uniqueness we see in our Fixes.

What’s gratifying to me about the uniqueness of our Fixes is that we have made no effort to make them so. There is no mandate to ensure clients receive different things -- there is no code to check for such occurrences nor is there collaboration among stylist.  It just happens this way because we cater to each client’s specific needs - both the need to be in-style and the need for individual expression.


<a name="1"></a>
<sup>1</sup>  A “fix” is what we call the curated shipments of clothes that we send to our clients.

[binomial_coefficient]: http://en.wikipedia.org/wiki/Binomial_coefficient
[post_on_humans_and_machines]: http://technology.stitchfix.com/blog/2014/07/21/machine-and-expert-human-resources/

