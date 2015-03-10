*Proposed Outline:*
```
I. Introduction
II. Table of contents by problem
III. Each problem
  A. Title
    1. Attribution and environment sub-heading
  B. Problem
  C. Solution
    1. Input
    2. Command
    3. Explanation
IV. ~~Closing~~?
```

--

I &#10084; UNIX and using the command line; they help me solve problems at Stitch Fix.  I'm not alone.  Across the Data Science and Engineering teams, we're constantly solving problems with UNIX and the command line.  **TODO: Closing sentence replaces closing section?**  

   
## Problems and Solutions
 - Files
   - [What size are these images?](#check-image-size)
   - [What files recently changed?]()
   - [How many lines are in this data dump?]()
   - [How do you bulk change filenames?]()
   - [Can I efficiently and securely copy these files?]()
 - Directories
   - [Directory File Summary]()
   - [Sort Directories By Number Of Files]()
   - [Delete Directory With Large Number Of Files]()
 - CSVs
   - [Filter CSV File By Column Values]()
   - [Index CSV File]()
 - Systems 
   - [Display Resource Usage and Availability]()
   - [Easily Manage Python Virtual Environments]()
 - Productivity
   - [Alias Everything]()
   - [Command Completion Alert]()
 - [Bemuse Coworkers]()

<a name="check-image-size"></a>
### Check Image Size
&#8212; [Dave Copeland](https://twitter.com/davetron5000/) *(OS X / bash)*

#### Problem
Check the sizes of our product images the pickers use to check what they are picking in our warehouse

#### Solution
Created a script to run curl on the argument to download the image, use ImageMagick to get its size and print that out in CSV.  Piped my input CSV of images into `xargs -n1 -P8 ./my_script.rb` to basically run my script 8-way parallel to get the job done as fast as I could without setting my machine on fire.

##### Input
Simple CSV of some ids and an image URL

##### Command
```
cat my_input.csv | xargs -n1 -P8 ./check.rb > images_with_possible_issues.csv
```

 - `xargs` runs a command, feeding `xargs` `STDIN` as arguments to that command
   - `echo ""foo"" | xargs ls` is the same as `""ls foo""`.  
 - `-n1` says to run the given command once for each line of input.  
  - Normally `xargs` will run many lines at once, so if you had a file with 10 rows in it called `""blah.csv""` and do `cat blah.csv | xargs curl`, it would likely run curl once with all 10 rows of blah.csv given to curl.  `-n1` means to just do them one at a time (so 10 runs of curl in this example).
 - `-P8` says to parallelize it 8 ways.  

So, I've got 8 instances of my script running at once.  Obviously, there are diminishing returns on parallelism, but since curl'ing images is mostly I/O bound this worked pretty well without compromising my machine.

### Find Recently Changed Files
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

Some file changed but I don't know where.  Sometimes this is "I don't know where my web browser saved my file."  I want a list of the most recently changed file in a tree

### Count Data Dump Number Of Lines
&#8212; [Deep Ganguli](https://twitter.com/dgangul1/) *(OS X / bash)*

How many lines of text are there in a data dump? This happens all the time, and I hate opening the data in a text editor and scrolling to the bottom.

### Bulk Change Filenames
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

I have a bunch of files and I want to change all of their names at once.

### Efficient Secure File Copy
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

"I'm sick of typing:
scp -i ~/path/to/pem/file.pem some-file.txt ubuntu@ec2-11-22-33-44.amazon.com:/home/ubuntu/some/path

Or, worse, I want to scp something to a computer that I can't reach directly (e.g. behind a firewall) so I have to do the copy in two steps.  Yuck!"

### Directory File Summary
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

Some directory contains a lot of files, and a lot of large files.  For each directory, I want a summary of both the number of files and their sizes in human readable format (e.g. 37G instead of 37000000000)

### Sort Directories By Number Of Files
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

Some directory contains a large _number_ of files (they don't take up a lot of disk space) and I want to find which one

### Delete Directory With Large Number Of Files
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

I have a directory containing a large number of files and I want to delete it, but 'rm *' gives "Argument list too long" and refuses.

### Filter CSV By Column Values
&#8212; [Simeon Willbanks](https://twitter.com/simeonwillbanks/) *(OS X / zsh)*

### Index CSV File
&#8212; [Nick Kridler](https://github.com/nmkridler/) *(OS X, Linux, Unix / bash)*

print the column names and index in a csv file

### Display Resource Usage and Availability
&#8212; [Eli Bressert](https://twitter.com/astrobiased/) *(OS X / zsh)*

Checking out resource usage and availability on system

### Easily Manage Python Virtual Environments

&#8212; [Jeff Magnusson](https://www.linkedin.com/in/jmagnuss) *(OS X / bash)*

Easy management of python virtual environments

### Alias Everything
&#8212; [Eric Gravert](https://twitter.com/egravert) *(OS X, Linux / bash)*

I hate typing, so I alias EVERYTHING

### Command Completion Alert
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

I have a long-running command and I want to be notified with a pop-up dialog on screen when it finishes.

### Bemuse Coworkers
&#8212; [John McDonnell](https://twitter.com/johnvmcdonnell) *(Darwin Kernel Version 14.1.0: Mon Dec 22 23:10:38 PST 2014; root:xnu-2782.10.72~2/RELEASE_X86_64 x86_64 / fish)*

Friend has left their laptop open and logged in, leaving their machine exposed to the whole world.
