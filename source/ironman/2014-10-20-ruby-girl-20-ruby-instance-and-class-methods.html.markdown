---
title: Ruby女孩(20)：一次弄懂一件事，今天來分清楚實體方法跟類別方法的差異！
date: 2014-10-20 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 20
---

前兩天我們所示範的都是**實體方法**，你得真的`.new`出一個實體物件之後，才能使用的實體方法。今天我們來認識**類別方法**，類別方法顧名思義是給類別本身所使用的方法，它不需要製造出實體物件就可以使用，來看看以下例子：

~~~ruby
class RubyGirl  
  attr_accessor :age  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
  
  def self.project(x=1)  
    puts "每一個RubyGirl都有 #{x} 個project."  
  end  
end  
~~~

比起昨天的程式碼，有沒有注意到多了一個名為self.project的方法，這個方法名稱很特別，前面加上了`self`(也可以把self改成RubyGirl，功能相同)，像這樣在名稱前面上加上`self`或`類別名稱`的方法，都屬於類別方法，那類別方法怎麼調用呢？我們看看以下範例：

~~~ruby
RubyGirl.age  
NoMethodError: undefined method `age' for RubyGirl:Class  
  
RubyGirl.project  
=> "每一個RubyGirl都有 1 個project."  
~~~

你可以注意到`.age`這個方法因為屬於實體方法，他必須要`.new`出一個實體物件後才能使用。但是`.project`是可以直接被類別名稱所使用(不需要製作出實體物件)！

~~~ruby
annie = RubyGirl.new  
=> #<RubyGirl:0x007fefc94a26d8 @ruby_skill=0>  
  
annie.project  
NoMethodError: undefined method `project' for #<RubyGirl:0x007fefc94a26d8 @ruby_skill=0>  
~~~

但是當你實際`.new`出一個屬於RubyGirl的實體物件annie後，這個實體物件只能調用實體方法，他再調用`.project`方法就會噴錯，由此可知，**實體物件是無法使用類別方法的**！

由於上面的寫法每定義一個類別方法都需要在方法名稱前加上`self`，可能會讓程式碼不夠明確(書中所述)，因此書中提到，有另一種寫法很符合**D.R.Y(Don't Repeat Yourself)原則**：

~~~ruby
class RubyGirl  
  
  #實體方法放這裡  
  
  class << self  
  
    #類別方法放這裡  
  
  end  
  
end  
~~~

所以我們可以把剛剛的程式碼改寫成：

~~~ruby
class RubyGirl  
  attr_accessor :age  
    
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
  
  class << self  
    def project(x=1)  
      puts "每一個RubyGirl都有 #{x} 個project."  
    end  
  end  
end  
~~~

有類別方法當然也會有類別變數，類別變數的寫法我們曾經在[Ruby女孩(4)](/ironman/2014-10-04-ruby-girl-4-ruby-intro.html)時有提過，另外也有**類別實體變數**，明天再一次介紹吧。一次搞懂一件事，今天的重點就是要分清楚實體方法跟類別方法的差異，你也了解了嗎XD?

---

20天！加油加油還有三分之一XD

> Today I will do what others won't, so tomorrow I can do what others can't.
