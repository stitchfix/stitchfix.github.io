---
title: "ElasticSearch and Denormalization in Rails"
layout: posts
location: "San Francisco, CA"
author: Nick Reavill
author_url: 'https://www.linkedin.com/in/nreavill'
published: true
---

## All these JOINs are killing me

Complex relational databases can lead to tortuous SQL queries and slow
responses from your web application. If you're trying to return a long list of
objects that are built up from five, ten or even seventeen related tables your
response times can be unacceptably slow. At Stitch Fix we encounter this sort of
problem regularly and we have found that using ElasticSearch along with some
conventions for denormalizing complex objects can make it easy to generate
sufficiently speedy responses, even when they are returning lots of rows.

One such project is the Sample Queue, a tool that allows our Sample
Coordinators to see, based on purchase orders, what clothing samples we are
expecting in to our HQ and to keep track of all the steps that are required to
process each sample: data attribution, fit analysis, photography, videography
etc. This project requires loading rows of data built from many related
Postgres tables and it's important that they can be easily searched and sorted.

We have been using [ElasticSearch][elasticsearch] for a couple of years and
had never really taken advantage of it as a data store until recently (as
opposed to using it as a search engine and loading ActiveRecord objects found
from the primary key ids it returned). The advantages are obvious: ElasticSearch
indexes are very easy to search and with no ActiveRecord objects to instantiate
and no need to hit the database the response time for even large numbers of
records is more than acceptable.

[elasticsearch]: http://www.elasticsearch.org/

All we needed to do was build a search index that contained all the data we
wanted to display in the Sample Queue's view layer. However, we realised it
would be useful if we could swap out individual rows of the Sample Queue with
ActiveRecord objects or JSON hashes. Or, to put it another way, the view layer
shouldn't care about the class of the object it was rendering.

## Presenters as Denormalizers

We use the [Elasticsearch::Model][elasticsearch-model] library to integrate with
ElasticSearch. The gem expects a method called `to_hash`. The hash is converted
to JSON for each record and used to populate the ElasticSearch index:

[elasticsearch-model]: https://github.com/elasticsearch/elasticsearch-rails/tree/master/elasticsearch-model

```ruby
class Sample < ActiveRecord::Base
  include Elasticsearch::Model

  # Building as small hash here is a little smelly but probably OK.
  # As the hash grows you should start treating it as a separate concern. This
  # is what we will be doing with our denormalizer (see below).
  def to_hash
    {
                  id: self.id,
        display_name: display_name,
          style_name: style.name,
            style_id: style.id,
      original_image: original_image,
          color_name: color.name
    }
  end
  
  settings(elasticsearch_settings) do
    mapping do
      indexes :display_name, type: 'multi_field', fields: {
        display_name:       { type: "string", analyzer: "snowball" },
        display_name_exact: { type: "string", index: :not_analyzed }
      }
      # etc ...
    end
  end
end
```
The [Presenter pattern][presenter-pattern] is a familiar one in Rails: wrap
objects in a presenter class to keep business logic away from your HAML or ERB.
Since the process of building up a hash to push into an ElasticSearch index
is basically the same we decided to use one class to do both jobs. We start with
a 'denormalizer' class that flattens out the many objects that make up sample
view. The `SampleDenormalizer` looks like this:

[presenter-pattern]: http://nithinbekal.com/posts/rails-presenters/ "Nithin Bekal on Presenters in Rails"

```ruby
class SampleDenormalizer

  def initializer(sample)
    @sample = sample
  end

  # This method should be treated like a view - no logic, just attributes
  def to_hash
    # this list of methods can get very long but it encourages you to
    # keep the hash flat and to be deliberate about what you are adding to it
    %w(id
       display_name
       original_image
       style_id
       style_name
       color_name).map{ |method_name|
        [ method_name, self.send(method_name) ]
    }.to_h
  end

  def display_name
    @sample.display_name
  end

  def original_image
    @sample.original_image
  end

  def color_name
    @sample.color.name
  end

  def style_name
    style.name
  end

  def style_id
    style.id
  end

  private
  # any methods that aren't included in the hash can be private and should be
  # memoized for better performance
  def style
    @style  ||= @sample.style
  end

end
```

You can now use the denormalizer in the model to build the hash for
ElasticSearch, considerably reducing the complexity of this particular class.

```ruby
class Sample < ActiveRecord::Base
  include Elasticsearch::Model

  def to_hash
    SampleDenormalizer.new(self).to_hash
  end
  
  # mapping here as before ...

end
```

One of the strengths of this pattern is for calculated attributes like
`has_fit_attributes?` which returns a boolean value but is complex and expensive
to calculate. What's more, it is nearly impossible to query with SQL. Once you
put it in the ElasticSearch index it is cheap to store and return and simple to
query.

```ruby
class SampleDenormalizer

  def to_hash
    %w(id
       display_name
       original_image
       style_id
       style_name
       has_fit_attributes? # added this method to the hash
       color_name).map{ |method_name|
        [ method_name, self.send(method_name) ]
    }.to_h
  end

  # same as example above ...

  def has_fit_attributes?
    return true if @sample.root_item_type  == 'Non-Apparel'
    required_scalar_values  = %w{fit_top good_for_top_body_type}.map{|attr| style.scalar_attributes.send(attr) }
    required_multi_values   = %w{bra_type shoulder_width_match torso_length_match}.map do |attr|
      style.multi_attributes_names.include?(attr)
    end
    (required_scalar_values + required_multi_values).all?
  end

end
```

So that's how you can use the Denormalizer pattern to build up your search
index. You can use that same code for more typical presenter work.

```ruby
class SamplesController < ApplicationController

  # the objects being presented here are Hashie::Mash objects from ElasticSearch
  def index
    @samples  = Sample.search(params[:keywords]).map{|s| SamplePresenter.new(s._source) }
  end

  # the object being presented here is an ActiveRecord object
  # this action is being called by an AJAX request
  def update
    sample  = Sample.find(params[:id])
    sample.update!(params[:sample])
    @sample = SamplePresenter.new(sample)
    render "samples/show", layout: false
  end

end
```

Both the `Hashie::Mash` (which is what the ElasticSearch Ruby client returns)
and `ActiveRecord` objects are using the same presenter. How so? The presenter
is actually a simple wrapper around the denormalizer:

```ruby
class SamplePresenter

  def initialize(object_for_presenting)
    if object_for_presenting.class.ancestors.include?(ActiveRecord::Base)
      # if the object is an ActiveRecord object use the denormalizer
      @target = SampleDenormalizer.new(object_for_presenting)
    elsif object_for_presenting.kind_of?(Hashie::Mash)
      # if the object is a Hashie::Mash object from ElasticSearch it is
      # pre-denormalized so just pass it through un-presented and rely on
      # method_missing to call all the methods.
      @target = object_for_presenting
    end
  end

  def method_missing(sym, *args, &block)
    @target.send(sym)
  end

end
```

In the view layer you can call any of the denormalized methods in the same way
no matter the object and get the same result:

```haml
%span.sample
  %a{href: edit_sample_path(sample.id)}
    %i
      = sample.id
    = sample.display_name

%span.style
  %a{href: edit_style_path(sample.style_id)}
    %i
      = sample.style_id           
    = sample.style_name.titleize
```

In this example we are treating ElasticSearch as a view cache and making an
assumption that our view may want display data from this quick-responding cache
or from the built-on-the-fly database-backed objects. The fact that
ElasticSearch is a powerful search engine is almost a side-benefit but using
both features to their fullest enables us to build some powerful tools.
