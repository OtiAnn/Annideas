---
title: Ruby女孩(16)：物件之間相等性的比較
date: 2014-10-16 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 16
---

##物件類別與物件型別

我們曾在前面的文章中提及，如果我需要知道某物件是什麼類別，我們可以用`.class`，如果我們想知道它的父類別可以用`.superclass`，如果想列出它的祖先們，可以用`.ancestors`，不過Ruby 其實也有更優雅的寫法XD，以前不知道優雅是什麼，不過我想，就是更人性的方式吧，大家來看看：

###普通的比較

~~~ruby
"oh my god!".class == String  
=> true  
~~~

###優雅優雅優雅優雅優雅的寫法

~~~ruby
"oh my god!".instance_of? String  
=> true  
~~~

但這有個問題，當我寫：

~~~ruby
"oh my god!".instance_of? Object  
=> false  
~~~

阿不是一直強調Ruby 中萬事萬物都是物件嗎？怎麼會是錯的？

原來這`.class`和`.instance_of?`是不會查到該類別的所有父類別，如果想要查到父類別，就要使用`.is_a?`這個方法，例如：

~~~ruby
xxx = 5566  
xxx.instance_of? Fixnum  
=> true  

xxx.is_a? Fixnum  
=> true  
  
xxx.is_a? Integer  
=> true  
  
xxx.is_a? Numeric  
=> true  
  
xxx.is_a? Object  
=> true  
~~~

> 『Ruby 中，每個物件都會具有一個定義明確的類別，而且該類別絕不會在物件存活期間遭到改變。』(p.79)

阿勒？類別不會改變嗎？看到這句疑惑了一下，想說我們先前不是才學到可以`.to_i`、`.to_s`、`.to_sym`等方法可以改變物件類別嗎？
所以測試了一下：

~~~ruby
x = "annie"  
x.class  => String  
x.object_id  => 70148984557260  
y = x.to_sym  => :annie  
y.object_id  => 657928  
x.object_id  => 70148984557260  
~~~

可以看到我確實把`x`指向的物件"annie"變成symbol，但這個symbol物件會存到另一個記憶體位置，變成新的物件！再回頭去看`x`，其實這個物件本身是沒有被改變的！

##物件的相等性

Ruby 提供了一些驚奇的做法來判斷物件是否相等！這地方我覺得非常重要，了解運算規則後，做邏輯判斷才不會用錯方法！

###equal?
**這個方法判斷兩個值是否指向相同的物件！**

~~~ruby
a = "Ruby"  
b = c = "Ruby"  
a.equal? b  => false  
b.equal? c  => true  
~~~

其實`.equal?`這個方法就是在檢查兩邊所指向的object_id是否一樣！

###==
**這個方法是在判斷兩邊值的相等性！**

~~~ruby
a = "Ruby"  
b = "Ruby"  
a.equal? b  => false  
a == b  => true  
  
c = [1,3,5]  
d = [1,3,5]  
e = [1,5,3]  
c == d  => true  
c == e  => false  
~~~

雖然a、b所指向的物件不同，但是兩物件有相同的值，因此做`==`判斷是true。而c、d、e指向的陣列都是不同物件，但c和d的值完全相等(順序也一樣)，所以相等性判斷為true。反之，e與c、d的值順序不同，相等性判斷就為false。

值得一提的是，**Numeric類別中的數，在做相等性判斷時，會自動進行型別轉換**，例如：

~~~ruby
1 == 1.0  => true  
~~~

雖然一個是Fixnum、一個是Float，但他很聰明可以判斷這值是相等的！

若要比較範圍和陣列的相等性的話，我們也可以這麼做：

~~~ruby
(1..3).to_a == [1,2,3]  => true  
# 先把一邊轉換，再做比較，此時只看值的話，相等性判斷為true  
  
(1..3).to_a.equal? [1,2,3]  => false  
# 但別忘了，他還是不同的物件喔！  
~~~

有相等就有不等，`!=`(不等於)是拿來測不等性，其實在Ruby的實作中，當他看到`!=`，只會使用`==`來判斷是否相等，然後直接把結果反轉，來當作`!=`的結果。

###eql?
如果說`==`是好好先生，那`.eql?`可以說是嚴格的大叔，**相較於==，.eql?不會進行型別轉換**，我們來看看：

~~~ruby
1 == 1.0  => true  
1.eql? 1.0  => false  
  
"Ruby".eql? "Ruby"  => true  
~~~

可以看到，不同物件中的值只要一樣，`.eql?`的判斷依舊會成真，但是型別不同時，他是不會自己幫你判斷的！

###===
`==`是測值的相等性，而`===`是**測情況相等性(case equality)**，直接來看看例子：

~~~ruby
(1..10) === 5  => true  
# 範圍是測試值有沒有落在區間中  
  
/\d+/ === "123"  => true  
# 正規表達式是測試字串是否符合正規表達式  
  
String === "ya"  => true  
# 類別會判斷某物件是不是該類別的實例  
  
:ss === "ss"  => true  
# Symbol除了判斷左右兩邊是不是相同的符號，
# 如果右邊是字串，他會判斷字串的內容是不是跟自己一樣，是的話也會回傳true！  
~~~

不過書中說上面這幾種述句不常見，比較常見的是用在case數據的用法，第五章才會提到，我們之後再揭曉！

###=~

前面幾種方法都是定義於Object，只有現在這個`=~`方法是定義在String、Regexp中(也包含Symbol)，他所進行的是樣式比對運算。這個部分書上沒有舉例子，我們可以參考[此文件最下方的例子](http://guides.ruby.tw/ruby/regexp.html)，以及[此份文件](http://wiki.plweb.org/?title=Ruby/Chapter&oldid=29360)有更完整的說明。

這個方法會需要理解正規表達式之後，才能更清楚他的做法。

---

16天，

> “You can feel sore tomorrow or you can feel sorry tomorrow. You choose.”

未來怎麼樣，都看你今天決定做了什麼，我今天沒看到想要的進度，所以明天一定是感到sorry哭哭
