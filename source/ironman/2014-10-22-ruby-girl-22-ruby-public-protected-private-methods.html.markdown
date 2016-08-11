---
title: Ruby女孩(22)：公用、受保護、私用方法大亂鬥
date: 2014-10-22 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 22
---

今天來談談方法的可見性：**公用(public)**、**受保護(protected)**、**私用(private)**。

我們先來看看這三種不同的方法都寫在什麼位置：

~~~ruby
class ClassName  
  #公用(public)的方法都在這裡！  
  def method_1  
  end  
    
  #下面是受保護(protected)的方法  
  
  protected  
  
  #受保護(protected)的方法都要放在這裡！  
  def method_2  
  end  
  
  #下面是私用(private)的方法  
  
  private  
  
  #私用(private)的方法都要放在這裡！  
  def method_3  
  end  
    
end  
~~~

也可以這麼寫：

~~~ruby
class ClassName  
  def method_1  
  end  
  def method_2  
  end  
  def method_3  
  end  
  protected :method_2  
  private :method_3  
end  
~~~

兩個範例都可以看得出，`method_1`是public的方法，`method_2`是protected的方法而`method_3`則是private的方法，那這些方法的作用跟規定是什麼呢？

##公用(public)方法

1. 沒有特別說明，方法的預設都是public的！
2. 基本上第一點是正確的，但有一個例外，initialize方法，會被自動宣告成private的，我們可以來證明看看：

~~~ruby
class Test  
  def initialize(test=5566)  
    @test = test  
  end  
  def greeting  
    puts "Hi Hi"  
  end  
end  
  
yo = Test.new  
=> #<Test:0x007f852c890900 @test=5566>  
  
yo.greeting  
=> "Hi Hi"  
  
yo.initialize  
NoMethodError: private method `initialize' called for #<Test:0x007f852c890900 @test=5566>  
~~~

噴錯的訊息很明顯指出initialize是private method，所以不可以像一般public方法直接被實體物件調用。

3. 基本上前面都是對的，但還有一個例外XD，就是當一個方法被定義在類別之外，它會直接被宣告成Object的私用實體方法，我們來做個實驗看看：

![ruby公用方法的特例](http://ithelp.ithome.com.tw/upload/images/20141022/20141022191539544791dbc4244_resize_600.png)

上面我們定義了一個方法為`i_love_ruby`，這個方法沒有被某個自定的類別給封裝起來，我們利用`Object.private_instance_methods`找到了所有屬於Object的私用實體方法，其中也包含了我們自己幫他新定義的`i_love_ruby`方法。

##私用(private)方法

1. private方法僅供該類別內部使用，它只能讓該類別(或它的子類別)中的實體方法所呼叫。
2. private方法被調用時會自動在self上進行，無法用手動的方式在某物件上進行，例如：

~~~ruby
class RubyGirl  
  def say_hello  
    puts self.my_age  
  end

  private  
  def my_age  
    "Hi, I'm 18 years old!"  
  end  
end  
~~~

請注意！上方程式碼有錯誤之處！我們把`my_age`方法定義成private的方法，所以這個方法可以照上述第一點，被類別內部使用。因此可以看到`say_hello`的方法中，我們有呼叫到`my_age`，但這寫法有誤，`my_age`會自動在self上進行，因此前面**不需要再加上self.**，下方程式碼才是正確的：

~~~ruby
class RubyGirl  
  def say_hello  
    puts my_age  
  end  
  private  
  def my_age  
    "Hi, I'm 18 years old!"  
  end  
end  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007ff3b233df30>  
  
annie.my_age  
NoMethodError: private method `my_age' called for #<RubyGirl:0x007ff3b233df30>  
  
annie.say_hello  
=> "Hi, I'm 18 years old!"  
~~~

3. 統整第二點的規則，如果method是一個private方法，那只能直接用method這種方式來呼叫它，不能用oooo.method或self.method來呼叫它。[註: oooo為物件名]


##受保護(protected)方法

1. 與private方法相似，都只能被用在類別或子類別的實體方法中。
2. 跟private不同之處，在於protected可以用oooo.method或self.method來呼叫它。[註: oooo為物件名]

##三種方法大亂鬥

好的，我們最後用一個例子來統整這三個方法：

~~~ruby
class RubyGirl  
  def greeting  
    "Hi, I'm #{self}"  
  end  
  
  def say_my_email  
    "This is my email: #{self.email}"  
  end  
  
  def say_my_age  
    "This is my age: #{age}"  
  end  
  
  protected  
  
  def email  
    "rubygirl@ruby.me"  
  end  
  
  private  
  
  def age  
    18  
  end  
end  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007fe039a06150>  
  
annie.greeting  
=> "Hi, I'm #<RubyGirl:0x007fe039a06150>"  
#greeting屬於public方法，可供該類別的實體物件調用。  
  
annie.email  
NoMethodError: protected method `email' called for #<RubyGirl:0x007fe039a06150>  
#email屬於protected方法，只能在類別裡面供實體方法調用。  
  
annie.age  
NoMethodError: private method `age' called for #<RubyGirl:0x007fe039a06150>  
#age屬於private方法，只能在類別裡面供實體方法調用。  
  
annie.say_my_email  
=> "This is my email: rubygirl@ruby.me"  
#注意最上面的方法定義中是寫self.email，這裡也可以改成email，protected方法比較彈性。  
  
annie.say_my_age  
=> "This is my age: 18"  
#注意上面的方法定義中是寫age，這裡千萬不能加上self.，private方法不能加上self.。  
~~~


---

22天了，今天的主題也有點容易搞混呢，希望大家看得不會霧煞煞，有哪裡有問題請一定要跟我說，乾蝦！

> The wisest mind has something yet to learn.

想學的東西還有好多，只有30天根本不夠，看到有位前輩明明已經達成30天鐵人賽，卻還繼續寫，真的非常佩服啊！

延伸閱讀：[Public, Protected and Private Method in Ruby-高見龍](http://blog.eddie.com.tw/2011/07/26/public-protected-and-private-method-in-ruby/) ，這篇文章很受用，能理解如何在子類別中調用父類別的protected與private方法喔！
