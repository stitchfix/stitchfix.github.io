I &#10084; UNIX and using the command line; they help me solve problems at Stitch Fix.  I'm not alone.  Across the Data Science and Engineering teams, we're constantly solving problems with UNIX and the command line.  **TODO: Closing sentence replaces closing section?**  

   
## Problems and Solutions
 - [Files](#files)
   - [What size are these images?](#check-image-size)
   - [What files recently changed?](#find-recently-changed-files)
   - [How many lines are in this data dump?](#count-data-dump-number-of-lines)
   - [How do you bulk change filenames?](#bulk-change-filenames)
   - [How do you quickly copy files to a remote server?](#quick-file-copy-to-remote-server)
 - [Directories](#directories)
   - [How do you summarize a directories' files?](#directory-file-summary)
   - [Which directory has the most files?](#sort-directories-by-number-of-files)
   - [How do you delete a directory with many files?](#delete-directory-with-large-number-of-files)
 - [CSVs](#csvs)
   - [How do you filter a CSV file by a column value?](#filter-csv-by-column-values)
   - [In a CSV file, what are the column names and their indices?](#csv-file-columns-names-and-indices)
   - [How do you find distinct CSV file rows?](#distinct-csv-file-rows)
 - [Systems](#systems) 
   - [What is my system's resource usage and availability?](#display-resource-usage-and-availability)
   - [How do you easily manage Python virtual environments?](#easily-manage-python-virtual-environments)
 - [Productivity](#productivity)
   - [How do you remember all these commands?](#alias-everything)
   - [How do you quickly access your projects?](#tab-complete-cd)
   - [Can you be notified upon long-running command completion?](#command-completion-notification)
 - [Bemuse Coworkers](#bemuse-coworkers)

## Files

<a name="check-image-size"></a>
### Check Image Size
&#8212; [Dave Copeland](https://twitter.com/davetron5000/) *(OS X / bash)*

#### Problem
Check the sizes of our product images the pickers use to check what they are picking in our warehouse

#### Solution
Created a script to run curl on the argument to download the image, use ImageMagick to get its size and print that out in CSV.  Piped my input CSV of images into `xargs -n1 -P8 ./my_script.rb` to basically run my script 8-way parallel to get the job done as fast as I could without setting my machine on fire.

##### Input
```csv
1,https://cdn.example.com/image_A.jpg
5,https://cdn.example.com/image_B.jpg
10,https://cdn.example.com/image_C.jpg
```

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

<a name="find-recently-changed-files"></a>
### Find Recently Changed Files
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
Some file changed but I don't know where.  Sometimes this is "I don't know where my web browser saved my file."  I want a list of the most recently changed file in a tree.

#### Solution
Find command as answered on [Stack Overflow](http://stackoverflow.com/questions/4561895/how-to-recursively-find-the-latest-modified-file-in-a-directory).

##### Input
`cd` to some directory

##### Command
```
# OS X find:
find . -type f -print0 | xargs -0 stat -f ""%m %N"" | sort -rn | head -1 | cut -f2- -d" "

# GNU find:
find . -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -f2- -d" "
```

 - The gnu `find` one does the heavy lifting inside the find command itself.  
 - OS X `find` is a bit dumber so it just provides a list of files, gets modification times by calling stat on each one via `xargs`, then sort and clip.

<a name="count-data-dump-number-of-lines"></a>
### Count Data Dump Number Of Lines
&#8212; [Deep Ganguli](https://twitter.com/dgangul1/) *(OS X / bash)*

#### Problem
How many lines of text are there in a data dump? This happens all the time, and I hate opening the data in a text editor and scrolling to the bottom.

#### Solution
`cat` and `wc`.

##### Input
`./foo.txt`

```
i am
some lines
of data
four to be exact
```

##### Command

```
cat foo.txt | wc -l
```

##### Output
```
4
```

 - `cat` prints the file to the screen. 
 - | pipes the output into the wc utility, which displays the number of lines, words, and bytes contained in each input file, or standard input. 
 - The `-l` flag specifies that you want the number of (l)ines in the file!

<a name="bulk-change-filenames"></a>
### Bulk Change Filenames
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
I have a bunch of files and I want to change all of their names at once.

#### Solution
Use `fnsed`; a simple script which depends upon `sed`.

##### Input
Directory with files:

```
kitten-01.jpg
kitten-02.jpg
...
kitten-99.jpg
```

##### Command
```
fnsed s/kitten/stitchfix/ kitten*
```

##### Output
Now the directory contains: 

```
stitchfix-01.jpg
stitchfix-02.jpg
...
stitchfix-99.jpg
```

##### Script
```bash
#!/bin/bash

if [ "$#" = "0" -o "$#" = "1" ]; then
    echo Usage - fnsed <sed expression> <filename1> [filename2] ... 
    exit
fi

for oldfile in $* ; do
    # skip the first one b/c it's a sed expression
    if [ $oldfile != $1 ]; then
        newfile=`echo $oldfile | sed $1`
        if [ $oldfile != $newfile ]; then 
	         mv $oldfile $newfile
        fi 
    fi 
done
```

 - `fnsed` is a shell script containing a simple loop over all the files

<a name="quick-file-copy-to-remote-server"></a>
### Quick File Copy To Remote Server
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
I'm sick of typing:

`scp -i ~/path/to/pem/file.pem some-file.txt ubuntu@ec2-11-22-33-44.amazon.com:/home/ubuntu/some/path`

Or, worse, I want to scp something to a computer that I can't reach directly (e.g. behind a firewall) so I have to do the copy in two steps.  Yuck!

#### Solution
Put everything into the `.ssh/config` file:

```
Host shiny
  HostName ec2-11-22-33-44.amazon.com
  IdentityFile ~/path/to/pem/file.pem
  User ubuntu
```

##### Command
Now I can just type:

```
scp some-file shiny:path/to/dest
```

Yay!

## Directories

<a name="directory-file-summary"></a>
### Directory File Summary
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
Some directory contains a lot of files, and a lot of large files.  For each directory, I want a summary of both the number of files and their sizes in human readable format (e.g. 37G instead of 37000000000)

#### Solution
`find`, `du`, `sed`, and `wc` commands in a bash loop.


##### Input
`cd` to some directory.

##### Command
```
for f in `find . -type d`; 
  do bash -c "printf '%6s  %6s  %s' `du -s -h $f | sed s+./.*++g` `ls -l  $f | wc -l` $f"; 
  echo; 
done
```

##### Output
```
  696K      13  ./sf/voodoo/voodoo/algorithm
  440K     111  ./sf/voodoo/voodoo/algorithm/config
  116K       4  ./sf/voodoo/voodoo/algorithm/features
   52K       4  ./sf/voodoo/voodoo/algorithm/predictors
```

 - `find` command gets list of all directories below the current one
 -  The `for` loop loops over the directories
 - Inside the loop `printf`, `sed`, and `wc` massage output into the desired form

<a name="sort-directories-by-number-of-files"></a>
### Sort Directories By Number Of Files
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
Some directory contains a large _number_ of files (they don't take up a lot of disk space) and I want to find which one

#### Solution
`find` command within a bash loop similar to the du command.

##### Input
`cd` to some directory

##### Command
```
find . -type d | while read -r dir;
  do printf "%d\t%s\n" `find "$dir" | wc -l` ""$dir"";
done | sort -n
```

##### Output
```
1	./IPython-notebook-extensions/.git/objects/info
1	./IPython-notebook-extensions/.git/refs/tags
...
1134	./sf/flinch
4273	./sf
5709	.
```

 - The first `find` gets all the directories below the current one
 - The while loop goes over each directory and finds all the files below it.  
   - Not efficient, but I haven't yet run into situations where it takes too long.  
 - The final sort command puts output in a useful order.  
   - The number of files is _cumulative_
   - In the above example, there are 4273 files in _all_ directories below ./sf

<a name="delete-directory-with-large-number-of-files"></a>
### Delete Directory With Large Number Of Files
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
I have a directory containing a large number of files and I want to delete it, but 'rm *' gives "Argument list too long" and refuses.

#### Solution
`xargs` command

##### Input
`cd` to some directory

##### Command
```
# Replace ls with rm to delete
find . | xargs -n 100 ls
```

- `xargs` will execute the given command on batches of 100 files at a time.
- Note the replacement of the typical `rm` with `ls`

<a name="csvs"></a>
## CSVs

<a name="filter-csv-by-column-values"></a>
### Filter CSV File By Column Values
&#8212; [Simeon Willbanks](https://twitter.com/simeonwillbanks/) *(OS X / zsh)*

#### Problem
We must filter a CSV file by specific column values.

#### Solution
`awk` the csv!

##### Input
`./hours.csv`

```csv
User ID,Hours Styling
1,15.90
2,17.43
3,15.01
4,18.20
5,15.55
6,16.33
```

##### Command
```
awk -F, '$2 ~ 15' ./hours.csv
```

##### Output
```
1,15.90
3,15.01
5,15.55
```

 - `awk` `-F` sets a "field separator"; for CSV files, this is a ','
 - `'$2 ~ 15'` is the `awk` program
   - `$2` is the second field which is "Hours Styling"
   - `~` is a regular expression operator, so we filter any lines with hours that match `15` 

##### Command
```
awk -F, '$2 == 15' ./hours.csv
```

##### Output
```
3,15.01
```

 - `==` is an equality operator, so we filter any lines with hours that match `15.01` 

<a name="csv-file-columns-names-and-indices"></a>
### CSV File Column Names And Indices
&#8212; [Nick Kridler](https://github.com/nmkridler/) *(OS X, Linux, Unix / bash)*

#### Problem
We don't know a CSV files column names and indices.

#### Solution
Use `head` to get the header and pipe it into `awk`

##### Input
`./file.csv`

```csv
a,b,c,d
1,2,3,4
5,6,7,8
```

##### Command
```
head -n 1 ./file.csv | awk -F, '{for(i=1; i<=NF; i++) print i,$i}'
```

##### Output
```
1 a
2 b
3 c
4 d
```

 - `head -n 1` grabs the first line
 - `awk` `-F` sets a "field separator" and splits on commas
 - `'{for(i=1; i<=NF; i++) print i,$i}'` is the program which loops over the columns and prints the column index and name

<a name="distinct-csv-file-rows"></a>
### CSV File Column Names And Indices
&#8212; [Nick Kridler](https://github.com/nmkridler/) *(OS X, Linux, Unix / bash)*

#### Problem
Now that we know how to find [column indices](#csv-file-columns-names-and-indices), let's find the distinct rows.

#### Solution
Use `cut` and `uniq`

##### Input
`./file.csv`

```csv
a,b,c,d
bob,1,2,3
bob,2,3,4
bill,3,5,6
frank,5,6,7
```

##### Command
```
tail -n +2  ./file.csv | cut -d, -f1 | sort | uniq -c
```

##### Output
```
1 bill
2 bob
1 frank
```

 - `tail -n +2` gets all lines except the header
 - `cut -d, -f1` grabs the 1st column based on comma delimiters
 - `sort` sorts the column
 - `uniq` counts the distinct words

<a name="systems"></a>
## Systems

<a name="display-resource-usage-and-availability"></a>
### Display Resource Usage and Availability
&#8212; [Eli Bressert](https://twitter.com/astrobiased/) *(OS X / zsh)*

#### Problem
Checking out resource usage and availability on system

#### Solution
`htop`

#### Install
`brew install htop`

##### Command
```
htop
```

##### Output
```
  1  [|||||||                                           10.5%]     Tasks: 187 total, 0 running
  2  [|                                                  0.6%]     Load average: 1.72 1.58 1.51
  3  [||||||||                                          13.2%]     Uptime: 2 days, 03:32:02
  4  [|                                                  0.7%]
  5  [||||                                               5.2%]
  6  [                                                   0.0%]
  7  [|||||                                              6.5%]
  8  [                                                   0.0%]
  Mem[|||||||||||||||||||||||||||||||||||        8369/16384MB]
  Swp[                                               0/1024MB]

  PID USER     PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
75871 simeon    31   0 2407M  2144     0 C  0.0  0.0  0:00.00 htop

```


 - Display relative sizes of files in a directory, in graphical form

<a name="easily-manage-python-virtual-environments"></a>
### Easily Manage Python Virtual Environments

&#8212; [Jeff Magnusson](https://www.linkedin.com/in/jmagnuss) *(OS X / bash)*

#### Problem
Managing multiple Python virtual environments is tedious.

#### Solution
Install `pyenv` to your `~/.bashrc`

#### Script
```bash
PYTHON_VIRTUALENV_BASEPATH="$HOME/python/virtualenv"

function pyenv {
    if [ -z "$1" ]; then
        echo `ls $PYTHON_VIRTUALENV_BASEPATH`
    elif [ $1 == '--create' ]; then
        pushd $PYTHON_VIRTUALENV_BASEPATH; virtualenv --no-site-packages $2; popd;
    else
        source $PYTHON_VIRTUALENV_BASEPATH/$1/bin/activate;
    fi
}
```

`pyenv` is a light wrapper around Python's `virtualenv` command.  Executed with no arguments (`pyenv`), it returns a list of currently installed virtual environments.  

Executed with a single argument, it attempts to activate the `virtualenv` passed as the argument (`pyenv my_virtual_env`).  

Executed with `--create` flag, it creates the virtual environment passed in the second argument (`pyenv --create my_virtual_env`).

<a name="productivity"></a>
## Productivity

<a name="alias-everything"></a>
### Alias Everything
&#8212; [Eric Gravert](https://twitter.com/egravert) *(OS X, Linux / bash)*

#### Problem
I hate typing. 

#### Solution
I alias EVERYTHING.

##### Command
```
alias be="bundle exec"
alias brake="be rake"
alias bspec="be rspec"
alias clock='date "+DATE: %Y-%m-%d%nTIME: %r"'
```

##### Problem
Typing an alias is still too many keystrokes.

##### Solution
Create custom key bindings.

##### Command
```
bind -x '"\C-t"':clock
```

##### Input
```
^t
```

##### Output
```
DATE: 2015-03-06
TIME: 01:08:53 PM
```

<a name="tab-complete-cd"></a>
### Tab Completion
&#8212; [Eric Gravert](https://twitter.com/egravert) *(OS X, Linux / bash)*

#### Problem
I still hate typing.

#### Solution
You can use `CDPATH` for tab completion of the `cd` command.  If I have a directory with all of my projects, I can `export` `CDPATH` to this directory.

##### Command
Add to your `~/.bashrc`

```
export CDPATH=.:$HOME/workspace:$GOPATH/src/github.com:$GOPATH/src/code.google.com/p
```

 - Type `cd` and hit tab, I now get tab completion for any project in the `CDPATH` subdirectories.

<a name="command-completion-notification"></a>
### Command Completion Notification
&#8212; [Greg Novak](https://www.linkedin.com/in/gsnovak/) *(OS X / bash)*

#### Problem
I have a long-running command, and I want to be notified with a pop-up dialog on screen when it finishes.

#### Solution
`terminal-notifier` command installed via macports, homebrew, or whatever.

##### Install
```
brew install terminal-notifier
```

##### Command
`./ding`
```bash
#!/bin/bash

terminal-notifier -message "Done"
```

```
long-running-command && ding
```

 - `terminal-notifier` pops up messages via the OS X Notification Center

<a name="bemuse-coworkers"></a>
## Bemuse Coworkers
&#8212; [John McDonnell](https://twitter.com/johnvmcdonnell) *(Darwin Kernel Version 14.1.0: Mon Dec 22 23:10:38 PST 2014; root:xnu-2782.10.72~2/RELEASE_X86_64 x86_64 / fish)*

#### Problem
Colleague has left their laptop open and logged in, leaving their machine exposed to the whole world.

#### Solution
Fluster the colleague.  Use `launchctl`.  They'll *never* find it.

##### Command
```
cat <<END > $HOME/Library/LaunchAgents/com.system.critical.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version=""1.0"">
<dict>
  <key>Label</key>
  <string>com.system.critical</string>

  <key>ProgramArguments</key>
  <array>
    <string>osascript -e "set Volume 10"</string>
    <string>say "$USERNAME loves ponies"</string>
    <string>curl -o /tmp/pony.jpg http://www.adweek.com/files/adfreak/images/2/shetland-ponies-cardigans-2.jpg; </string>
    <string>open /tmp/pony.jpg; </string>
  </array>

  <key>Nice</key>
  <integer>1</integer>

  <key>StartInterval</key>
  <integer>60</integer>

  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
END
;
launchctl load com.system.critical
```

- This sets an hourly `launchctl` pony task to fluster one's colleagues and bemuse one's coworkers.
