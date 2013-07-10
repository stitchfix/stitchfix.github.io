# Doom Patrol
Stitch Fix Engineering & Analytics jobs site

![Doom Patrol](http://images2.wikia.nocookie.net/__cb20091015054813/marvel_dc/images/5/55/Doom_Patrol_008.jpg "DOOM PATROL")


> The Doom Patrol is a superhero team...

Enough said.

# Get Started

    bundle install

Or:

```
gem install jekyll # need > 1.0
gem install sass
```

Once jekyll is installed, grab the repo from github:

```
git clone git@github.com:stitchfix/doom.git
```

## Rake tasks

### rake dev
```
jekyll serve --watch
```

Sets up jekyll server for dev on port 4000. Site is regenerated everytime you save a file. 
NOTE: Changing `_config.yml` will require a restart of the jekyll server to see changes.
To restart server, go to terminal tab that server is running in then press
    ctrl+C ⇧  enter

### rake sass
```
sass --watch _sass:css 
```

(```gem install sass``` if you don't already have it)

### rake clean
```
rm -rf _site  
```
You'll want to kill the server before you run this. Removes _site folder. Note, _site
should not be commited and pushed...ever.


### rake minify
```
sass --watch _sass:css --style compressed
```
Outputs minified css from the compiler.


# Deploying to the website

```
git fetch                 // get latest from origin repo
git checkout gh-pages     // go to the gh-pages branch (it may say it's a new branch, that's ok. origin/gh-pages is a special "detached branch")
git merge master          // bring gh-pages up to date with master
git push origin gh-pages  // push the changes
git checkout master       // return to the master branch
```

Note: This means you should treat ```master``` as we do in any other repo. It's production-ready with the latest code. Don't work directly in ```gh-pages```.
