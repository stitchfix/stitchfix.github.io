---
layout: post
title: "The Value of Minimal, Flexible Systems"
author: "Joel Strait"
author_url: 'http://www.joelstrait.com'
date: 2014-06-30
published: true
categories:
---

We call it "Old Admin". A basic admin interface (similar to Rails' [Active Admin](http://activeadmin.info/)) built by an outside team before the current engineering team arrived. For a time it ran our whole business. One of the first tasks of our original engineers was to replace it with something more sophisticated. However, limited as it was in many ways, it inadvertently taught us some good lessons about designing internal systems.

In many ways Old Admin was just a web interface to our database. We wanted to replace it with a better system right away, and got a lot of feedback from our colleagues outside of engineering about how a new system should work. However, we lacked the engineering resources to replace everything at once. Out of necessity, the business began to adapt to Old Admin as best as they could in the mean time. After some time we noticed two interesting things:

1. Because it provided (very basic) flexibility, the business was able to improvise ways to use it to solve problems without engineering involvement.
2. By observing how our colleagues outside of engineering used it, we were able to learn a lot about how they did their jobs and what they needed in an internal app, which sometimes differed from what they originally told us they needed.

Since the system had basic flexibility built in, it acted as a safety valve against the fact that we (at the time) couldn't build a new system overnight. It turned out that a minimal but flexible system was a lot more valuable than nothing.

It also acted as an avenue toward learning *real* requirements, which as every engineer knows are often different from what people say the requirements are. In writing, there's the expression "show, don't tell". Similarly, when designing a system a good rule of thumb is "observe, don't ask". By giving our internal users a basic flexible system and observing how they used it, we learned a lot about what our colleagues actually needed and were able to build systems around that.

We have much more engineering bandwidth these days, but like any growing business we'll always have more stuff we want to do than our capacity allows. So sometimes instead of jumping into a full, complicated feature set, we'll intentionally build something very simple, yet flexible. For example, adding a text area field, or a way that lets people add arbitrary tags. There's a lot you can do with those, and they're relatively easy to build. After people use it for awhile we often notice, say, tags being used in certain ways, which suggests ways to build a more sophisticated (but higher effort) feature. Try it and see for yourself.
