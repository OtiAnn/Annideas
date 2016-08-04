var showMenu = function(){
  $('.hide').removeClass('hide').addClass('show');
  $('body').addClass('stop-scrolling');
  //for mobile
  $('body').bind('touchmove', function(e){e.preventDefault()});
  $( "nav" ).animate({ "right": "0px" }, 1, "linear");
}

var hideMenu = function(){
  function hide(){
    $('.show').removeClass('show').addClass('hide');
  }
  $('body').removeClass('stop-scrolling');
  //for mobile
  $('body').unbind('touchmove');
  $( "nav" ).animate({ "right": "-300px" }, 1, "linear");
  setTimeout(hide, 200);
}

var menuControl = function(){
  $('.show_menu').click(function(){
    showMenu();
  });
  $('.hide_menu').click(function(){
    hideMenu();
  });
}

$().ready(function(){
  menuControl();
});
