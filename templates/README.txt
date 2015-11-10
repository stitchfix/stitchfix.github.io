# MyGem [![Build Status](https://travis-ci.org/stitchfix/YOURGEM.svg?branch=add_travis_yml)](https://travis-ci.org/stitchfix/YOURGEM)

> It's a neat little gem that you're gunna *love*

Have trouble being happy while you're coding Ruby? You've
come to the right place. This gem makes it dirt easy.

 - [Usage](#usage)
   - [Installation](#installation)
   - [Configuration](#configuration)
   - [Use Cases](#use-case-1)
 - [Documentation](#documentation)
 - [Licence](#licence)
 - [Contributing](#contributing)

## Usage

### Installation

Add to your +Gemfile+:

```
gem 'my-gem'
```

Then install:

```
bundle install
```

If not using bundler, just use RubyGems: `gem install my-gem`

### Configuration

In `config/initializers/my-gem.rb`:

```ruby
MyGem.configure do |config|
  config.my_config_param = ENV['MY_GEM_CONFIG_PARAM']
end
```

### Use Case #1

Most people will just...

### Use Case #2

But lots of others want to...

## Documentation

(links to other documentation)
* RDoc
* etc.

## Licence

*MyGem* is released under the [MIT License](http://www.opensource.org/licenses/MIT).

## Contributing

*MyGem* appreciates contributors!  Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

Everyone interacting in *MyGem*'s codebase, issue trackers, chat rooms, and mailing lists is expected to follow the *MyGem* [code of conduct](CODE_OF_CONDUCT.md).

---

Provided with :heart: by your friends at [Stitch Fix Engineering](http://multithreaded.stitchfix.com/)
