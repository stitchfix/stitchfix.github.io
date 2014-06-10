---
layout: posts
title: "Resque Brain - a Better resque-web"
author: "Dave Copeland"
date: 2014-06-11
published: true
categories: 
---

We use [Resque][resque] for at Stitch Fix…a lot.  For background processing
or getting work out of the web request/response loop, Resque is our go-to technology.

Because we have many single-purpose applications (instead of one awful MonoRail),
we also have many Resque instances (we can't have an influx of user signups cause 
shipping label generation to slow down, thus taking out the warehouse).  Getting an
overview of all of these instances at once is impossible with resque-web.

Today, we're introducing [Resque Brain][resque-brain], an open source application that
monitors multiple resque instances.  It has a mobile-friendly UI, and provides
better tools for managing the failed queue.  It also includes some basic monitoring
and statistics tasks.

We've been using it for about a month.  It's open source, Apache-licensend, and ready
for action.  [Source is on GitHub][resque-brain-source].

![Screenshot](https://camo.githubusercontent.com/76a0d96bdf902ba943bf84682144d0701bdeddc2/68747470733a2f2f7777772e657665726e6f74652e636f6d2f73686172642f7337312f73682f39373630623730622d393062372d346162652d613865372d3739663264336432323165362f30313934373137376334353265313535653364346136616663656463663263312f646565702f302f5265737175652d427261696e2e706e67)

[resque]: https://github.com/resque/resque
[resque-brain]: http://tech.stitchfix.com/resque-brain
[resque-brain-source]: https://github.com/stitchfix/resque-brain
