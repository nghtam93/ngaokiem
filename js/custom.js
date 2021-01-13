$(document).ready(function(){

  $(".main").onepage_scroll({
    sectionContainer: "section",
    responsiveFallback: 600,
    loop: true
  });

  $(".selected").hover(function () {
      var hoverImg = HoverImgOf($(this).attr("src"));
      $(this).attr("src", hoverImg);
  }, function () {
      var normalImg = NormalImgOf($(this).attr("src"));
      $(this).attr("src", normalImg);
  });



  $('.video-close').click(function() {
    $('.video-bg').fadeOut();
    $('#video_popup-youtube-player').attr('src','');
  });

  $('.pop-giftcode .close-giftcode a').click(function(){
    $('#hidpopup').fadeOut();
    $(".pop-giftcode").fadeOut();
  });

  $('.pop-giftcode ul li a').click(function(){
    $('.pop-giftcode ul').hide();
    $('.pop-giftcode p').fadeIn();
  });

  $('.start a,.start-two a').click(function(){
    $('#hidpopup').fadeIn();
    $(".pop-login").fadeIn();
  });
  $('.login-menu li').click(function(){
    $items = $(this).index() + 1;
    $('.login-menu li').removeClass('active');
    $('.login-menu li:nth-child('+$items+')').addClass('active');
    $('.login-box .tab').removeClass('active');
    $('.login-box .tab:nth-child('+$items+')').addClass('active');
  });
  $('.pop-login-close a').click(function(){
    $('#hidpopup').fadeOut();
    $(".pop-login").fadeOut();
  });



  /* Page 1 */



  /* End Page 1 */



  /* Page 2 */

  setInterval(function(){
    if($(".page2").hasClass("active")){
     var $liActive = $('.nv-menu a.active').index() + 1;
     var $liLength = $('.nv-menu a').length;
     var $liMax = $('.nv-menu a.active:last-child()').index() + 1;
     $('.nv-menu a').removeClass('active');
     if($liLength === $liMax) {
       $('.nv-menu a:first-child()').addClass('active');
       $('.nv-menu a:first-child()').trigger('click');
     }else {
       $('.nv-menu a:nth-child('+$liActive+')').next().addClass('active');
       $('.nv-menu a:nth-child('+$liActive+')').next().trigger('click');
     }
   }
 }, 6000);

  $('.nv-menu a').click(function() {
    $items = $(this).index() + 1;
    $('.figure-tab .tab,.nv-menu a').removeClass('active');
    $('.figure-tab .tab:nth-child('+$items+'),.nv-menu a:nth-child('+$items+')').addClass('active');
    $dataURL = $('.figure-tab .tab.active .figure-skill .figure-skill-video').attr('data-url');
    $videoURL = '<video loop autoplay><source src="'+$dataURL+'" type="video/mp4"></video>'
    $('.figure-tab .tab .figure-skill .figure-skill-video').empty();
    $('.figure-tab .tab.active .figure-skill .figure-skill-video').append($videoURL);
  });

  $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
    if($(".page2").hasClass("active")){
      $dataURL = $('.figure-tab .tab.active .figure-skill .figure-skill-video').attr('data-url');
      $videoURL = '<video loop autoplay><source src="'+$dataURL+'" type="video/mp4"></video>'
      $('.figure-tab .tab .figure-skill .figure-skill-video').empty();
      $('.figure-tab .tab.active .figure-skill .figure-skill-video').append($videoURL);
    } else {
      $('.figure-tab .tab .figure-skill .figure-skill-video').empty();
    }
  });

  $('.onepage-pagination li a').attr('href','javascript:void(0);');

  $('.onepage-pagination li:nth-child(2) a').click(function() {
    if($(".page2").hasClass("active")){
      $dataURL = $('.figure-tab .tab.active .figure-skill .figure-skill-video').attr('data-url');
      $videoURL = '<video loop autoplay><source src="'+$dataURL+'" type="video/mp4"></video>'
      $('.figure-tab .tab .figure-skill .figure-skill-video').empty();
      $('.figure-tab .tab.active .figure-skill .figure-skill-video').append($videoURL);
    } else {
      $('.figure-tab .tab .figure-skill .figure-skill-video').empty();
    }
  });


  /* End Page 2 */



  /* Page 3 */

  $('.pt-gif-all .pt_gif a').click(function() {
    $(this).parents().addClass('active');
    setTimeout(function(){
      $('#hidpopup').fadeIn();
      $(".pop-giftcode").fadeIn();
      $('.pop-giftcode ul li input').focus();
    }, 700);
  });



  /* End Page 3 */










});

function HoverImgOf(filename) {
    var re = new RegExp("(.+)\\.(gif|png|jpg)", "g");
    return filename.replace(re, "$1_hover.$2");
}
function NormalImgOf(filename) {
    var re = new RegExp("(.+)_hover\\.(gif|png|jpg)", "g");
    return filename.replace(re, "$1.$2");
}
function changetab(id) {
    document.getElementById("bleach_flogin").style.display = "none";
    document.getElementById("bleach_freg").style.display = "none";
    if (id != '') {
        document.getElementById(id).style.display = "block";
    }
}
