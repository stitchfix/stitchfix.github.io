---
title: "ElasticSearch and Denormalization in Rails"
layout: posts
location: "San Francisco, CA"
author: Nick Reavill
author_url: 'https://www.linkedin.com/in/nreavill'
published: true
---

Complex relational databases can lead to tortuous SQL queries and slow
responses from your web application. If you're trying to return a long list of
objects that are built up from five, ten or even seventeen related tables your
response times can be unacceptably slow. Heroku web dynos time out at thirty
seconds and if your app is regularly butting up against that limit in the course
of normal operation then it's probably time to think about some serious
refactoring.

At Stitch Fix we have such a tool: the Receiving Queue. It is designed to give
an itemized list of what new inventory we have received on a particular day, to
show ordered vs received item counts and detailed information about the style
of clothing received, so that the warehouse team can be sure they have received
the items we were expecting.

When we launched the Receiving Queue it quickly became apparent that performance
was a problem. At first we could only load a week's worth of receipts, then a 
week for a single warehouse, and then only a single day. It worked but since the
data view was so narrow it was not as powerful as we intended it to be.

A few months later a similar project arose. This time it was the Sample Queue, a
tool that would allow our Sample Coordinators to see, based on purchase orders,
what clothing samples we were expecting in to our HQ and to keep track of all
the steps that are required to process each sample: data attribution, fit
analysis, photography, videography etc. Again this project would require loading
multiple rows of data built from many related Postgres tables, only this time
searching, sorting and the ability to see many days in a single view were much
more important features.

We had been using [ElasticSearch][elasticsearch] for a couple of years and never really taken
advantage of it as a data store (as opposed to using it as a search engine and
loading ActiveRecord objects found from the primary key ids it returned). The
advantages were obvious: ElasticSearch indexes are very easy to search and 
with no ActiveRecord objects to instantiate and no need to hit the database the
response time for even large numbers of records would be acceptable.

[elasticsearch]: http://www.elasticsearch.org/

All we needed to do was build a search index that contained all the data we
wanted to display in Sample Queue view layer. However, we realised it would be
useful if we could swap out individual rows of the Sample Queue with
ActiveRecord objects or JSON hashes. Or, to put it another way, the view layer
shouldn't care about the class of the object it was rendering.

### Presenters as Denormalizers
The [Presenter pattern][presenter-pattern] is a familiar one in Rails: wrap
objects in a presenter class to keep business logic away from your HAML or ERB.
Since the process of building up a hash to push into an ElasticSearch index is basically the same
we decided to use one class to do both jobs. The `SampleDenormalizer` looks like
this:

[presenter-pattern]: http://nithinbekal.com/posts/rails-presenters/ "Nithin Bekal on Presenters in Rails"

```ruby
class SampleDenormalizer

  attr_reader :sample
  def initializer(sample)
    @sample = sample
  end

  def to_hash
    # this list of methods_to_hash can get very long but it encourages you to
    # keep the hash flat and to be deliberate about what you are adding in there
    methods_to_hash = %w(id display_name original_image has_basic_attributes?)
    methods_to_hash += %w(style_id style_id style_name color_name)
    # etc ...
    Hash[methods_to_hash.map{|mth| [mth, self.send(mth)]}]
  end

  def display_name
    sample.display_name
  end

  def original_image
    sample.original_image
  end

  def color_name
    sample.color.name
  end

  def style_name
    style.name
  end

  def style_id
    style.id
  end

  # One of the powers of this pattern is for attributes like this
  # This method returns a boolean value that is complex and expensive to
  # calculate
  # What's more, it is nearly impossible to query with SQL.
  # Once you put it in the ElasticSearch index it is cheap to store and return
  # and simple to query
  def has_basic_attributes?
    return false unless style_scalar_attributes
    required_scalar_values     = REQUIRED_BASIC_SCALAR_ATTRIBUTES.map{|attr| style_scalar_attributes.send(attr) }
    required_multi_attributes  = if root_item_type  == 'Apparel'
                                   REQUIRED_BASIC_APPAREL_MULTI_ATTRIBUTES
                                 else
                                   []
                                 end
    required_multi_values      = required_multi_attributes.map do |attr|
      style_multi_attributes_names.include?(attr)
    end
    (required_scalar_values + required_multi_values).all?
  end

  # etc ...

  private
  # any methods that aren't included in the hash can be private and should be
  # memoized for better performance
  def style
    @style  ||= sample.style
  end

end
```

You can use this with [Elasticsearch::Model][elasticsearch-model] library to
build the hash for the index:

[elasticsearch-model]: https://github.com/elasticsearch/elasticsearch-rails/tree/master/elasticsearch-model

```ruby
class Sample < ActiveRecord::Base
  include Elasticsearch::Model

  def to_hash
    SampleDenormalizer.new(self).to_hash
  end
  
  # you still have to include the mapping here
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

Both the `Hashie::Mash` and `ActiveRecord` objects are using the same presenter.
How so? The presenter is actually a simple wrapper around the denormalizer:

```ruby
class SamplePresenter

  attr_reader :target

  def initialize(object_for_presenting)
    if object_for_presenting.class.ancestors.include?(ActiveRecord::Base)
      # if the object is an ActiveRecord object use the denormalizer
      @target = SampleDenormalizer.new(object_for_presenting)
    elsif object_for_presenting.kind_of?(Hashie::Mash)
      # if the object is a Hashie::Mash object from ElasticSearch it is
      # pre-denormalized so just pass it through un-presented and rely on
      # method_missing to return call all the methods.
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

