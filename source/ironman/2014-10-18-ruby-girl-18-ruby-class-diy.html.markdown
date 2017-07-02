---
title: Ruby女孩(18)：自己的類別自己做啦！
date: 2014-10-18 08:58 UTC
tags: Ruby, RailsGirls, Rails, Learning, Class
desc: 我是 Annie，我參加 iThome 在 2014 年舉辦的第七屆 iT 邦幫忙鐵人賽，連續 30 天不中斷地記錄自己學習 Ruby 的歷程，這一系列 30 篇文章，推薦給跟我一樣初學 Ruby 約半年的朋友參考。
category: 鐵人
order: 18
---

這幾天都在講物件，其實也累積了不少疑惑，物件的部分先暫時告一段落，今天先跳到本書第七章「類別與模組」，主要是因為昨天在最後面實作人類類別時，用到了蠻多觀念，我們先來讀讀第七章，這也是Ruby 非常重要的觀念之處。

先用一段文字來導讀**類別**與**模組**的內容：(p.222)

>『Ruby 的物件受到嚴格的封裝：它的狀態只能透過它所定義的方法來存取。用於操作實體變數的方法，你無法在物件外部直接使用。你可以定義getter(取得器)與setter(設定器)等存取器方法(accessor method)，讓物件狀態的存取有如直接進行。這一對存取器方法就是所謂的屬性(attribute)，與實體變數有所不同。這一對由類別所定義的方法可能具有公用(public)、受保護(protected)或私用(private)等可見性，這會影響到調用它們的方式與位置。』

這段文字其實就說明了很重要的觀念，接下來我們馬上來定義一些類別來了解上面所提到的幾個重點名詞。

##定義一個簡單的類別

###1. 建立類別

類別名稱跟常數名稱一樣都要以**大寫字母開頭**，而且一個類別會用一個end作為界定符。以下我們定義一個名為RubyGirl的類別：

~~~ruby
class RubyGirl  
end  
~~~

###2. 利用.new，替RubyGirl建立一個實例：

~~~ruby
annie = RubyGirl.new  
=> #<RubyGirl:0x007ff071ba4500>  
~~~

上面的執行結果表示已經替RubyGirl做了一個實例，並將此實例的參照指向annie

~~~ruby
annie.is_a? RubyGirl  
=> true  
~~~

但現在在RubyGirl中沒有定義任何方法，所以我們可以先寫個初始化的方法。

###3. 定義initialize方法，初始化RubyGirl的物件

~~~ruby
class RubyGirl  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
end  
~~~

中間新增的三行程式碼，我們讓初始值有個**實體方法(instance method)**，實體方法可以讓類別的所有實體使用，例如：

~~~ruby
linda = RubyGirl.new  
=> #<RubyGirl:0x007ff070a5c3d8 @ruby_skill=0>  
~~~

看到剛剛有什麼不一樣了嗎？後面多了實體變數`@ruby_skill`，而且值為我們預設的0。

你也可以在建立時自己訂定`@ruby_skill`的值，例如：

~~~ruby
mary = RubyGirl.new(50)  
=> #<RubyGirl:0x007ff071bcc5c8 @ruby_skill=50>  
~~~

值得注意的是，`initialize`方法在Ruby 中有特殊用途，所有類別物件被建立時，都會自動調用這個`initialize`方法，如果名稱不是`initialize`則不會被調用，我們可以試試：

~~~ruby
class RubyGirl  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
  
  def age(a=18)  
    @a = a  
    puts "I'm #{a} years old"  
  end  
end  
  
annie=RubyGirl.new  
=> #<RubyGirl:0x007ff071bd6f28 @ruby_skill=0>  
~~~

可以看到，我雖然在下面加了一個叫做`age`的方法，但是我在建立物件後，此物件只調用`initialize`方法，並不會去調用`age`。

不過我們還是可以用`.age`的方式，來調用年齡的方法：

~~~ruby
annie.age  
=> I'm 18 years old  
#沒有給值就會自動以方法中的初始值18當作結果  
  
annie.age(30)  
=> I'm 30 years old  
#也可以自己改掉年齡  
~~~

今天先說明簡單的建立類別方法，明天會交代存取器與屬性，這裡超級重要而且很容易搞混喔！to be continued ... ＸＤ

---

18天！

今天看到非常受用的句子，來自這個投影片：[Ruby也可以這樣寫-高見龍](https://speakerdeck.com/eddie/happy-programming-ruby)

> “Difference between a master and a beginner? The master has failed more times than the beginner has even tried.”

“大師與新手之間的差別，就是大師失敗過的次數，比新手嘗試過的次數還多”
