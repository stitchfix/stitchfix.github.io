---
layout: posts
title: "A/B Testing: Spreadsheets and Data Clips to the Rescue"
author: "Andrew Peterson"
author_url: 'http://blog.ndpsoftware.com'
date: 2014-08-04
published: true
tags:
- abtesting
- Ruby
- Database
- KISS
- MVP
categories: 
---


This is part 4 of [A/B Testing at Stitch Fix](/blog/2014/08/01/a-b-testing-at-stitchfix-part-1/)



After launching the test late one afternoon, I wanted to monitor it. 
One of our data engineers explained why this is a bad idea, but I’ll table that discussion for another day. 
I immediately went about writing some SQL queries to see how it was going. I hooked up to one of 
our Heroku followers, and wrote a few queries. If you've done this before, you know that the race was off 
to a rough start: experiment cell was losing dismally, then pulling ahead. Clinton, Romney, Obama… I was sweating. … 
data engineer muttering under his breath, but onward…

Once you have a SQL query running off a Heroku database, it is easy to create a “data clip” and share it with 
other people. 
If you haven’t used them yet, data clips are simple at their core: they are queries tied to a database and 
published at a URL. I published my query to a data clip, and opened it in a google spreadsheet. 

Since we
use Google Docs for much of our work, it's natural to share these with other teammates.
A little fiddling around and I had a nice dashboard with all the info we needed. It looked something like this:


 ￼

That’s basically it. With an hour of work, and no actual programming, I solved a problem in a simple way. Of course
I could have built a web-app with lots of new technologies, but this served the purpose.

## Tips

Lest you try to do this yourself, I’ll warn you: it took some fiddling to get this to work well. 
There were two main problems to solve: 

* how to structure your queries so they work well in a Google spreadsheet
* how to update the data at reasonable intervals

### Format of the Queries

I originally thought I’d write one massive query with lots of joins that would provide all the values 
we wanted to see. This would be okay, but it would be brittle. If someone wanted a different value, 
I’d have to alter the query, and likely the results would shift all around on the spreadsheet. 
Since spreadsheets are dependent on relative positions of all the cells,  any formatting or analysis 
I’d done would be lost. I decided to abandon this technique after I saw this weakness.

Next, I tried to the opposite extreme: I thought I would  import the raw data— one row for each test 
subject— and use a host of pivot tables to do the calculations within the Google spreadsheet. 
Off and running, this seemed like it would work. But as the number of test subjects approached just 1000, 
the spreadsheet started to shutter and fail. It couldn’t finish updating, add rows, and generally just broke. 
Plus pivot tables don’t always detect new rows as nicely as you’d like. This approach didn’t work.

Finally, I settled upon simple a middle ground. The dashboard above is backed by 4 fairly simple queries, 
each doing summaries of different metrics in each cell. One query reports only how many people are allocated 
to each cell. Another reports the number of conversions for each cell. In this way, using simple building blocks, 
each query is easy to understand, and different presentations of them can be done by me or all the other 
people who want to crunch the data.

On my first dashboard, I put all the `importData` statements on a second "raw data" tab of the spreadsheet. 
What I found, though, was that the Heroku data clips (or google spreadsheets— I’m not sure) would hiccup, 
and spew out random results. These could overwrite cells below or to the right of one import statement, 
messing up the spreadsheet. I’d then have to go back and rebuild all the import statements. On subsequent 
dashboards, I settled on a best practice: devote a separate tab to each import spreadsheet.


### Keeping It Fresh

Heroku publishes a URL that provides the data, and the Google spreadsheet uses the importData function to grab the data. 
Heroku gets you started by giving you a spreadsheet with something like this in cell A1:

```
=ImportData("https://dataclips.heroku.com/xfyaeifgreatkonzknyyndpug.csv")
```

Unfortunately, this doesn't seem to update-- at least not in the version of Google Spreadsheets I
was using. To update this, I usually edit the url, as such:

```
=ImportData("https://dataclips.heroku.com/xfyaeifgreatkonzknyyndpug.csv?cash”)
```

Of course doing this to see new data is annoying. And now I have 4 different queries to touch. 
I want it to work automatically. My first solution was to simply throw in a timestamp:

```
=ImportData(CONCATENATE("https://dataclips.heroku.com/xfyaeifgreatkonzknyyndpug.csv.csv?",NOW()))
```

This, however, causes the spreadsheet code to panic. Because `NOW()` is, as you know, constantly changing, 
the spreadsheet goes into a loop, and gives up after about 10 seconds. In the meantime the whole spreadsheet 
looks like it’s exploding. I’m not sure what would happen with more `importData` statements, or a 
slower machine, but this is not a workable scheme. 

But now I knew `NOW()` would update the spreadsheet, so wrapping it in a function gave me a value
that changed less often:

```
=MINUTE(NOW())
```

I created a cell for it (at F1), and with this, the import statement becomes:

```
=ImportData(CONCATENATE("https://dataclips.heroku.com/xfyaeifgreatkonzknyyndpug.csv.csv?”,$F$1))
```

Like magic, the spreadsheet updates. If it doesn’t, editing any cell on any sheet triggers a full 
recalculation. Neat.



### Conclusion

I’m a big believer in keeping it simple, and just hacking it together when you have to. 
With a little persistence I solved this problem with very little work. I hope some of 
these techniques will come in handy for you. 