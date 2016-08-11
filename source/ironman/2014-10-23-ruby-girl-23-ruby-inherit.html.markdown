---
title: Ruby女孩(23)：Ruby中的繼承者們！有錢真好(誤)
date: 2014-10-23 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 23
---

今天要來看看怎麼建立類別的孩子、孫子、子子孫孫們！實際上先前我們已經有偷偷用過了，不過今天來做個詳細的介紹！

##建立子類別

通常我們如果需要建立**子類別(subclass)**，都是為了要沿用**父類別(superclass)**的方法，然後再擴充自己的方法。(你知道的，通常父母都會把自己的全部送給孩子，然後孩子自己再去發展自己的事業XD)

還記得我們寫過...

~~~ruby
Fixnum.ancestors  
=> [Fixnum, Integer, Numeric, Comparable, Object, Kernel, BasicObject]  
~~~

Fixnum的爸爸是Integer，其他都是Fixnum的祖先，Fixnum有其他祖先所定義的所有方法！

那如果我們要自己寫一個子類別的話該怎麼做呢？很簡單我們只需要一個**『<』**符號就好了！

~~~ruby
class RubyGirl < Girl  
  
end  
~~~

上面我將RubyGirl定義成是Girl的子類別，所以會有所有Girl的方法！例如：

~~~ruby
class Girl  
  attr_accessor :talk, :height, :weight  
  def talk  
    "Hi, nice to meet you!"  
  end  
end

class RubyGirl < Girl  
  attr_accessor :age, :ruby_skill  

  def initialize(height=180,weight=40,ruby_skill=60,age=18)  
    @height = height  
    @weight = weight  
    @ruby_skill = ruby_skill  
    @age = age  
  end  
end  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007fa7c3052e78 @height=180, @weight=40, @ruby_skill=60, @age=18>  
~~~

看到了嗎，我們明明是在Girl這個類別定義身高、體重這兩個方法，而annie是RubyGirl類別的實體物件，但annie初始化時也可以使用Girl中的方法！當然，annie也享有說話這個方法，因為RubyGirl繼承Girl，所以：

~~~ruby
annie.talk  
=> "Hi, nice to meet you!"  
~~~

##覆寫方法

不過有時候，孩子可能不太喜歡父母的規定，例如annie的talk並不想要這麼死板XD，那RubyGirl這個類別可以做些修改來重新定義父母的行為，例如：

~~~ruby
class Girl  
  def talk  
    "Hi, nice to meet you!"  
  end  
end 

class RubyGirl < Girl  
  def talk  
    "Hey, folks~~~"  
  end  
end  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007fde6438f708>  
  
annie.talk  
=> "Hey, folks~~~"  
~~~

> 『當方法被調用時，會動態查找該方法，所以會發現該方法的定義或是他的新定義。』(p.246)

有些父母比較彈性，會在自己的方法中挖空，讓子女來定義也是完全可以的噢，以下我們來介紹抽象的類別：

~~~ruby
class Girl  
  def talk  
    "#{greeting} #{who}"  
  end  
end  
#上面這個父類別的talk方法都被挖空了！  
  
#挖空的內容讓下面的子類別來定義！  
class RubyGirl < Girl  
  def greeting  
    "Hey,"  
  end  
  def who  
    "folks~~~"  
  end  
end  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007f9e6cad13a0>  
  
annie.talk  
=> "Hey, folks~~~"  
~~~

##覆寫私用方法

昨天有提到，一個類別的私用方法不能被類別以外的地方使用，但是是可以被子類別調用與覆寫的，我們曾經在[Ruby女孩(21)](/ironman/2014-10-21-ruby-girl-21-ruby-instance-and-class-variables.html)中提到一個叫做`super`的寫法，當時只有簡單說明，如果我們**想要擴充而非完全取代舊有的方法**，那我們一定要加上`super`才行！

`super`是一種透過鏈結(chaining)的方式來覆寫父類別的方法，下面的例子指出，我在建立RubyGirl的實體物件時，初始化的內容包含四個引數，其中兩個來自父類別的相同名稱方法中(height,weight來自Girl的initialize方法)，後面兩個則在自己的類別中處理(ruby_skill,age來自RubyGirl自己的initialize方法)。

~~~ruby
class Girl  
  attr_accessor :height, :weight  

  def initialize(height,weight)  
    @height = height  
    @weight = weight  
  end  
end  
class RubyGirl < Girl  
  attr_accessor :age, :ruby_skill  
  
  def initialize(height,weight,ruby_skill=60,age=18)  
    super(height,weight)  
    @ruby_skill = ruby_skill  
    @age = age  
  end  
end  
  
annie = RubyGirl.new(180,40)  
=> #<RubyGirl:0x007fa81b017140 @height=180, @weight=40, @ruby_skill=60, @age=18>  
~~~

##當繼承遇到公用、受保護、私用方法

最後我們來看看繼承與昨天公用、受保護、私用方法之間錯綜複雜的關係為何？

直接來看例子，你就可以知道生在好的人家裡面多重要了(大誤)，繼承者完全可以使用老爸的公用、受保護、私用方法！

~~~ruby
class Father  
  def friend  
    "Dad have a lot of friends"  
  end  
  
  protected  
  
  def money  
    "Dad have a lot of money"  
  end  
  
  private  
  
  def company  
    "Dad have a lot of company"  
  end  
end  
  
class Son < Father  
  def son_friend  
    "#{self.class} and #{friend}"  
  end  
  def son_money  
    "#{self.class} and #{money}"  
  end  
  def son_company  
    "#{self.class} and #{company}"  
  end  
  def son_all  
    secret  
  end  
  
  private  
  def secret  
    puts "hey hey A__A i told you a secret: \n #{friend} \n #{money} \n #{company}"  
  end  
end  
  
dd = Son.new  
=> #<Son:0x007faefc920ce0>  
  
#完全可以用老爸的公用方法  
dd.son_friend  
=> "Son and Dad have a lot of friends"  
  
#完全可以用老爸的受保護方法  
dd.son_money  
=> "Son and Dad have a lot of money"  
  
#完全可以用老爸的私用方法  
dd.son_company  
=> "Son and Dad have a lot of company"  
  
#在自己的私用方法中也可以呼叫到老爸的所有類型的方法  
dd.son_all  
=> "hey hey A__A i told you a secret:"  
       "Dad have a lot of friends"  
       "Dad have a lot of money"  
       "Dad have a lot of company"  
~~~

這個故事告訴我們，越後面出生的越幸福(誤)，不過好像也可以這麼作結論，孩子的東西永遠比父母多，而且父母有的孩子一定有！ＱＱ

---

23天了！！！

> Go ahead, let them judge you.

繼續前進，做足準備，再讓大家審視我!!ＸＤ
