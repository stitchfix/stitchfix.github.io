---
layout: posts
title: "Machine and Expert-Human Resources: A Synthesis of Art and Science for Recommendations"
author: Eric Colson
date: 2014-07-21 11:01
published: true
tags:
---
The process of selecting just the right merchandise for each of our clients is not a simple one; there is much that needs to be taken into account.
There are parts of the process that can be broken down and framed as a mathematical model of client utility.
Here, the individual preferences for each client can be modeled and validated empirically through machine processing of structured data.
However, there are other parts that evade such strict rationality assumptions and tend to be better evaluated emotionally or from information not manifested in structured data.
For this, we need to rely on the judgments of expert-humans.
Each piece contributes distinct value to the overall selection process and exclusive focus on either one would be incomplete.
For this reason, the Stitch Fix styling application has been architected to leverage diverse resources - both machines and expert-humans - in order to exhaust all available information and processing.

## Machine Resources  

Each attribute that describes a piece of merchandise can be represented as data and reconciled to each client’s unique preferences.
For example, the way a certain blouse fits tightly on the shoulders and flaunts the upper-arms may provide value to some clients while being an undesirable quality to others.
Attributes such as color, fit, style, material, pattern, silhouette, brand, price, trendiness, ...etc.
can each be similarly quantified for the value they provide to each client.
Machines are great at finding and applying these relationships.
They can even quantify interactions between latent attributes, capturing the value provided by obscured relationships.
Machines perform these tasks by computing literally billions of calculations on structured historical data that capture the interactions between each client and each piece of merchandise.
This might include distance or similarity calculations, mixed effect models, matrix factorization,  principal component analysis (PCA), logistic regression, or any number of statistical-learning / machine-learning techniques.

![Various Types of Algorithms](/assets/images/blog/various_types_of_algorithms.jpg)

The output from machine processing is a set of scores representing the relevancy between the client and each piece of merchandise.
These scores encapsulate all the relationships inherent to the data, representing the aggregate knowledge amassed from vast amounts of client-merchandise interactions, and applied to the personal preferences of each client.

## Expert-Human Resources  

While machines are incredibly efficient at extracting patterns in structured data there is still both information and processing which fall outside of their purview.
Much of the accord between a client and clothing owes to properties that are elusive from precise quantification.
Rather, they are evaluated emotionally - almost on impulse and often automatically and subconsciously <sup><a
href="#1">1</a></sup>.
This is the type of judgment that is exercised by expert-humans.
We witness it the way an experienced chef effortlessly assesses - from just tiniest of tastes - whether a new ingredient improves the flavor of a sauce; or, in the way a trained musician instantly detects when a single note is out of harmony.
The response is remarkably refined yet seemingly more reliant on instinct rather than a prescribed set of conscious steps.
For Stitch Fix, expert-human judgment comes from our stylists - a group of over 500 fashion-inclined individuals who compose our distributed workforce for human computation.


Given their distinct abilities vs that of machines, our stylists take on a very different set of tasks within the styling process.
First, they leverage additional Information that only they, as humans, have access to.
This is the unstructured data in the form of images, videos, and free-form text.
This data can be used to further contextualize the relevancy between the client and the merchandise.
For example, the free-form text of a request note may read, "I need clothes for an upcoming cruise".
Or, by viewing a client’s Pinterest board, a stylist can better get a sense of her preferences – even those not explicitly articulated.
These are material expressions of client preferences, yet the unstructured data is notoriously difficult to process by machines <sup><a href="#2">2</a></sup>.
But, for our stylist the information is easily absorbed and taken into account.
She may even leverage her own private information or her ability to empathise in order to incorporate trends or social phenomena not yet manifested in the structured data.
Next, she performs the task of curation, where she synthesizes concepts from the individual items to create a cohesive set that collectively represent better relevance.
Finally, she helps to foster a relationship with the client by explaining the selections and providing styling tips.
This provides transparency and engenders trust.

![Human Stylist](/assets/images/blog/human_stylist.png)

## Coordinating Resources

In order to leverage each type of processing in our styling application we needed to design an infrastructure that can utilize each resource from within a single system.
Machines and humans have very different work styles: machines are nearly indefatigable, executing in large batch processing routines throughout the night while humans work intermittently, taking individual tasks on a flexible, on-demand basis.
As such, a queueing mechanism coordinates the work between them in an asynchronous fashion.
The tasks are sequenced such that machines do their processing first in order to make the much-more-expensive human processing more efficient.
Our Engineering team has developed a very slick interface <sup><a href="#3">3</a></sup> where the stylists can interact with output from machines.
In this app they are presented with the results from machine processing as well as the information they need to perform their tasks: images, video, client notes, Pinterest boards, ...etc.


![Coordinate](/assets/images/blog/coordinate.png)

The result is a set merchandise more relevant than either machine or human could have achieved alone.
Working together, their contributions combine to produce a synthesis that exhausts all processing and all data.
Over time, their efforts are even reinforcing as they provide each other with valuable feedback, validating hypothesis in some cases and revealing biases in others.
They are better together and represent art & science that so embody the Stitch Fix culture <sup><a href="#4">4</a></sup>.


## Postscript

Its interesting that what makes our approach novel is the use of humans in a recommendation system.
Just a few years ago the novelty of recommendation engines was precisely the absence of humans in system.



<footer class="footnotes">
  <ol>
  <li>
  <a name="1"></a>
  <sup>1</sup> Kahneman, Daniel. Thinking, Fast and Slow. New York: Farrar, Straus and Giroux, 2011.
  </li>
  <li>
  <a name="2"></a>
  <sup>2</sup> While there have been material innovations in the ability of machines to process unstructured data, it is still not to the point where it is viable for the level of confidence needed at Stitch Fix.

  </li>
  <li>
  <a name="3"></a>
  <sup>3</sup> One of our unique advantages is that we don’t have to develop and maintain an ecommerce site since our clients delegate the shopping task to us.    This allows us to apply engineering resources towards internal applications.  The result is polished and elegant internal applications - a rarity for most ecommerce companies.

  </li>
  <li>
  <a name="4"></a>
  <sup>4</sup> "better together" and "art & science" are prominent values in the Stitch Fix culture.

  </li>
  </ol>
</footer>

