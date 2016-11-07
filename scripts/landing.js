var animatePoints = function() {
  //Function to reveal each elements of sellingpoint
  var revealPoint = function() {
    // #7
    $(this).css({
      opacity: 1,
      transform: 'scaleX(1) translateY(0)'
    });
  };
  $.each($('.point'), revealPoint);
};
//Event handler executes when browser has loaded
$(window).load(function() {
  //Immediately load animation for device with tall screen
  if ($(window).height() > 950) {
    animatePoints();
  }
  //Otherwise load animation based on scrolling event
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance) {
      animatePoints();
    }
  })
});
 