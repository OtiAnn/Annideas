---
title: Ruby女孩(25)：來認識方法的定義與解除！
date: 2014-10-25 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 25
---

從Ruby女孩(18)一直到Ruby女孩(24)我們都聚焦在【The Ruby Programming Language】這本書的第七章『類別與模組』上：

- [Ruby女孩(18)](/ironman/2014-10-18-ruby-girl-18-ruby-class-diy.html) => 定義簡單的類別
- [Ruby女孩(19)](/ironman/2014-10-19-ruby-girl-19-ruby-class-getter-setter.html) => 說明getter、setter與accessor method
- [Ruby女孩(20)](/ironman/2014-10-20-ruby-girl-20-ruby-instance-and-class-methods.html) => 說明實體方法與類別方法的差異
- [Ruby女孩(21)](/ironman/2014-10-21-ruby-girl-21-ruby-instance-and-class-variables.html) => 說明類別變數與類別實體變數的差異
- [Ruby女孩(22)](/ironman/2014-10-22-ruby-girl-22-ruby-public-protected-private-methods.html) => 說明public、protected與private方法的差異
- [Ruby女孩(23)](/ironman/2014-10-23-ruby-girl-23-ruby-inherit.html) => 說明類別的繼承關係與子類別覆蓋方法方式
- [Ruby女孩(24)](/ironman/2014-10-24-ruby-girl-24-ruby-module-class.html) => 說明模組與類別的差異與mixin作用

類別與模組我們要先告一段落了，我們曾在上面這七天看過很多方法的定義，今天來研究一下方法在定義上有什麼規則需要注意！

##定義簡單的方法

方法的定義會使用`def`關鍵字，`def`後面空一格接方法的名稱，名稱旁接著`( )`，`( )`中可放入參數，後方再接著方法的內容，最後以`end`關鍵字為結尾。要注意：

1. 方法的名稱有規定寫法，待下方再做解釋
2. ( )通常可省略，但也有不可省略之時，也是待下方再做解釋
3. ( )中的參數，可直接作為方法程式碼中的變數(參數所提供的值，為調用方法時所給的引數)

來看看範例：

~~~ruby
def my_age(age)  
  "I'm #{age} years old!"  
end  
~~~

方法名稱：my_age
圓括號中的參數：age

~~~ruby
my_age(20)  
  
#當調用my_age方法時可以直接在後方加入引數，此引數將引入程式碼的相同名稱的變數位置！  
  
=> "I'm 20 years old!"  
~~~

##方法的回傳值

所定義的方法如果能夠正常執行，會自動以方法的最後一個運算式來當作回傳值，例如：

~~~ruby
def who_will_return  
  1+1  
  "Ruby"  
  "Linda"  
end  
  
who_will_return  
=> "Linda"  
~~~

在箭號右方的就是回傳值，`"Linda"`是此方法的最後一行，因此會以此行作為回傳值。

在方法中若加入`return`關鍵字，則是強制讓此方法直接跳到結尾，例如：

~~~ruby
def who_will_return  
  1+1  
  return "Ruby"  
  "Linda"  
end  
  
who_will_return  
=> "Ruby"  
~~~

也可以在`return`後方加入判斷式：

~~~ruby
def who_will_return(n)  
  1+1  
  return if 1+n>=30  
  "Linda"  
end  
  
who_will_return(1)  
=> "Linda"  
  
who_will_return(100)  
=> nil  
~~~

##調用物件的方法

方法的調用總是針對一個物件來進行，你可以注意到，我們前面在調用方法時，都會在某物件後面加上**『.方法』**，物件通常被稱為接收器，而方法稱為訊息，而Ruby都是使用**『.』**來分隔物件與方法。

##定義單體方法(singleton method)

今天的文章到目前為止所定義的方法都是全域性的方法，前幾天的文章也介紹過在類別裡面有所謂實體方法與類別方法，今天要再另一種替特定物件定義的方法，稱為**單體方法(singleton method)**，它只能被使用在單一物件上，它的定義方式為：

~~~ruby
aaa = "我愛Ruby"  
  
def aaa.hello      #替aaa物件定義一個單體方法  
  "Hello World!"  
end  
  
aaa.hello  
=> "Hello World!"  
  
bbb = "我愛Python"  
=> "我愛Python"  
  
bbb.hello  
NoMethodError: undefined method `hello' for "我愛Python":String  
~~~

可以注意到`hello`這個方法是屬於`aaa`的單體方法，所以`bbb`是不能調用的！

有沒有發現這種定義方法跟什麼很像呢？我們在前面的文章中有提到類別中的類別方法，是這樣定義的：

~~~ruby
class RubyGirl  
  def self.hello  
  end  
end  
~~~

或

~~~ruby
class RubyGirl  
  def RubyGirl.hello  
  end  
end  
~~~

類別方法的定義方式跟單體方法很像，是的沒錯！
其實，類別方法就是單體方法！！！！
其實，類別方法就是單體方法！！！！
其實，類別方法就是單體方法！！！！

單體方法不是通用在所有物件上的，Numeric類別與Symbol值都不能使用！書中指出：

> 『Ruby將Fixnum與Symbol視為立即值，而非真正的物件參照，因此不適用單體方法』(p.185)：

~~~ruby
a = :rubyruby  
  
def a.hello  
  "Hello World"  
end  
  
TypeError: can't define singleton  
~~~

##解除方法的定義

我們用`def`定義一個方法，可以用`undef`來解除方法的定義，例如：

~~~ruby
def sum(x,y)  
  x+y  
end  
  
undef sum #解除sum這個方法  
~~~

在類別的繼承關係中也可以使用，例如父類別的m方法繼承到了子類別，但子類別不想用到這個方法，就可以undef m，只是這種方式不常用，通常都是定義新的方法來使用，而非刪除舊的方法。

另外，`def`可以定義單體方法，但`undef`不能解除單體方法！

後面的章節還有提到『方法的名稱』、『方法與圓括號』與『方法的引數』，明日再來說明！

---

25天！

> “Adventure may hurt you, but monotony will kill you.”

還有5天！沒想到也持續了25天了！繼續享受在Ruby中的adventure！
