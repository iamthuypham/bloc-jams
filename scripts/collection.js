var collectionItemTemplate =
  '<div class="collection-album-container column fourth">' +
  '  <img src="assets/images/album_covers/01.png"/>' +
  '  <div class="collection-album-info caption">' +
  '    <p>' +
  '      <a class="album-name" href="/album.html"> The Colors </a>' +
  '      <br/>' +
  '      <a href="/album.html"> Pablo Picasso </a>' +
  '      <br/>' +
  '      X songs' +
  '      <br/>' +
  '    </p>' +
  '  </div>' +
  '</div>';

window.onload = function() {
  // Select the whole section album covers
  var collectionContainer = document.getElementsByClassName('album-covers')[0];
  // Clean the container first
  collectionContainer.innerHTML = '';

  // Then display the template for each of 13 albums
  for (var i = 0; i < 12; i++) {
    collectionContainer.innerHTML += collectionItemTemplate;
  }
}