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

1. Make a pull request
2. Get some thumbs-ups
3. Check your spelling
4. Big Green Merge Button

# Updating the Team section

1. Edit the file `_data/teams.yml`
2. Locate your team name (e.g. teamname: engineering)
3. Following the guidelines in this file, add a new member or modify an existing member
4. New member data begins with the line `- name: ...`
5. Be mindful of the indentation and format of this YAML file
6. Local changes should take effect immediately; push to master to see the team list automatically update

# Tips & Tricks

* Add `location` to your YAML front-matter.  Re-inforces the distruted nature of the team
* Consider adding an image.  Make it square, save it to `assets/images/blog` and then reference it in the `image` key in your
YAML front-matter.  The reason for this is that it reduces the line length of your first paragraph, which encourages readers
to make it through and keep reading.
* Liberally use headers and sections, even if your post is short.  These serve as "signposts" that encourage readers to keep
going.  A wall of text can be off-putting, and headers make your post easier to digest
* To do footnotes, you can use HTML like so:

  ```html
  This is some text<a name="back-1"></a><sup><a href="#1">1</a></sup>.
  ```

  Then, at the end of the post:

  ```html
  ---

  <a name="1"></a>
  <sup>1</sup> This is the snark footnote.<a href="#back-1">&larr;</a>
  ```
* Consider "this", "thing", and "very" to be spelling errors.  Remove or replace them and your statements will be stronger.

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
