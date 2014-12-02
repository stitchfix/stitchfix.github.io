---
title: I ♥ Julia
layout: posts
author: Eli Bressert
author_url: 'http://astrobiased.com'
published: true
location: "San Francisco, CA"
---

For the past half year I've been exploring [Julia](http://julialang.org/) in piecemeal fashion. It's a language that does not conform to the traditional notions of programming. Julia is a high-level, dynamic language (like Python) and is on par with C and Fortran in performance.

Imagine the following: You’ve done some data exploration/prototyping in R and/or Python and you’re ready to take the code a level up for heavy lifting. Next step, flesh out the code in some flavor of C or Java for high performance, or modify your Python code to take advantage of PyPy, Numba, or Cython.

## Julia to the rescue
In Julia's eyes, the above is redundant. After the prototyping you should be **done**. Sure, clean up the code, organize it, and mark it up with documentation. Then ship it out. There's no need to modify the code for specialized tools or switch languages. That's a big bonus and can save a lot of time for anyone's workflow.

Here's a short list of features that I'm liking.

- [Package installation](http://julia.readthedocs.org/en/latest/manual/packages/)
- [Profiling](http://julia.readthedocs.org/en/latest/stdlib/profile/)
- Write with and without [types](http://docs.julialang.org/en/release-0.3/manual/performance-tips/)
- Call C functions with [no wrappers or APIs](http://julia.readthedocs.org/en/latest/manual/calling-c-and-fortran-code/)
- Well designed and integrated [parallelism and distributed computing](http://julia.readthedocs.org/en/latest/manual/parallel-computing/)
- Beautifully simple [date and datetime](http://julia.readthedocs.org/en/latest/manual/dates/) functionality
- Unicode names can be [used](http://julia.readthedocs.org/en/latest/manual/variables/) for variables, functions and more
- [Macros](http://julia.readthedocs.org/en/latest/manual/metaprogramming/#macros) included
- Healthy development, [evolving](http://www.johnmyleswhite.com/notebook/2014/11/29/whats-wrong-with-statistics-in-julia/), and [growing](http://juliastats.github.io/) statistics backend

## Examples

### Package management
Julia is similar to R in terms of package management style, but it's clearly an evolved form. The package manager (Pkg) is by default flexible and modern. The basic functionalities include the following.

- `Pkg.installed()`
- `Pkg.status()`
- `Pkg.add("name_of_package")`
- `Pkg.rm("name_of_package")`
- `Pkg.update()`

There are two other functions that caught my eye: `Pkg.clone("some_git_repo")` and `Pkg.checkout("git_master_repo")`. All Julia packages are git repositories. Clonable and branchable: A recipe for easy package development and testing. If you want to install a branch instead of master in a repo, you can do `Pkg.checkout("name_of_package", branch="a_branch")`. This kind of package management is much better than what is currently available for Python packaging. R has something similar, but you have to install a few requirements to make it work.

Looking for good Julia packages? He's a good starting point: [pkg.julialang.org](http://pkg.julialang.org/).

### Unicode naming
Taking unicode names like τ and being able to employ it in code can make the mapping of equations to code easier to read. This is nothing new (Javascript can do it as well), but it makes the mapping convenient for math-heavy projects. Here's an example with the normal distribution equation. Feels a bit like going from F77 to F95.

$$ P(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)} $$

{% highlight Julia linenos %}
function  P(x, μ, σ)
1 / (σ * sqrt(2 * π)) * exp(-(x - μ)^2 / (2 * σ^2))
end

P(1.1, 0, 2)
# 0.1714719275
{% endhighlight %}

Furthermore, when you're typing in Julia's REPL or IJulia, you can type the mathematical notations and hit tab to get your special character. For example, if you type in `\Sigma` and hit tab you will get Σ. Convenient.

## Afterthoughts
There's so much more to cover on Julia, but this post is just meant to get the curious more curious. Before jumping on board with Julia, bear in mind that it's in early days. The language itself performs well, but there's a lack of libraries in comparison to R and Python. I'd say it's somewhere between 20% to 30% in library abundance. Should that stop you? It didn't for me when I adopted Python for astrophysics back in 2006 (astro packages were nearly non-existant then), which turned out to be a great investment.

Julia is a modern language. It takes the best of language features and implements them nicely, such as comprehension syntax and tuple assignment (Python features), or a great package management system that is an upgrade from R's capabilities.

Go give Julia a try on [JuliaBox](https://juliabox.org/) where you don't have to install anything.

## Running Julia on OSX
If you're planning to install Julia on OSX, here's what I found to be the easiest way to get started. First make sure you have [Cask](http://caskroom.io/) installed and then follow the details below.

{% highlight bash linenos %}
cask install Julia
{% endhighlight %}

Open up ~/.zshrc and put in the following (or your bashrc) .

{% highlight bash linenos %}
export PATH="Users/[yourusername]/Applications/Julia-X.X.X.app/Contents/Resources/julia/bin:$PATH"
{% endhighlight %}

Change the X.X.X to the version number you have installed. In my case it's Julia-0.3.3.app.

The most popular IDE for Julia is [Julia-Studio](http://forio.com/labs/julia-studio/), but it does not work for Julia newer than 2.X. Fortunately, there's [IJulia](https://github.com/JuliaLang/IJulia.jl) which uses the IPython Notebook system to create a nice data analysis environment. Otherwise you can use VIM, Sublime, or Atom with a Julia REPL to interact with.
