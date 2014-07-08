---
layout: posts
title: "A/B Testing: Terminology and Data Model"
author: "Andrew Peterson"
author_url: 'http://blog.ndpsoftware.com'
date: 2014-08-02
published: true
tags:
- abtesting
- Ruby
- Database
- KISS
- MVP
categories: 
---

This is part 2 of [A/B Testing at Stitch Fix](/blog/2014/08/01/a-b-testing-at-stitchfix-part-1/)

First, we defined the terminology and created a simple data model. There’s an _experiment_, 
which is simply a table row with a `name` column.  We added a few things we knew we’d want:

* _owner_: who is running the experiment?
* _live_: is this experiment active? This gives us a _kill switch_ to turn off our experiment code from within the database.
* _dynamic allocation support_: For our first tests we simply created a big insert statement 
to allocate clients to cells. This worked fine, but when we wanted to run tests with our new clients, 
we couldn't use this technique. So we added _dynamic allocation_, where we could assign people to cells 
as they signed up or visited a page. 

Here was our first (and current) experiments table:

```
CREATE TABLE experiments
(
  id                  serial NOT NULL,
  name                character varying(128) NOT NULL,
  owner_id            integer NOT NULL,
  created_at          timestamp with time zone NOT NULL,
  allocation_start_at timestamp with time zone NOT NULL,
  allocation_end_at   timestamp with time zone NOT NULL,
  live                boolean DEFAULT false,
  CONSTRAINT …
)
```

Next, an clients are allocated into _cells_. For our front-end tests, each of these cells shows a 
different _treatment_ to the user.  For algorithm tests, we use this to test different versions 
of algorithms.

```
CREATE TABLE experiment_cells
(
  id             serial NOT NULL,
  experiment_id  integer NOT NULL,
  name           character varying(128) NOT NULL,
  control        boolean NOT NULL DEFAULT false,
  CONSTRAINT…
)
```
Finally, we need to allocate clients into cells. This can simply be a join table between _clients_ and _cells_.

```
CREATE TABLE experiment_allocations
(
  id                  serial NOT NULL,
  client_id           integer NOT NULL,
  experiment_cell_id  integer NOT NULL,
  created_at          timestamp with time zone NOT NULL,
  CONSTRAINT …
)
```

This is where we started.

Next up: [Dynamic Allocation and Treatments](/blog/2014/08/01/a-b-testing-dynamic-allocation-and-treatments/)


