---
title: Multithreaded Data - John Myles White on Julia
layout: posts
author: Eli Bressert
author_url: 'https://twitter.com/astrobiased'
published: true
location: "San Francisco, CA"
---

Last week we kicked off our first [Multithreaded Data event](http://www.meetup.com/Multithreaded-Data/events/220356115/), where [John Myles White](http://www.johnmyleswhite.com/) gave a talk about Julia, a new programming language that some of us [love](http://technology.stitchfix.com/blog/2014/12/04/i-heart-julia/)). It’s the first of many exciting talks to come at Stitch Fix. Our next invited speaker is [Hadley Wickham](http://had.co.nz/), who will be talking about how to get data into R. If you’re in the SF bay area and the topic excites you, keep an eye out for our upcoming [events](http://www.meetup.com/Multithreaded-Data/)!

##Why Julia Matters for Data Science

John’s talk focussed on why performance matters for realistic data science workloads in industry. He highlighted how programming languages like R and Python lack the design characteristics (like type consistency) necessary for high performance computing. Because performance matters, we need to have better programming language tools for doing data science.

<br />

![John talking about Julia](/assets/images/blog/jmw_multithreaded_data_talk_cropped.jpg)


##Julia is fast

To describe what's wrong with the current generation of programming languages, John walked us through an example of writing a naive implementation of [Brownian motion](http://en.wikipedia.org/wiki/Brownian_motion) in R:

{% highlight R linenos %}
loop <- function (n) {
    x <- 0.0
    for (i in 1:n) {
       x <- x + rnorm(1)
    }
    return(x)
}

{% endhighlight %}

Computing a single sample from this process for `n = 10,000,000` takes around 35 seconds in R. Here’s a translation of that R code into Julia:

{% highlight Julia linenos %}
function loop(n)
    x = 0.0
    for i in 1:n
        x = x + randn()
    end
    return x
end

{% endhighlight %}

This implementation takes only 0.14 seconds to run - a whopping 250x faster than R. Some of the main reasons why the R interpreter executes so much more slowly than the Julia compiler include:

* Numerical values in R are subject to indirection because R almost
never assumes that the type of a variable is constant throughout the body of a function.

* Scalar values in R don't exist, which imposes additional indirection
when you only want to work with a single scalar value.

* Because scalar values don't exist in R, every single addition step in
the main loop of this function has to allocate a new chunk of memory in
which to store a vector.

* Because R allows function calls within a function to change the
semantics of almost any construct in the language, every operation must check whether its semantics are unaltered at every iteration in the loop.

Taken collectively, John argued that most of the time that the R interpreter uses to generate a single sample using this Brownian motion code isn't strictly necessary to producing the correct result. In other words, the R interpreter executes code that exists only to deal with possibilities that don't often arise in practice.

##What’s Julia’s secret sauce?

So what makes Julia so efficient?

* Julia infers the types of all variables inside the body of the `loop` function, conditional on knowing the types of the input arguments `n`. In practice, `loop` is only going to be called with an integer argument, so John was able to walk through the full inference results for `loop`.

* With the results of type inference in hand, Julia is able to ask LLVM to generate machine code at run-time that corresponds to what a simple translation of the type-annotated Julia code into C would compile into.

* Julia then executes the function body using the run-time compiled
code rather than interpreting the raw source code.

What sets Julia apart from existing data science languages is the combined strength of Julia's type inference system, a large body of Julia code that's amenable to type inference, and the quality of LLVM's generated machine code.

##Concluding remarks

John closed his talk by describing the reasons why it's so much easier to do type inference in Julia than in R or Python. Given the difficulty of employing the specific compiler techniques being used to speed up Julia, John described some alternative compiler techniques we might expect to see developed for R and Python, but noted that these techniques are often more technically challenging to implement correctly. Some examples are [PyPy](http://pypy.org/), [Numba](http://numba.pydata.org/), and [R LLVM](http://www.omegahat.org/Rllvm/). The advantages of these experimental compilers could be great, but they could require substantially more development effort to achieve similar results to Julia’s existing compiler.

Given those difficulties, John believes that Julia is best positioned to be the next generation data science language in the future. It’s still a young language today and the language is rapidly evolving. If you’re an active R or Python user and you’re comfortable with your tools, it’s best to stick with them for now. But, if you’d like to pay the pioneer tax and potentially shape one of the next-generation languages, bringing Julia into your toolchain is a great way to go.
