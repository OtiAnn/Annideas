---
title: Ruby女孩(24)：模組是不生孩子的！模組與類別差異及mixin介紹
date: 2014-10-24 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 24
---

今天來談談**模組(module)**，是一個很容易跟**類別(class)**搞混的名稱！我們先下一行指令來看看這兩者之間的關係：

~~~ruby
Class.superclass  
=> Module  
~~~

是的，類別是模組的小孩，模組能做的類別都能做，那，根據昨天的繼承概念，類別這小孩比他老爸模組還擴充了哪些方法呢？

~~~ruby
Class.instance_methods - Module.instance_methods  
=> [:allocate, :new, :superclass]  
~~~

我們用這行指令來做簡單的陣列減法運算XD，看看類別的實體方法比模組的實體方法多了哪些！蝦米啊！只多了三個方法，而且由這三個方法可以明確發現類別跟模組的最大差異：

1. 模組不可以做出實體物件，所以不能使用`.allocate`與`.new`[註1]。
2. 模組之間也不能被繼承，所有的模組之間都是獨立的，不生孩子(不能建立子類別)！

[註1]`.allocate`是什麼？
看個例子理解一下：

~~~ruby
class Test  
  def initialize(test=5566)  
    @test = test  
  end  
end  
  
aaa = Test.new  
=> #<Test:0x007fc9228e1ff0 @test=5566>  
  
bbb = Test.allocate  
=> #<Test:0x007fc923c928d8>  
~~~

當我們幫Test類別建造實體物件時...

1. 使用`.new`，會分配空間給新物件，並調用類別中的`initialize`方法。
2. 使用`.allocate`，會分配空間給新物件，但不會調用`initialize`方法。

[參考資料](http://apidock.com/ruby/Class/allocate)

阿嬤：『安捏喔，那模組要怎麼使用呢？』

##模組的mixin用法

>『如果一個模組定義的是實體方法，而不是類別方法，這些實體方法可以混進(mix in)其他類別。...欲將一個模組混進一個類別，可以使用include。』(p.260)

~~~ruby
module Trytry  
  def who_am_i  
    "我屬於#{self.class}"  
  end  
end  
  
class RubyGirl  
  include Trytry  
end  
  
annie = RubyGirl.new.who_am_i  
=> "我屬於RubyGirl"  
~~~

仔細看看上方的程式碼，我在Trytry模組中定義了一個實體方法，然後在RubyGirl類別中`include` Trytry，結果當我替RubyGirl類別製作出新的實體物件時，這個物件就享有Trytry模組中的實體方法了！

其實之前在[Ruby女孩(17)](/ironman/2014-10-17-ruby-girl-17-ruby-order-method.html)所提到的次序比較時，我們就有偷偷使用過一個模組的mixin用法，我們將Comparable模組引用進一個類別中，讓那個類別也能有次序比較的方法：

~~~ruby
class RubyGirl  
  include Comparable  
  
  attr_accessor :age  
  
  def initialize(age)  
    @age = age  
  end  
  
  def <=> (the_other_one)  
    self.age <=> the_other_one.age  
  end  
end  
  
annie = RubyGirl.new(25)  
=> #<RubyGirl:0x007fb7091169b8 @age=25>  
  
linda = RubyGirl.new(18)  
=> #<RubyGirl:0x007fb709112b38 @age=18>  
  
annie > linda  
=> true  
  
linda <=> annie  
=> -1  
~~~

要注意！

1. mixin所使用的include，只能include模組，不能include類別。
2. 類別可以include模組，模組也可以include模組。

要混入模組的方法除了**『include』**，也可以使用**『extend』**。如果是在類別中寫『extend 模組』，**該模組的實體方法將轉變成類別的類別方法**：

~~~ruby
module Trytry  
  def who_am_i  
    "我屬於#{self.class}"  
  end  
end  
  
class RubyGirl  
  extend Trytry  
end  
  
RubyGirl.who_am_i  
=> "我屬於Class"  
~~~

注意到了嗎？這次改成`extend` Trytry後，不需要`.new`產生實體物件就可以使用`who_am_i`，就是因為現在`who_am_i`已經變成RubyGirl的類別方法了。

模組當然不止mixin使用，書中還有提到可作為命名空間之用，但這個部分自己尚未理解清楚，就先不要打上來誤人子弟了XD

---

24天！

> “You got this. Make it happen.”- Danielle LaPorte
