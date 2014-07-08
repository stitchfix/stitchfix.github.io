---
layout: posts
title: "A/B Testing at Stitch Fix, Introduction"
author: "Andrew Peterson"
author_url: 'http://blog.ndpsoftware.com'
date: 2014-08-01
published: true
tags:
- abtesting
- Ruby
- Database
- KISS
- MVP
categories: 
---

The more customers you have, the harder it is to know what’s going on. In the lean start-up, 
you talk directly to your customers. We’ve done a great job establishing an open feedback 
loop with our clients, and we have a very high completion rate on our feedback surveys, 
each time a client gets a Fix. But as we’ve grown, qualitative information becomes harder 
to process, and qualitative information about our clients becomes more valid and important. 
A primary tool to gather qualitative information is the A/B test, and we do our fair share of it here at Stitch Fix.

We define two kinds of tests. There are _cosmetic tests_, using different colors, 
images, wording or even layouts. We use Optimizely for these tests, and they can 
be run with little or no changes to the codebase. The easiest of these tests 
measure success based on the user’s behavior on the same page— often a button click.

But there are more complicated tests we call _feature tests_. These involve 
different flows for the users, different products presented to our stylists, and
new features. The analysis is often 
complicated, so we need to have the test information in our database where 
we can calculate metrics in ways that are difficult with 3rd party tools. 
Yes, putting these in our database adds complexity, but the insights are more invaluable.

For example, we recently added a new feature allowing our clients to receive Fixes automatically not 
only on a monthly interval, but also on other cycles, such as every other month. To figure 
out what choices to offer, we surveyed customers about their preferences, but before just 
flipping the switch, we rolled out a limited test with a small set of our clients to see whether
we had the right choices. Although this could be done with a cosmetic test, we would have had
to use simple metrics such as how many people picked each option. By by having the data in
our database, we could analyze the long-term effects of how many Fixes our clients received
and how happy they were with them.

In series of articles, I wanted to share how as a scrappy start-up we approached 
implementing these feature tests.  I’m working mostly with the front-end web site, 
but the same tools are used by our data and analytics team in testing their algorithms.

First, [the data model](/blog/2014/08/01/a-b-testing-terminology-and-data-model/).

Here's the whole series:

* [Terminology and Data Model](/blog/2014/08/01/a-b-testing-terminology-and-data-model/).
* [Dynamic Allocation and Treatments](/blog/2014/08/01/a-b-testing-dynamic-allocation-and-treatments/)
