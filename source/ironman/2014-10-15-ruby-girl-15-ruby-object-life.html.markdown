---
title: Ruby女孩(15)：Ruby物件的生與死
date: 2014-10-15 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
category: 鐵人
order: 15
---

廢話不多說，直接開始開始說明Ruby 中所有物件的共同特點。

##物件的參照(object reference)

>『當我們在Ruby中處理物件時，我們實際上在處理物件的參照。我們所操作的不是物件本身，而是一個指向他的參照。當我們對一個變數賦值時，並不是將一個物件複製給該變數；我們只是把指向一個物件的參照存入該變數。』

zzzzZZZZZZ...

我們還是看個例子理解一下：

~~~ruby
annie_say = "Hello, ruby!"  
#建立一個String物件，將指向此物件的參照存到annie_say中  

linda_say = annie_say  
=> "Hello, ruby!"  
# 將剛剛指向String的參照複製到linda_say  
# 此時annie_say與linda_say都指向同一個物件  
~~~

我們可以這樣檢查，已確定目前兩個變數所存的參照是相同的：

~~~ruby
annie_say.object_id => 70148984524720  
linda_say.object_id => 70148984524720  
~~~

接下來，運用`linda_say`的參照來修改對應到的物件

~~~ruby
linda_say[0,5] = "Hi,hi"  
  
print annie_say  
=> "Hi,hi, ruby!"  
# 被指向的物件已經因上一行而被改過了  
# 因此印出annie_say時自然將被改過後的字串印出  
~~~

現在新建立了一個物件，並把指向此物見的參照存到`linda_say`中

~~~ruby
linda_say = "Hello, Annie!"  
~~~

檢查一下linda_say所存的物件參照是否相同：

~~~ruby
linda_say.object_id => 70148979897180  
# 確實所存的參照位置已不相同  
~~~

最後印出的結果：

~~~ruby
print annie_say + " " + linda_say  
=> "Hi,hi, ruby! Hello, Annie!"  
~~~

##物件的壽命

我們如果要建立類別的實體，我們會用`.new`這個類別的方法來完成，例如：

~~~ruby
s = String.new  
a = Array.new  
h = Hash.new  
~~~

以上的`.new`都會配置記憶體來保存新建立的物件，然後初始設定都會為空物件的狀態。

~~~ruby
s => ""  
a => []  
h => {}  
~~~

透過`.new`，一個物件就這樣誕生惹，那什麼時候會往生呢？

>『Ruby有採用一個稱為垃圾收集(garbage collection)的技術，此技術會自動銷毀不再需要的物件。當一個物件不再被觸及(已無任何參照指向該物件)時，它會成為垃圾收集的對象。』

喔喔，原來愛情中不被愛的才是第三者(大誤)，不是啦，當一個物件沒有被任何參照指向時，就會變成垃圾，只是變成垃圾的過程還不是很了解，這部分有機會再深入了解囉！

##物件的識別碼

其實這個小節我們已經常常使用，就是物件的`.object_id`，物件的識別碼在他活著的時候是俱有唯一性的，所以我們經常用這個來檢查兩物件是否為同一物件。

ok，物件這個章節還有很多部分還沒提，明後幾天再娓娓道來，這個部分書中說明的有點深，都要一直查資料，還有自己透過`irb`來理解，所以可能移次只能提到幾個點，還望大家多多包含！

---

15天，鐵人賽過一半了呢！看到好多大大們都完成30天成就，真是太厲害了！

> “Success is the ability to go from failure to failure without losing your enthusiasm.” Winston Churchill

今天想到這句話，是因為在理解書中物件的說明時有點吃力，但還是覺得蠻好玩的，希望可以繼續保持熱情！ＧＯＧＯ！
