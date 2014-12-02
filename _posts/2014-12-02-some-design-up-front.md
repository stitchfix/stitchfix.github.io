---
title: Some Design Up Front
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
published: true
image: "design_doc.png"
image_border: true
location: "San Francisco, CA"
---

<a name="footnote1-return"></a>
Being a good developer means knowing both _what_ to build and _how_ to build it.
At Stitch Fix, we don't have a dedicated product team, so we spend more time than most figuring out what to build<sup><a href="#footnote1">1</a></sup>.


The advantage of working this way is that we can develop both the “what” and the “how” together.
This means that when a developer and business partner understand each other, we're confident in what we need to deliver and what's involved in doing so.

For simple solutions, a conversation or email exchange is usually sufficient.
However, for more complex problems that might require more innovative solutions, we've come to rely on what we call a “design document” or “one-pager”.

## Design Document?  Yech!

<a name="footnote2-return"></a>
You might feel a bit icky right now.
“Design” and “Document” have become dirty words to developers, especially those raised on “agile” software development<sup><a href="#footnote2">2</a></sup>.
Although the [Agile Manifesto][agile] states “Working software over comprehensive documentation”, our “one-pagers” are not comprehensive, and do not serve as documentation.

Instead, they provide a central location around which we can have a discussion.
Often, a developer will create the design doc, but not always—sometimes our business partner will.
Before we know enough to even prototype “working software”, we can outline our thinking in prose, and have conversations around it.
Often, this discussions lead to changes in the proposed solution, or abandoning it altogether, before any code is actually written!

The entire process is lightweight, fast, and inclusive.  It embodies the famous Eisenhower quote “Plans are nothing; planning is everything.”

## How It Works

The basic process we follow is pretty simple.

1. Create a new Google Doc named for the problem at hand.
1. Create a top-level heading called “Problem”, and state the problem being solved in one paragraph or less.
1. Create a second top-level heading called “Solution” and outline the proposed solution.  If there are many solutions being discussed, outline each with a second-level heading, including pros and cons.
1. If needed, create a third top-level heading called “Technical Details” and write up anything technical that might be relevant, such as changes to the database, which applications are affected, or what's going to need to change.
1. Give it a quick read-through and edit before sharing it with the team and business partners.
1. Comments will now come in via email, and discussion is on its way!

We could certainly accomplish this with a meeting, but a written document has several advantages.
The written word is powerful and precise—exactly what's needed to discuss complex technical topics.
Because a document is asynchronous, it can be digested and read at anyone's pace and on anyone's timetable—important for remote teams and crucial for business partners with hectic schedules actually _running_ the business.

Using Google Docs (as opposed to an emailed document) allows specific sections to be commented-on, while also allowing parallel discussions in real-time.
This makes it easy for everyone to participate and contribute, not just those who are well-spoken or assertive in meetings.
Ultimately, this codifies the partnership between engineering and those running the business.

## It's About Partnership

A nice side-effect of working out a solution this way is the inclusion of some technical detail.
Doing so brings the business partners closer to understanding the tech side of the solution, which gives them confidence in us, and exposes them to the useful “inner workings” of what we're doing.

Even if they don't understand **all** the technical details, they still get a strong sense of why something is complex and where that complexity lies.
When both engineering and the business develop a shared understanding of the scope and complexity of the solution, everyone is more comfortable with any estimates around how long the work will take.

Ultimately, for a few hours work over a couple of days, we get high confidence that we're “building the right thing” and high confidence about how long it's going to take, because both developers and business partners got there together.

Next time you're facing a nontrivial task, try writing a single page outlining your approach.
You'd be amazed at what a bit of writing can do to organize your thoughts, and what a few minutes of feedback from a user or business partner can reveal about your solution.

----

<a name="footnote1"></a>
<sup>1</sup> In fact, the ability to understand a business process and provide solutions to problems with that process is far more important to us when hiring than, say, deep knowledge of Rails.
<a href="#footnote1-return">&larr;</a>

<a name="footnote2"></a>
<sup>2</sup> The scare quotes are there because the term “agile” has been so watered-down and co-opted, it's hard to know what it even means these days.
<a href="#footnote2-return">&larr;</a>

[agile]: http://agilemanifesto.org/
