---
layout: posts
title: "A/B Testing: Dynamic Allocation and Treatments"
author: "Andrew Peterson"
author_url: 'http://blog.ndpsoftware.com'
date: 2014-08-03
published: true
tags:
- abtesting
- Ruby
- Database
- KISS
- MVP
categories: 
---
This is part 3 of [A/B Testing at Stitch Fix](/blog/2014/08/01/a-b-testing-at-stitchfix-part-1/)

Running tests is two main activities: _allocating clients_ and _showing different treatments_.


## Dynamic Allocation

The code to support our first tests were trivial. We allocated all clients to cells before the test began, 
and a simple SQL query told us which treatment to show.

We’ve run quite a few tests now, and just a few more features have been added to this 
relatively simple query. The easiest way to explain it is to just show the code:

```
# Returns the allocation for the given client, or nil.
def client_allocation(experiment, client)
  return nil if experiment.nil? # might not be created yet
  return nil unless experiment.live?  # might be turned off

  allocation = Experiment::Allocation.where(experiment_id: experiment.id, client_id: client.id).
    includes(:cell).first

  if allocation.nil?
    return nil unless meets_requisites?(experiment, client)
    cell       = choose_cell(experiment, client)
    allocation = Experiment::Allocation.create!(cell: cell, client: client)
  end
  allocation
end
```

We’ve structured the code (not shown here), so that each experiment supplies a `meets_requisites?` test, 
so a client can be included or excluded. Sometimes you only want to test a subset of your users. For 
example, we only wanted to test the different scheduling user experiences with our current users who had 
already received a fix, so we implemented a custom `meets_requisites?` method.

The `choose_cell` method could be implemented any number of ways. Our first pass rolled a (two-sided) 
die to assign clients. A later experiment required assigning clients in different percentages 
to make needed sample sizes.

## Showing Treatments

We've stayed light on what it TODO


Okay, once you get the experiment running, you quickly want to know what’s happening.

Next up: Spreadsheets and Data Clips to the Rescue
