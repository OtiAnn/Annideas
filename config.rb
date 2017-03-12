###
# Blog settings
###

# Time.zone = "UTC"
activate :syntax

require 'slim'
Slim::Engine.disable_option_validator!

activate :disqus do |d|
  d.shortname = 'otiannie5' # Replace with your Disqus shortname.
end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  # blog.permalink = "{year}/{month}/{day}/{title}"
  # Matcher for blog source files
  # blog.sources = "{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}"
  blog.layout = "article_layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}"
  # blog.month_link = "{year}/{month}"
  # blog.day_link = "{year}/{month}/{day}"
  # blog.default_extension = ".markdown"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"

  blog.custom_collections = {
    category: {
      link: '/categories/{category}.html',
      template: 'category.html'
    }
  }
end

page "/feed.xml", layout: false

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
with_layout :ironman_layout do
  page "/ironman/*"
end

with_layout :resume_layout do
  page "/resume*"
end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
helpers do
  def cat_class(cat_name)
    return "no_cat" if cat_name.nil?
    
    cat_hash = {
      "學習": "edu",
      "生活": "life",
      "開發": "dev"
    }

    return cat_hash[cat_name.to_sym]
  end

  def link_to_cat(cat_name: nil, homepage: true)
    if homepage
      link_to category_path(cat_name) do
        content_tag(:span, cat_name[0], class: "#{cat_class(cat_name)} big") + 
        content_tag(:span, cat_name[1], class: "#{cat_class(cat_name)} small")
      end
    else
      link_to category_path(cat_name) do
        content_tag(:span, cat_name.chars.join(' '), class: "#{cat_class(cat_name)}")
      end
    end
  end

  def cat_name_and_articles_count(cat_name: nil)
    articles = blog.articles.select do |article|
      article.data.category == cat_name
    end
    return "#{cat_name} (#{articles.size})"
  end

  def date_content(date: nil)
    date_array = date.split
    year  = date_array[0]
    month = date_array[1]
    day   = date_array[2]

    return content_tag(:div, year, class: "year") +
           content_tag(:div, month, class: "month") +
           content_tag(:div, day, class: "day")
  end
end

activate :directory_indexes

set :build_dir, 'tmp'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  set :http_prefix, "/"
end
