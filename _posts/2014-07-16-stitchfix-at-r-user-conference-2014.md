---
layout: posts
title: "Stitch Fix at useR! 2014"
author: "Bhaskar Rao"
date: 2014-07-16 11:01
published: true
categories: 
---
I just returned having spent a great day in Los Angeles, CA (at UCLA main campus) where I had the pleasure of giving a talk at the [R User 2014 Conference][user-2014]. The conference brought together top users and developers of [R][rlanguage]. It was a great place to share ideas on how to best apply the R language and its tools to address challenges in data management, processing, analytics and visualization.

Before I present my highlights, I’d like to acknowledge  UCLA for doing such a great job in organizing and hosting this event.  Thank you!

<!-- more -->

*Some highlights:*

I really enjoyed my fellow presenters in the Session 4 talks related to R in business. One worthy mention was Nilesh Shah’s talk [“A real time, responsive Quantitative trading analysis Mobile App using R”][abstract1]. A great web app built by an R enthusiast completely in his spare time.

[Open CPU][opencpu] is another R project that I heard about at this conference.  We are actively exploring it at Stitch Fix and we are really excited for its potential.

*R, Shiny and ETD:*
![Shiny Web Dashboards](/assets/images/blog/shiny_dashboards.png)
The Algorithms & Analytics team at Stitch Fix are big fans of R (obviously) and the [Shiny framework][shiny] which is a web applications framework that helps us easily build interactive web dashboards in R. Extract Transform Display (ETD) is  a design pattern inspired from the familiar Extract-Transform-Load (ETL) paradigm prevalent in the Data-warehouse world. Through smart encapsulation, Shiny helps our data scientists be autonomous and build and publish web-based dashboards, reports and analysis.

The ETD design pattern further streamlines the work by reducing the number of lines of code, promoting modularity and re-use, and making R code much easier to maintain.  Watch out for our next blog post that covers Shiny and ETD in detail.

The Industry lightning talks session, where I gave my talk, was well attended. The room was packed, with many people sitting on the floor! Stitch Fix is great fan of the Shiny framework and it was encouraging to see more than 60% of the attendees had heard of Shiny. A great testament to RStudio’s work on this tool.

*Concluding Thoughts:*

This was Stitch Fix first foray into the useR! conference and we are glad we flew to Los Angeles to attend it. There is some great innovation happening in the world of R that I urge everyone to pay closer attention to. So long useR! see you again next year.

<a href="/assets/files/etd_useR_la4.pdf" target="_blank">Download ETD Talk slides</a>

[user-2014]: http://user2014.stat.ucla.edu/
[abstract1]: http://user2014.stat.ucla.edu/abstracts/talks/210_Shah.pdf
[opencpu]: http://www.opencpu.org/
[rlanguage]: http://www.r-project.org/
[shiny]: http://shiny.rstudio.com/