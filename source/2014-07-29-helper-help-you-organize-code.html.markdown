---
title: 用Rails Helper幫你打掃Code
date: 2014-07-29 10:09 UTC
tags: Rails, Learning
desc: 這篇文章是說明 Rails 的 helper 的好處，以及實際的做法。
category: 開發
---

噢，這篇在說自製 Helper！做出來的 Helper 根本跟我老媽一樣，幫我把房間整理得乾乾淨淨的！利用 Helper 整理選單/連結列的 selected style

Rails 有很多自己的 Helper，例如： `link_to` 就幫我們把字串變成超連結、`form_for` / `form_tag`就幫我們做出表單...，Rails 既然已經有很多 Helper 了，那我們幹嘛還要再自製 Helper 呢？以自己目前學 Rails 三個多月的經驗來說，最能領悟的大概就是以下幾點：

**(1) 不要把邏輯敘述放在 View 中**

  當 View 中需要有具邏輯性判斷的頁面呈現時，很容易造成 View 的程式碼雜亂無章，運用 Helper 將邏輯判斷的部分整理出去，讓 View 保持清爽且好閱讀。

**(2) 減少重複的 Code (Don't Repeat Yourself)**

  當 View 中出現大量重複的內容時，除了可使用 partial 來切開一片一片的 code 之外，還可以用 Helper 來幫忙處理有邏輯內容的頁面。

**(3) 方便維護與閱讀**

  幫自己的 Helper 取個好懂的名字，過幾週再回來看還是能讀懂，以專案開發來說一定較好維護。

(其實從很多大大的文章中都可以看到，當 View 中太多邏輯，會造成效能減弱，要做判斷的部分最好移到 Controller 或 Model，讓 View 直接呈現最後結果即可)

##利用 Helper 整理選單 / 連結列的 selected style

如果希望做出類似以下這種選單，選了連結後，選單的 style 會改變：

<img class="center" src="http://user-image.logdown.io/user/7443/blog/7374/post/211689/NTkXj4XQvUaNUXSsznzg_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202014-07-28%2013.31.30.png" alt="navbar.png">

可以這麼做：

先將原本選單的`link_to` code 整理至`app/helpers/application_helper.rb`

**原本**

~~~erb
<ul class="navbar">
  <li><%= link_to 'Members', members_path %></li>
  <li><%= link_to 'Rules', rules_path %></li>
  <li><%= link_to 'Let's Play', play_path %></li>
  <li><%= link_to 'Login', sign_in_path %></li>
</ul>
~~~

**後來**

自定一個名叫`nav_li` 的 Helper，意思就是導航列的 list，將 `<li>` tag 改用 Rails 的 `content_tag` 來寫([content_tag 的用法介紹](http://apidock.com/rails/ActionView/Helpers/TagHelper/content_tag))，如下：

~~~ruby
module ApplicationHelper
  def nav_li name, url
    content_tag :li, link_to(name, url)
  end
end
~~~

將選單中不同的部分用參數替換掉，參數直接寫在 Helper 名字的後面即可(如上例中的`name`與`url`)。

接下來 View 的部分即簡化如下：

~~~erb
<ul class="navbar">
  <%= nav_li 'Members', members_path %>
  <%= nav_li 'Rules', rules_path %>
  <%= nav_li 'Let's Play', play_path %>
  <%= nav_li 'Login', sign_in_path %>
</ul>
~~~

接著，在 Helper 加入 selected 判斷，運用 request.path

**原本**

~~~ruby
module ApplicationHelper
  def nav_li name, url
    content_tag :li, link_to(name, url)
  end
end
~~~

**後來**

~~~ruby
module ApplicationHelper
  def nav_li name, url
    is_active = (request.path == url ? 'active' :nil)
    #判斷瀏覽器回傳路徑網址是否等於連結網址
    content_tag :li, link_to(name, url), class: is_active
    #利用上述判斷來更改CSS的class selector
  end
end
~~~

用 Helper 的寫法，大大改善我原本用純 html 的方式，減少了許多重複的 code！
不知為何，開始想去整理自己的房間了...
