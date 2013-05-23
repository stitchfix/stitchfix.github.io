# Doom Patrol
Stitch Fix Engineering & Analytics jobs site

>> The Doom Patrol is a superhero team...

Enough said.

# Get Started
    git clone git@github.com:stitchfix/doom-patrol.git 

## Rake tasks

### rake dev
```
     jekyll --server --watch
```

Sets up jekyll server for dev on port 4000. Site is regenerated everytime you save a file. 
NOTE: Changing _config.yml will require a restart of the jekyll server to see changes.
To restart server, go to terminal tab that server is running in then press
    ctrl+C ⇧  enter

### rake sass
```
     sass --watch _sass:css 
```

Starts Sass polling to regenerate css on file save. 
