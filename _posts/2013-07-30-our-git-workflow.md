---
title: Our Git Workflow
layout: posts
author: Dave Copeland
author_url: 'http://naildrivin5.com'
tags:
published: true
---

An [old post][linus] from Linus Torvalds about using git popped up on Hacker News today, and reminded me of the complex [gitflow][gitflow] workflow, as
well as Scott Chacon's [post][githubflow] on "Github Flow", both of which are excellent reads.

I would tend to agree with Scott that gitflow is more complex than is generally needed.  It seems optimized for a regular release cycle with version
numbers and heavy management.  I find this sort of release management to be an anti-pattern geared more toward control and less toward delivering value.

At Stitch Fix, we (mostly<sup>1</sup>) do continuous deployment, and this is also how Github seems to work.  We're lucky that we're a small team, so we can establish
this sort of thing now, before we get too big.  I don't think it's totally a small-team-only thing, though.  My previous job was at LivingSocial, which
has a quite large dev team.  Continuous deployment feels like the only sane way to manage such a large group or people making changes.  The amount of code
that went into production in a week is enormous - to have to track that as a big lump sum release seems crazy to me.

OK, that being said, here's how we work.  It's lightweight, predictable, and easy to understand.

1. Create a branch for your work (might work on master for a small or urgent bugfix)
2. Tell our Hubot instance, Fixbot, that you are starting the ticket that captures the work
3. Write some code
4. Create a pull request in Github (this can be done in progress or when done, but might be skipped for very small changes or urgent bugfixes)
5. Other developers comment on the pull request
6. Push new changes to address whatever issues are brought up
7. When everyone's happy, and tests are passing, push the Big Green Button™ to merge it to master
8. Tests will run one more time and, on success, notify Fixbot
9. Fixbot, being notified of a clean build on master, merges master to `deploy/production` and pushes that to Heroku
10. Fixbot then lets everyone in HipChat know what happened
11. Tell fixbot to close the ticket

This is fairly simple - new code goes on branches, master is always deployable (when clean), and `deploy/production` always contains whatever's on
production.   This has a lot of benefits:

* Slow tests directly impact our ability to deliver software
* Each change to production is as small as it can be, making debugging easier
* Automation ensures consistency - we don't have a new way to deploy each new app
* Automation also allows us to easily enhance the process if we need it - no one has to ever consult the wiki to deploy
* We get the benefits of tracking issues in JIRA, but almost never have to actually use it.  Although JIRA's on the better end of the spectrum for issue tracking, I'd much rather type "@Fixbot close issue 2345" than navigate the web UI and click several times.

We also tend to follow Linus' advice and never rebase pushed commits, and tend to merge changes rather than rebase them (although I will often `rebase -i`
some smaller commits together).

Someday we might need a more sophisitcated release management system, but I doubt it.  Having worked under a wide variety of such systems (one that
included burning the software to a CD…in 2008!), each of these teams (and their users) would've benefitted from a continuous deployment workflow like
this.

---

1. We have a legacy application, currently being carved apart, that is managed manually.  We almost never change it, and so automating deployment of it hasn't been a priority

[linus]: http://www.mail-archive.com/dri-devel@lists.sourceforge.net/msg39091.html
[gitflow]: http://nvie.com/posts/a-successful-git-branching-model/
[githubflow]: http://scottchacon.com/2011/08/31/github-flow.html
