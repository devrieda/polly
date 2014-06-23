$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "polly_lti_engine/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "polly_lti_engine"
  s.version     = PollyLtiEngine::VERSION
  s.authors     = ["Derek Devries", "Josh Simpson", "Jason Madsen"]
  s.email       = ["derek@instructure.com", "jsimpson@instructure.com", "jmadsen@instructure.com"]
  s.homepage    = "https://github.com/devrieda/polly"
  s.summary     = "Rails LTI Engine for Polly polling app."
  s.description = "Rails LTI Engine for Polly polling app."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.1.1"

  s.add_development_dependency "sqlite3"

  s.add_dependency "sass-rails", "~> 4.0.3"

  s.add_dependency "bootstrap-sass", "~> 3.1.1"

  s.add_dependency "ims-lti"


  s.add_development_dependency "rspec-rails"

  s.add_development_dependency "capybara"

  s.add_development_dependency "poltergeist"

end
