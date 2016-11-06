// Example Album
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [{
    title: 'Blue',
    duration: '4:26'
  }, {
    title: 'Green',
    duration: '3:14'
  }, {
    title: 'Red',
    duration: '5:01'
  }, {
    title: 'Pink',
    duration: '3:21'
  }, {
    title: 'Magenta',
    duration: '2:15'
  }]
};

// Another Example Album
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [{
    title: 'Hello, Operator?',
    duration: '1:01'
  }, {
    title: 'Ring, ring, ring',
    duration: '5:01'
  }, {
    title: 'Fits in your pocket',
    duration: '3:21'
  }, {
    title: 'Can you hear me now?',
    duration: '3:14'
  }, {
    title: 'Wrong phone number',
    duration: '2:15'
  }]
};
//Album View template
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">' +
    ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
    '  <td class="song-item-title">' + songName + '</td>' +
    '  <td class="song-item-duration">' + songLength + '</td>' +
    '</tr>';

  return template;
};

var setCurrentAlbum = function(album) {
  //Get album element
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

  //Assign album information
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  //Clean album view first
  albumSongList.innerHTML = '';

  //Then loop through each song of an album
  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//Album Button Play
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  songListContainer.addEventListener('mouseover', function(event) {
    // Targeting the song that mouse pointing
    if (event.target.parentElement.className === 'album-view-song-item') {
      // Change the content from the number to the play button's HTML
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;

    }
  });
  //Loop through each row to detect the song mouse leaving
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      // Revert the content back to the number
      // Selects first child element, which is the song-item-number element
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
    });
  }
};