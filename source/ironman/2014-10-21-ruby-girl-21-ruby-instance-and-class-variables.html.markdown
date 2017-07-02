---
title: Ruby女孩(21)：來聽聽類別變數與類別實體變數的自白(?)
date: 2014-10-21 08:58 UTC
tags: Ruby, RailsGirls, Rails, Learning, Variable
desc: 我是 Annie，我參加 iThome 在 2014 年舉辦的第七屆 iT 邦幫忙鐵人賽，連續 30 天不中斷地記錄自己學習 Ruby 的歷程，這一系列 30 篇文章，推薦給跟我一樣初學 Ruby 約半年的朋友參考。
category: 鐵人
order: 21
---

昨天我們講完類別方法，今天我們來說明一下類別變數，把昨天的code加一些料，讀讀程式碼看看能不能理解類別變數的作用：

~~~ruby
class RubyGirl  
  attr_accessor :age  
  @@size = 0            #這行是新增加的  
  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
    @@size += 1         #這行是新增加的  
  end  
  
  class << self  
    def project(x=1)  
      puts "每一個RubyGirl都有 #{x} 個project."  
    end  
    def size  
      @@size  
    end  
    #上面這三行是新增加的  
  end  
end  
~~~

好的有三個部分新增加了，能讀出現在類別變數與類別方法可以幹嘛？實際測試之前，我們先來說明一下何謂**類別變數**：

##何謂類別變數？

以下為『類別變數』的自白XD

**1. 我的長相跟實體變數不一樣，實體變數只要背一個@，我要背兩個@@...**

~~~ruby
@ruby_skill #實體變數  
@@size      #類別變數  
~~~

**2. 如果需要初始值，我的寫法是寫在類別定義一開始，跟實體變數不一樣(他要被包在initialize方法中)。**

~~~ruby
class RubyGirl  
  @@size = 0 #設定初始值  
end  
~~~

**3. 我可以遊走在類別中的任何地方，也就是在實體方法跟類別方法中都可以使用。**

~~~ruby
class RubyGirl  
  @@size = 0     
  def 實體方法  
    @@size +=1  
  end  
  def 類別方法  
    @@size  
  end  
end  
~~~

好的，認識完類別變數，我們來測試剛剛最前面的方法可以得到什麼吧！我們在一開始宣告了`@@size`類別變數，並給他初始值為`0`，然後在`initialize`實體方法中，加上一行`@@size+=1`，也就是讓這個類別中的實體物件被製造出來時，都自動讓`@@size`的值+1，這可以怎樣呢？

~~~ruby
RubyGirl.size  
=> 0  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007f98ed81d2c8 @ruby_skill=0>  
  
RubyGirl.size  
=> 1  
  
linda = RubyGirl.new  
=> #<RubyGirl:0x007f98ed82c160 @ruby_skill=0>  
  
RubyGirl.size  
=> 2  
~~~

用這個`.size`的類別方法，可以知道目前這個類別被建立了多少個物件，酷吧！

還是再複習一下，請注意`.size`是屬於類別的方法，因此實體物件是不能使用的：

~~~ruby
annie.size  
NoMethodError: undefined method `size' for #<RubyGirl:0x007f98ed81d2c8 @ruby_skill=0>  
~~~

##何謂類別實體變數？

接下來，要來說說容易被混淆的**類別實體變數(class instance variable)**

以下是類別實體變數的自白：

**1. 我長得跟實體變數一模一樣，我也背一個@**

**2. 我..我活在類別中的任何地方，除了實體方法以外！**

所以你可能找到我的地方就在:

~~~ruby
class RubyGirl  
  @size = 0  
  def 實體方法  
    ...  
    ...  
    #沒有@size  
  end  
  def 類別方法  
    @size  
  end  
end  
~~~

我們用『類別實體變數』的寫法來改寫剛剛用『類別變數』記錄類別實體個數的程式碼：

~~~ruby
class RubyGirl  
  attr_accessor :age  
  @size = 0      #把類別變數改成類別實體變數  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
  #注意上方實體方法中並沒有出現@size  
    
  class << self  
    def project(x=1)  
      puts "每一個RubyGirl都有 #{x} 個project."  
    end  
    def new  
      @size +=1  
      super  
    end  
    #建立新的RubyGirl物件的類別方法  
    #在此方法中使用類別實體變數來記錄個數  
    #super一定要加！因為我們不是想要把.new的方法完全取代，我們只是要擴充這個方法，super這個關鍵字可以讓我們成功擴充.new的方法  
  
    def size  
      @size      #把類別變數改成類別實體變數  
    end  
  end  
end  
~~~

ok，上面的程式碼已經將原本使用類別變數的方法全改成類別實體變數了，接下來來測試一下：

~~~ruby
RubyGirl.size  
=> 0  
  
annie = RubyGirl.new  
=> #<RubyGirl:0x007f97b40fa520 @ruby_skill=0>  
  
RubyGirl.size  
=> 1  
~~~

效果與前面的類別變數是一樣的！由於類別實體變數就是類別物件的實體變數，我們也可以用先前提到的`attr_reader`或`attr_accessor`來替換他們的方法寫法：

~~~ruby
class RubyGirl  
  attr_accessor :age  
  @size = 0  
  def initialize(ruby_skill=0)  
    @ruby_skill = ruby_skill  
  end  
  
  class << self  
    attr_accessor :size      #這行是新增加的  
    def project(x=1)  
      puts "每一個RubyGirl都有 #{x} 個project."  
    end  
    def new  
      @size +=1  
      super  
    end  
  end  
end  
~~~

做個小結：

1. 實體變數被用在實體方法裡
2. 類別變數被用在類別的任何地方(實體方法裡也可以)
3. 類別實體變數被用在類別的任何地方，除了實體方法以外
4. 實體變數跟類別實體變數都背一個@
5. 類別變數背兩個@@
6. 實體變數與類別實體變數都可以用attr_accessor的方式改寫

哇，結果今天光是程式碼就佔據好多版面了，明天要來說說**公用方法**、**受保護的方法**與**私用方法**喔，也是非常容易搞混的一環！

---

21天了！

> “The only disability in life is a bad attitude. - Matthew Jeffers”
