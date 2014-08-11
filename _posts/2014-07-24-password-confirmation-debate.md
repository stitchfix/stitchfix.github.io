---
layout: posts
title: "Should we use multiple input fields to prevent mistakes by users?"
author: Andy Peterson
author_url: 'http://ndpsoftware.com'
date: 2014-07-24
published: true
tags: ux, a/b testing, conversion
---
At Stitch Fix, we’re working on our sign-up flow. During this process, we debated whether we should have a single password field, or, as many sites do, two— the second one being a “password confirmation”.

Some sites use the same technique with email and email confirmation.

I found quite a few articles that advocated certain practices around this, but I thought it would be useful to synthesize them in one place, along with some conclusions and recommendations. Here ya go.

First off, there’s no clear best practice out there in the wild. Some popular sites (Twitter) have a single password field, and others (Google, Amazon), have two. A few big sites (Facebook, Amazon) also have a double “email” field, while most don’t. 

Here’s why there's variation – let’s test the email field. We give half the people one field, and half of them two, and we'll look at two metrics: (1) conversion rate of the form, and (2) email address mistakes. If everything goes as predicted, both numbers go down, and the conversion rate goes down, but accuracy goes up. Because every company is going to value this tradeoff differently, there can be no single answer for all. Conversion rates may be most important for one, accurate emails most important to another.  

Let see if we can reason our way to an answer. Does using two fields ever make sense? For email fields, does a second field really reduce errors? This won’t catch an error for anyone who quickly copies and pastes, nor will it catch errors for the people who mistype their email in the same way habitually. It will just catch the small percentage that are left, who type their email address correct only about 50% of the time or more. 

To go to the logical extreme, if this were a great way to get correct input, wouldn’t every credit card form feature two credit card number fields? Or wouldn’t it be best practice to double every important field? Or triple really important ones? Of course not! So, this technique doesn’t make much sense for an email address. There are better techniques for email addresses, such as validating domains or sending confirmation emails.

I also think there’s also a subtle psychological effect here. When I see a double email field, I am annoyed— don’t you trust me to type my email correctly? I’m annoyed, but generally continue on with the form. In general, I’d like to be treated with respect, and asked only for the essential information, and be trusted to provide it accurately. So, this UX may be communicated certain values unintentionally.

Passwords, however, are masked, so should we be treating them differently? In the olden days, I’d type in my password, and was not sure if I got it right, since none of the characters were echoed back to me. So the second password field allowed me to type it a little more carefully again, and then see that I got it right.

Password fields are nicer now. Most browsers will show you the character as you type it, and only fade it out after the next character, or some amount of time. Newer versions of IE even have a “peek” mode, where the password can be shown in its full glory. So by the time I’m at the end of the first password field, I’m pretty confident in what I typed.

Passwords are also more sophisticated. Many use longer passwords that really are a pain to type repeatedly. I’d rather just go through it once very carefully. Or use a password manager, which does the duplicate entry for me.

So overall, duplicate entry for passwords is less valuable than it once was.

### Conclusion
So is there an answer here? A few learnings and recommendations:

  * Start out with a single input field. This is nicer for your users, and there’s no overwhelming evidence that duplicate fields are better.
  * If you have problems with lots of people not knowing their passwords, make your “Forgot your password” flow nice and self-service. If you still aren’t satisfied, A/B test a confirmation field, but don’t be surprised if the answer isn’t obvious.
  * If you have problems with bad email addresses, make sure you are doing what validation you can. At Stitch Fix we eliminated a significant number of email bounces doing a better job validating email addresses. After that, for more robust sites, consider an “email confirmation” flow. 
