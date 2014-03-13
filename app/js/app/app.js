$(function () {
  
  $body = $('body');

  $('.exp-panel-title').click(function () {

    if( $body.width() > 766 ) {
      return;
    }

    var $panel, $content;

    $panel = $(this).parent();
    $content = $panel.find('.exp-panel-content');

    if( $content.is(':visible') ) {
      $content.slideUp();
    } else {
      $content.slideDown();
    }

  });

  $(window).resize(function (e) {

    if( $body.width() > 766 ) {
      $('.exp-panel-content').show();
    }

  });

});