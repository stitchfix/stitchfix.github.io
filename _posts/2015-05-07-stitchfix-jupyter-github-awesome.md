---
title: Stitch Fix + Jupyter + Github = Awesome!
layout: posts
author: Greg Novak and Eli Bressert 
author_url: http://technology.stitchfix.com/#team
published: true
location: "San Francisco"
---

### Streamlining research at Stitch Fix with Jupyter
At Stitch Fix we are avid users of Jupyter for research at both the personal and team scales. At the personal level, Jupyter is a great interface to research the question at hand. It captures the workflow of the research where we can take detailed notes on the code and explain models with written content and mathematical equations. 

At the team level, Jupyter is a great tool for communication. Notebooks allow one to fluidly mix text, code, equations, data, and plots in whatever way makes the most sense to explain something. You can organize your explanation around your thought process rather than around the artificial lines determined by the tools you’re using.  You have a single Jupyter notebook instead of a bunch of disconnected files, one containing SQL code, another Python, a third LaTeX to typeset equations.

When the analysis is finished, the Jupyter notebook remains a “living” interactive research notebook.  Re-doing the analysis using new data or different assumptions is simple.

### Github Facilitates Collaboration
The portability and flexibility of the Notebooks allows us to easily share the analysis with others.[ GitHub integration](https://github.com/blog/1995-github-jupyter-notebooks-3) allows a great new possibility: other researches can branch or fork the notebook to extend or alter the analysis according to their own particular interests! We’ve already been using GitHub for versioning all of our code and this new feature is an awesome addition to our data science workflow.

![image of new GitHub feature](/assets/images/blog/github_jupyter.png)

### A taste of what we do at Stitch Fix
Stitch Fix provides clothing to its clients based on their style preferences.  We send a client five pieces of clothing we predict they’ll like, and the client chooses what to keep. Inevitably, some pieces of clothing will be more popular than others. In some cases, a few select items may be unpopular. 

The largest benefit from adding a single style of clothing to our line of inventory comes from the most popular one. Each of the less popular styles, by itself, contributes less.  However, there are *many* of the less popular ones, reflecting the fact that our clients are unique in their fashion preferences. Together, the value in the "long tail" can match or exceed the value of the few products in the "head."  Catering to the long tail allows us to save our clients the time they would otherwise spend searching through many retail stores to find clothing that’s unique to their tastes.

But, where do we draw the line on how far into the long tail we should support? Below we investigate this question using the Jupyter Notebook on [GitHub](https://github.com/stitchfix/Algorithms-Notebooks/blob/master/Long-Tails.ipynb).



