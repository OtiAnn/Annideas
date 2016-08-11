//= require_tree .

var titleControl = function(){
  var sentence = [
      "有些事情還不做 你的理由 會是什麼？",
      "火箭發射，轟隆隆隆～",
      "再吃一顆蘋果。",
      "我不轉彎 我不轉彎 我不轉彎 我不轉彎",
      "嗯嗯 搭啦 我又 忘了",
      "嗯嗯 搭拉 想起 來了",
      "我不是頭腦空空",
      "我不是一隻米蟲",
      "你說那 C 和弦就是 Do Mi So"
    ];
  var randomSelect = Math.floor(Math.random() * sentence.length);

  $('.title_block .desc').text(sentence[randomSelect]);
}


$().ready(function(){
  titleControl();
});