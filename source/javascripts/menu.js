var showMenu = function(){
  // ban scrolling event
  $('body').addClass('stop-scrolling');
  $('body').bind('touchmove', function(e){e.preventDefault()});

  $('nav').addClass('is-open')
  $('.mask').addClass('is-open')
}

var hideMenu = function(){
  // recover scrolling event
  $('body').removeClass('stop-scrolling');
  $('body').unbind('touchmove');

  $('nav').removeClass('is-open')
  $('.mask').removeClass('is-open')
}

var menuControl = function(){
  $('[data-show-menu]').click(function(){
    showMenu();
  });
  $('[data-hide-menu]').click(function(){
    hideMenu();
  });
}



$().ready(function(){
  menuControl();
});
