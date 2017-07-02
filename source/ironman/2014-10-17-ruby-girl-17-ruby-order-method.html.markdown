---
title: Ruby女孩(17)：自己做排序的方法！
date: 2014-10-17 08:58 UTC
tags: Ruby, RailsGirls, Rails, Learning, Comparable
desc: 我是 Annie，我參加 iThome 在 2014 年舉辦的第七屆 iT 邦幫忙鐵人賽，連續 30 天不中斷地記錄自己學習 Ruby 的歷程，這一系列 30 篇文章，推薦給跟我一樣初學 Ruby 約半年的朋友參考。
category: 鐵人
order: 17
---

##物件的次序

昨天在提及相等性時，其中一個方法就是`==`，今天我們在物件的次序的比較時也可以採用`<=>`方法，以Integer來說，數字本身就有大小的差別，根據`<=>`方法會有三種結果：

~~~ruby
4 <=> 5  
=> -1    #當左邊小於右邊時，會回傳-1。  
  
4 <=> 4  
=> 0     #當左邊等於右邊時，會回傳0。  
  
4 <=> 3  
=> 1     #當左邊大於右邊時，會回傳1。  
  
"hi" <=> 5  
=> nil   #兩邊為不同類別，是無法比較的，會回傳nil。  
~~~

像這種次序的比較方式，通常會引用**Comparable 模組(module)**，而成為一個**mixin(混成)**(書中指出在第七章會詳細說明mixin)。

不過其實可以這麼想，當我想要幫物件做排序時，可能會有我自己希望的排序方法，例如我有一個人類的類別，但我們無法直接對兩個人做排序，此時我可以自己定義按照人類的年齡來做排序，我們可以這麼寫：

~~~ruby
class Person  
  include Comparable  
   
  attr_accessor :age  
   
  def initialize(age)  
    @age = age  
  end  
   
  def <=> (another_person)  
    age <=> another_person.age  
  end  
   
end  
   
otis = Person.new(23)  
   
annie = Person.new(18)  
   
annie > otis  => false  
~~~

這個範例是指，如果有個類別叫做Person，我們可以引入Comparable模組，並給他們年齡這個屬性，可以直接看在class中的`<=>`方法，此為我們自己定義的方法，我們把年齡的比較給寫了進去，此時新增兩個人類物件Annie和Otis，並給他們年齡值，此時就可以直接對這兩個物件做比較。

甚至可以幫一個陣列做排序：

~~~ruby
[younger, young, old, older] = [16, 28, 43, 66].map { |age| Person.new( age ) }  
#上面這行是在陣列中存入4個人類物件，並且給他們年齡定為16, 28, 43, 66  
  
#當我們自己亂排，再用.sort來排序：  
[older, young, younger, old].sort  
=> [younger, young, old, older]  
~~~

很酷吧！感覺這是非常方便的一種做法！

---

17天，

> 覺得為時已晚的時候，恰恰是最早的時候 - 哈佛大學圖書館牆上的訓言

只要開始，就不嫌晚，堅持下去吧！
