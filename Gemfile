source 'https://rubygems.org' do
  gem 'jekyll'

  group :jekyll_plugins do
    gem 'jekyll-commonmark', github: 'jekyll/jekyll-commonmark'
    gem 'jekyll-last-modified-at'
    gem 'jekyll-minifier'
    gem 'jekyll-sitemap'
  end

  # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
  # and associated library.
  install_if -> { RUBY_PLATFORM =~ /mingw|mswin|java/ } do
    gem 'tzinfo', '~> 1.2'
    gem 'tzinfo-data'
  end

  # Performance-booster for watching directories on Windows
  gem 'wdm', '~> 0.1.0', install_if: Gem.win_platform?
end
