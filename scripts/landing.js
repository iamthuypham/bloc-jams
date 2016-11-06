var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
  //Function to reveal each elements of sellingpoint
  forEach(points, callbackRevealPoint);
};
//Event handler executes when browser has loaded
window.onload = function() {
  //Immediately load animation for device with tall screen
  if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
  //Otherwise load animation based on scrolling event
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
  window.addEventListener('scroll', function(event) {
     if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
         animatePoints(pointsArray);   
     }
  });
}