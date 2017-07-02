---
title: Ruby女孩(19)：類別中的getter與setter
date: 2014-10-19 08:58 UTC
tags: Ruby, RailsGirls, Rails, Learning, Class
desc: 我是 Annie，我參加 iThome 在 2014 年舉辦的第七屆 iT 邦幫忙鐵人賽，連續 30 天不中斷地記錄自己學習 Ruby 的歷程，這一系列 30 篇文章，推薦給跟我一樣初學 Ruby 約半年的朋友參考。
category: 鐵人
order: 19
---

昨天我們開頭引入了書中的一段話，其中提到了**取得器(getter)**、**設定器(setter)**、**存取器方法(accessor method)**等等，今天會來把這個部分的觀念給弄清楚些！

還記得昨天的例子嗎？我們做了一個名字為RubyGirl的類別，類別中我們給了一個初始化的方法，與一個年齡的方法，如下：

~~~ruby
class RubyGirl  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
  
  def age  
    @a  
  end  
end  
~~~

現在對這個類別我們可以已經可以創出一個實例，而且有初始值`@rubyskill=0`：

~~~ruby
annie = RubyGirl.new  
=> #<RubyGirl:0x007fe5623936c8 @ruby_skill=0>  
~~~

而且也有一個年齡的方法：

~~~ruby
annie.age  
=> nil  
~~~

但是當我們想要改變年齡的值時，它會噴`NoMethodError`的錯，例如：

~~~ruby
annie.age = 25  
NoMethodError: undefined method `age=' for #<RubyGirl:0x007fe5623936c8 @ruby_skill=0, @a=nil>  
~~~

這時候，我們就要來說說**getter**與**setter**了！

目前我們在類別中所定義的年齡，只是`@a`的getter方法，如果我們需要`@a`具有可變性，那我們就得再加上一個setter的方法，如下說明：

~~~ruby
class RubyGirl  
  # @a的getter方法  
  def age  
    @a  
  end  
  # @a的setter方法  
  def age=(x)  
    @a = x  
  end  
end  
~~~

有了setter方法後，我們就可以讓年齡具有改變性：

~~~ruby
annie.age  
=> nil  
#能得到初始值，是因為我們有定義一個age方法。  
  
annie.age=20  
=> 20  
#能改變age，是因為我們有定義一個age=方法。  
~~~

由於這一對getter和setter的方法極為常見，為了更方便使用，Ruby提供了一個自動化的做法：**Module定義了attr_reader與attr_accessor這兩個方法**，由於Class是Module的子類別，所以也可以使用這兩個attr_開頭的方法，那這兩個方法是在做什麼呢？

* attr_reader會替具有相同名稱的實體變數建立一般的getter方法
* attr_accessor會建立getter與setter方法
* (較不常用的attr_writer會建立setter方法)

例如上面年齡的方法我們可以改寫成：

~~~ruby
class RubyGirl  
  attr_accessor :age  
end  
~~~

是的就這樣，就一行，已經完成了剛剛上面的兩個getter與setter方法，age可以用symbol也可以用string的方式寫。此時，我們可以試著新增一個物件：

~~~ruby
linda = RubyGirl.new  
=> #<RubyGirl:0x007fcae211e928>  
  
linda.age  
=> nil  
  
#因為沒有給初始值，所以出現nil，但是可以getter的！(如果不能getter會說沒有這個方法！)  
  
linda.age=20  
=> 20  
  
#也成功改變了age的值，可以setter才可以做到這件事。  
~~~

當然如果你不想被改變這個值的話，你可以用attr_reader：

~~~ruby
class RubyGirl  
  attr_reader :favorite  
  attr_accessor :age  
end  
  
linda.favorite = "ruby"  
NoMethodError: undefined method `favorite=' for #<RubyGirl:0x007fcae211e928 @age=20>  
~~~

注意到了嗎？當你想要把linda物件的favorite方法改成"ruby"時，它不讓你改就是因為沒有favorite=這個方法，也就是沒有setter的方法！

好的，我們來做個統整吧！把昨天跟今天的程式碼整理成：

~~~ruby
class RubyGirl  
  attr_accessor :age  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
end  
  
ironman = RubyGirl.new(10)  
=> #<RubyGirl:0x007fcae21472b0 @ruby_skill=10>  
  
ironman.age  
=> nil  
  
ironman.age = 25  
=> 25  
~~~

總而言之，讀取和設定變數是分開的兩個方法，差別只在於有沒有等號，兩個方法都要使用的話，則可以簡寫成`attr_accessor`這個方法。

---

19天，

> “Replace fear of the unknown with curiosity.”

面對不知道的領域，一定要保持好奇心才行，對Ruby 的好奇心從第一天到現在都還在，好險好險....
