lightGallery(document.querySelector(".gallery"));

$(window).scroll(function () {
  let windowScroll = $(this).scrollTop();

  $('.jumbotron h1').css({
    'transform': 'translate(0px, ' + windowScroll + '%)'
  });
  $('.jumbotron p').css({
    'transform': 'translate(0px, ' + windowScroll / 1.5 + '%)'
  });
});