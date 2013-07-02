---
title: HTML Style Guide
layout: posts
published: true
---
<p class="intro">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
<h1 class="h1">Header One</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h2 class="h2">Header Two</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h3>Header Three</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h4>Header Four</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h5>Header Five</h5>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h6>Header Six</h6>
<p class="meta">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p class="meta">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <blockquote>
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </blockquote>
<ul>
  <li>
    List Item Number One
  </li>
  <li>
    List Item Number Two
  </li>
  <li>
    List Item Number Three
  </li>
  <li>
    List Item Number Four
  </li>
  <li>
    List Item Number Five
  </li>
  <li>
    List Item Number Six
  </li>
  <li>
    List Item Number Seven
  </li>
  <li>
    List Item Number Eight
  </li>
</ul>

<ol>
  <li>
    List Item Number One
  </li>
  <li>
    List Item Number Two
  </li>
  <li>
    List Item Number Three
  </li>
  <li>
    List Item Number Four
  </li>
  <li>
    List Item Number Five
  </li>
  <li>
    List Item Number Six
  </li>
  <li>
    List Item Number Seven
  </li>
  <li>
    List Item Number Eight
  </li>
</ol>

{% highlight ruby linenos=table %}
module V2
  class CustomersController < ApplicationController
    def create
      # Need to send a hash of :id, :name, :email
      result = Braintree::Customer.create({
        :id => params[:id],
        :first_name => params[:name].split(' ').first,
        :last_name => params[:name].split(' ').last,
        :email => params[:email]
      })
      resp = { success: result.success?, message: (result.message rescue '') }
      respond_to do |format|
        format.json { render json: resp }
      end
    end
  end
end
{% endhighlight %}

{% highlight ruby linenos %}
module V2
  class CustomersController < ApplicationController
    def create
      # Need to send a hash of :id, :name, :email
      result = Braintree::Customer.create({
        :id => params[:id],
        :first_name => params[:name].split(' ').first,
        :last_name => params[:name].split(' ').last,
        :email => params[:email]
      })
      resp = { success: result.success?, message: (result.message rescue '') }
      respond_to do |format|
        format.json { render json: resp }
      end
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
module V2
  class CustomersController < ApplicationController
    def create
      # Need to send a hash of :id, :name, :email
      result = Braintree::Customer.create({
        :id => params[:id],
        :first_name => params[:name].split(' ').first,
        :last_name => params[:name].split(' ').last,
        :email => params[:email]
      })
      resp = { success: result.success?, message: (result.message rescue '') }
      respond_to do |format|
        format.json { render json: resp }
      end
    end
  end
end
{% endhighlight %}

{% highlight scss %}
#wpadminbar #wp-admin-bar-site-name a.ab-item:after{
  @include media($desktop){
    content: ' at desktop';
  }
  @include media($tablet){
    content: ' at tablet';
  }
  @include media($mobile-portrait){
    content: ' at mobile-portrait';
  }
  @include media($mobile-landscape){
    content: ' at mobile-landscape';
  }
}
{% endhighlight %}

{% highlight javascript %}
$(function(){
  $('body').click(function(e){
    e.preventDefault();
    alert('Something!');
  );
});
{% endhighlight %}

{% highlight html %}
<div class="something" id="nono">
  <h1>About some stuffs</h1>
  <p>Some stuffs, man</p>
</div>
{% endhighlight %}

{% highlight php %}
<?php get_header(); ?>
<div id="pageWrapper">
  <h2><?php the_title(); ?&gt;</h2>
    <?php the_content(); ?>
  </div>
<?php get_footer(); ?>
{% endhighlight %}


<dl>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>:e filename</dt>
  <dd>Open filename for edition</dd>
  <dt>Test term that is a bit longer than some of the others.</dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>
  <dt>What is reality</dt>
  <dd>Reality is that which, when you stop believing in it, doesn't go away.</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
  <dt>Test Term</dt>
  <dd>Test Description</dd>
</dl>
