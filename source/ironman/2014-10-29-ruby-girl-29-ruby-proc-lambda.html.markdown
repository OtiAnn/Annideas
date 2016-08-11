---
title: Ruby女孩(29)：揭開區塊的面紗-Proc、lambda
date: 2014-10-29 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 29
---

昨天解謎解到一半，發現區塊的類別是`Proc`。啥？什麼是`Proc`？其實昨天提到的區塊，實際上它並不是物件！不能直接像物件那樣被操作。
所以該如何操作區塊呢？今天就來談談這個部分。先來看看書中一段：

>『我們可以建立一個代表區塊的物件，依據物件建立方式的不同，它可以被稱為一個proc或一個lambda。proc的行為如同區塊，而lambda的行為如同方法。然而，他們都是Proc類別的實例。』(p.198)

##proc與lambda

###建立proc

(1)第一種建立proc的方式：透過調用方法來建立proc

~~~ruby
def makeproc(&iamproc)  
  iamproc  
end  
~~~

上面的方法看起來就像昨天區塊引數的介紹，當我們在引數前綴一個**『&』**時，我們已經將所伴隨的區塊轉換成一個**Proc物件**並存入`iamproc`中，另外在方法中再傳回Proc物件。

此時我們可以利用`makeproc`這個方法來建立Proc物件：

~~~ruby
aa = makeproc{ |x| x*x }  
=> #<Proc:0x007fe6a5929cb0@(irb):43>  

bb = makeproc{ |x| x+x }  
=> #<Proc:0x007fe6a59b8730@(irb):44>  
~~~

所有的Proc物件都具有`.call`這個方法，當它被調用時，會執行區塊中的程式碼：

~~~ruby
aa.call(5)  
=> 25  
bb.call(3)  
=> 6  
~~~

(2)Proc.new

~~~ruby
aa = Proc.new{ |x| x*x }  
=> #<Proc:0x007fcb1d239de0@(irb):1>  
~~~

這個建立Proc實體的方式，是所有方式中最明顯的，其實下面這兩種寫法是完全等效的，大家可以比較看看：

~~~ruby
def test(&block)  
  block.call  
end  
~~~

與  

~~~  
def test  
  Proc.new.call  
end  
~~~

(3)Kernel.lambda

~~~ruby
bb = lambda{|x| x+x}  
=> #<Proc:0x007fcb1e0b52c0@(irb):2 (lambda)>  
  
bb.call(3)  
=> 6  
~~~

在文章一開始，有節錄書中一段話，指出Proc類別下有proc與lambda之分別，剛剛前兩種建立Proc物件的方法都是建立出Proc下的proc，而第三種則很明顯，是建立出Proc下的lambda，至於proc與lambda到底差在哪裡，我們隨後介紹完建立方法會解釋。

(4)Kernel.proc

這裡所指的proc與上面的lambda都屬於Kernel模組的方法，他們都是全域方法。

~~~ruby
cc = proc{|x| x+x}  
=> #<Proc:0x007fcb1c017f18@(irb):5>  
cc.call(5)  
=> 10  
~~~

Ruby1.8以前proc都只是lambda的同義字，不過Ruby1.9之後，proc其實是Proc.new的縮寫。

###調用proc或lambda

除了call這個方法可以傳遞引數給區塊之外，也可使用中括號：

~~~ruby
cc = proc{|x,y| x+y}  
cc[4,9]  
=> 13  
  
dd = lambda{|x,y| x*y}  
dd[7,8]  
=> 56  
~~~

###lambda與proc有何差別

> 『proc是一個區塊的物件形式，行為就如同一個區塊；lambda的行為稍有不同，叫像一個方法而非區塊。』(p.203)

~~~ruby
dd.proc?  
NoMethodError: undefined method `proc?' for #<Proc:0x007fcb1cbe1f88@(irb):8 (lambda)>  
  
dd.lambda?  
=> true  
~~~

上方所示，`lambda?`因為如同一個方法，我們可以用來確定Proc物件是不是proc或lambda，但我們只有`lambda?`而不會有`proc?`這個方法。

另外也有人說lamnda就是比較嚴謹的proc，傳入的參數不足，是會噴錯的，例如：

~~~ruby
aa = proc{|x,y| puts x ; puts y}  
=> #<Proc:0x007fb3c4ae21d8@(irb):1>  
  
bb = lambda{|x,y| puts x ; puts y}  
=> #<Proc:0x007fb3c330f8f8@(irb):2 (lambda)>  
  
aa[3,4]  
3  
4  
  
bb[3,4]  
3  
4  
  
aa[3]  
3  
  
  
bb[3]  
ArgumentError: wrong number of arguments (1 for 2)  
~~~

其實寫到這裡，對於proc和lambda實作性還是不太清楚，有關proc與lambda之間的內容，網路上也有很多人做過分析，大家有興趣也可以多看看：

- [Ruby Block, Proc and Lambda](http://tonytonyjan.net/2011/08/12/ruby-block-proc-lambda/)
- [Ruby Gossip: 程式區塊與 Proc](http://openhome.cc/Gossip/Ruby/Proc.html)
- [[Ruby] Block & Proc/Lambda](http://brian-p-pan-blog.logdown.com/posts/195007-ruby-block)
- [Ruby的block, lambda, Proc與函式物件](http://chuyi.inow.tw/index.php/ruby%E7%9A%84block-lambda-proc%E8%88%87%E5%87%BD%E5%BC%8F%E7%89%A9%E4%BB%B6/)

---

29天！

> “It is never too late to be what you might have been.” George Eliot

只要開始，永遠不嫌晚，快加入Ruby 的行列吧XD
