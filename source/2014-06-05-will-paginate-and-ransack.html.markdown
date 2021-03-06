---
title: will_paginate與ransack
date: 2014-06-05 10:01 UTC
tags: Gem, Rails, Learning
desc: 這篇文章是說明 Rails 的兩個 gem:will_paginate、ransack，並解決兩個在分頁設定上會互相衝突的地方。
category: 開發
---

這篇主要介紹兩個很方便的 gem : will_paginate、ransack

這兩個 gem 很方便，star的人也很多！不過同時使用時會產生一些衝突，在此說明並記錄一下，以免自己未來又遇到一樣的問題！

1. [will_paginate](https://github.com/mislav/will_paginate) 幫過長的頁面加入分頁功能，例如：
    ![will_paginate_example](http://user-image.logdown.io/user/7443/blog/7374/post/203033/Pv1IQSiTfqMcwcz7kONg_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202014-06-06%2015.15.46.png)

2. [ransack](https://github.com/activerecord-hackery/ransack) 可讓增加文章搜尋的功能，例如：
    ![ransack_example](http://user-image.logdown.io/user/7443/blog/7374/post/203033/Q2kkwC5HSisAXkbI3gzQ_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202014-06-06%2015.24.53.png)

---


##will_paginate

* 首先先裝 **will_paginate gem**

~~~ruby
# Gemfile
gem 'will_paginate', '~> 3.0'
~~~

* 接著到需要使用分頁功能的 `posts_controller.rb` ，將原本在index 中的 `@posts=Post.all` 修改為：

~~~ruby
def index
  #分頁設定每頁顯示四篇文章
  @posts = Post.paginate(:page => params[:page], :per_page => 4)
end
~~~

* 再到index 的view `index.html.erb` 中，到希望出現分頁符號的位置加入下方code 以及class 名稱，就完成了：

~~~erb
<div class="apple_pagination">
  <%= will_paginate @posts%>
</div>
~~~

##ransack

* 再來裝 **ransack gem**

~~~ruby
# Gemfile
gem "ransack", github: "activerecord-hackery/ransack", branch: "rails-4.1"
~~~

* 到 `posts_controller.rb` 加入：

~~~ruby
def index
  #這是剛剛will_paginate加的
  @posts = Post.paginate(:page => params[:page], :per_page => 4)

  #讓posts#index可以顯現搜尋結果，@q 是ransack gem定義的寫法，下方再做說明
  @posts = @q.result
end
~~~

* 到 `application_controller.rb` 加入：

~~~ruby
class ApplicationController < ActionController::Base
  #讓在執行任何動作之前，先呼叫set_search，才能讓view知道 `@q` 是啥！不然會噴錯，說他找不到ransack！
  before_action :set_search

  protected
  def set_search
    @q = Post.search(params[:q])
  end
end
~~~

* controller 都設定好就可以去view 加上搜尋表單了：

~~~erb
<div id="search" >
  <%= search_form_for @q do |f| %>
  #search_form_for是ransack自己定義的form helper。

    #cont 就是 contains，所以我設定我的搜尋位置為文章的 title 或 body
    <%= f.text_field :title_or_body_cont %>

    <%= f.submit ' ', :class => 'btn-search' %>
  <% end %>
</div>
~~~

搜尋位置的設定可以參考[這裡](https://github.com/activerecord-hackery/ransack/blob/master/lib/ransack/constants.rb)。

---

其實，兩個 gem 的設定照上述已經搞定了，結果每次我一按搜尋，就噴這個 `undefined method total_pages` 的錯：

![will_paginate & ransack 的小衝突](http://user-image.logdown.io/user/7443/blog/7374/post/203033/RUyEV8a0ROyKx9g7pYyx_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202014-06-06%2018.10.08.png)

後來試了幾次才知道原來是要在 `posts_controller.rb` 修正為如下的 code，讓無論有沒有搜尋過的 posts 都能符合分頁的規定，就沒問題了！

~~~ruby
def index
  @posts = Post.paginate(:page => params[:page], :per_page => 4)
  @posts = @q.result.paginate(:page => params[:page], :per_page => 4)
end
~~~
