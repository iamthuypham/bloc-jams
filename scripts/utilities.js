function forEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};

function callbackRevealPoint(e) {
  e.style.opacity = 1;
  e.style.transform = "scaleX(1) translateY(0)";
  e.style.msTransform = "scaleX(1) translateY(0)";
  e.style.WebkitTransform = "scaleX(1) translateY(0)";
};

