# http://technology.stitchfix.com
Website for Stitch Fix Engineering & Data Science

![Caution Sign](http://www.i2clipart.com/cliparts/c/c/6/6/clipart-caution-jazz-cc66.png "Caution Sign")

## _Caution: Committing to this repo will change the live technology.stitchfix.com site_

# Get Started

    bundle install
    foreman start
    open http://localhost:4000
    
# If you get "unknown command: coffee"

    sudo npm install -g coffee-script

# Deploying to the website

```
git push origin master
```

# Updating the Team section

1. Edit the file `_data/teams.yml`
2. Locate your team name (e.g. teamname: engineering)
3. Following the guidelines in this file, add a new member or modify an existing member
4. New member data begins with the line `- name: ...`
5. Be mindful of the indentation and format of this YAML file
6. Local changes should take effect immediately; push to master to see the team list automatically update


# TODO

- Does Stitch Fix Technology (or Engineering and Data Science) need to be in the top nav? At least after first section?
- Footer
  - link to stitchfix.com 
  - link to about page on stitchfix.com
- Blog
  - Author pages (all posts by an author, linked in bios)
  - Related posts list?
  - Next/previous post nav?
- Combined job list?
  - Separate nav item for combined job list?
- Use new branding guidelines
