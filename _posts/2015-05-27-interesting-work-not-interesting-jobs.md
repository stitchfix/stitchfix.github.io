---
title: Go for interesting work, not 'interesting' jobs
layout: posts
author: Nick Reavill
author_url: https://www.linkedin.com/in/nreavill
published: true
location: "San Francisco"
---
A couple of years ago a developer friend and I were discussing our ideal engineering jobs. I didn't have a specific idea of what mine would be but I knew that it would sound boring to most people. Less than a year later I found myself at Stitch Fix doing just that and I could not be happier.

There are two general problems with interesting jobs. The first is that what seems interesting from the outside can turn out to be mostly tedious once you're doing it. I was a singer in many bands during my twenties. Playing live is incredible, and writing songs is pretty good (and presumably much better if you are talented), but most of the time you are rehearsing (playing the same song over and over and over again in a foul-smelling room, mostly being ignored by the actual musicians) or recording (mostly sitting on a foul-smelling sofa drinking tea). From what I can tell acting, especially in movies or on TV, has a similarly high sofa quotient.

The second problem is that the perceived interestingness of a particular job is probably somewhat proportional to the number of people who want that job. If lots of people want to do the same job then competition will be intense which will inevitably lead to downward pressure on wages. Once again, see acting where unemployment rates are above 80%. Elsewhere in the film industry, [entry level jobs][runner-job-description], even for post-graduates, can pay minimum wage.

If you are a software engineer you are unlikely to be looking at minimum wage for your first job - despite the media frenzy this industry is still not as interesting as the movies - but the competition for 'interesting' engineering jobs is likely to be intense. It's common for talented engineers to focus their job hunts on the hottest startups or highest profile tech companies. But they might have more luck doing a bit of 'Moneyball'-style analysis to find companies that are undervalued by other software engineers.

In this context 'value' means companies where your work will have a significant impact on the business. Software has a huge impact at Google, for example, but if you're the 20,000th sotware engineer how much marginal impact are you going to have? If, however, you are the 20th engineer at a mature business with money in its pockets and a leadership interested in innovation, it's likely that you can play a large part in whatever technology they decide to develop. You'll probably get a chance to help make those decisions.

Here are a couple of examples of companies that, a few years ago at least, would not have been obvious candidates for 'interesting' jobs:

* New York Times: An old media stalwart, founded in 1851 it produces some [incredible data visualizations][nytime-data-viz]
* Etsy: a marketplace for buying and selling unique goods. Built the popular [statsd library][statsd] and popularised the idea of ['Measure Anything, Measure Everything'][etsy-blog]

Or take, for example, just plucked at random, Stitch Fix, where I work. Stitch Fix is an online styling service that makes its money selling clothes to women. Since Stitch Fix is an innovator in the retail industry people already in the retail industry are pretty excited to work here. That's why the [executive team][exec-team] of this still young startup is made up of people whose former jobs were COO at Walmart.com, a GM at Nike, CMO at Sephora, and VP Data Science at Netflix.

Of course, not many software professionals are desperate to work in the retail industry, but consider the problems we are trying to solve (to name just a few):

Stitch Fix has built a unique styling platform used by over 1,500 stylists who work 10 to 30 hrs/week. This platform, designed and built by the engineering team, allows stylists to work with a short list of styles, recommended by an algorithm specifically for each client, to pick five items the customer will love. How would you build a tool that can handle a different data set for every client as well as presenting all a client's previous shopping history, in a way that improves a stylist's efficiency and success rate?
Our customers give us enormous amount of data about themselves.  We also have a lot of data about  the clothes we sell. Our world-class [data science team][data-sci-team] produces insightful analysis about the interactions between the client and clothes. How can you  integrate real-time sales data and client feedback analysis into the tools where the buying teams are planning and placing orders for inventory six months from now?
Stitch Fix has peculiar warehouse operations (e.g., our business model means that a majority of our shipments result in returns) and those operations have requirements not catered to by off-the-shelf software. How can you help our Operations team to build innovative tools for novel processes?
Our customers are far from the typical early adopter that most startups encounter. We ask our customers for a lot of information. How would you make it easy for them to give us all that information?

When you are considering where you want to work as a software engineer it might benefit you to look outside the obvious companies and industries and find companies like Stitch Fix where you will have a chance to make a huge impact with your software, and not just at the fringes.

[runner-job-description]: http://www.prospects.ac.uk/runner_broadcasting_film_video_job_description.htm
[nytime-data-viz]: http://www.nytimes.com/interactive/2014/08/13/upshot/where-people-in-each-state-were-born.html?abt=0002&abg=1
[statsd]: https://github.com/etsy/statsd
[etsy-blog]: https://codeascraft.com/2011/02/15/measure-anything-measure-everything/
[exec-team]: https://www.stitchfix.com/about#team
[data-sci-team]: http://technology.stitchfix.com/#data-science
