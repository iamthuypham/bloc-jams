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

  return $(template);
};

var setCurrentAlbum = function(album) {
  //Get album element
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  //Assign album information
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  //Clean album view first
  $albumSongList.empty();

  //Then loop through each song of an album
  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//Album Button Play
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  songListContainer.addEventListener('mouseover', function(event) {
    // Targeting the song that mouse pointing
    if (event.target.parentElement.className === 'album-view-song-item') {
      // Change the content from the number to the play button's HTML
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
    // var playButton = event.target.parentElement.querySelector('.ion-play');

    // playButton.addEventListener('click', pauseButton)

    // function pauseButton(state) {
    //   console.log(state.target.className)
    //   if (state.target.className === 'ion-play') {
    //     state.target.className = 'ion-pause'
    //   }
    // }
  });
  //findParentByClassName - used to return song item
  var findParentByClassName = function(element, targetClass) {
    if (element) {
      var currentParent = element.parentElement;
      while (currentParent.className != targetClass && currentParent.className !== null) {
        currentParent = currentParent.parentElement;
      }
      return currentParent;
    }
  };

  //getSongItem 
  var getSongItem = function(element) {
    switch (element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
        return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
        return element.querySelector('.song-item-number');
      case 'song-item-title':
      case 'song-item-duration':
        return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      case 'song-item-number':
        return element;
      default:
        return;
    }
  };
  //clickHanler
  var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    //display Pause when first time click
    if (currentlyPlayingSong === null) {
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
    //display Play when click on active song
    else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;
    }
    //when song1 is active, click on song2, an inactive song
    //active song1 turns to inactive, display song number
    //inactive song2 turns to active, display Pause button
    else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
  };

  //Loop through each row to detect mouse position
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      //get the song the mouse just leave
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      //if this song is currently active, when mouse leave, it should stay active, at Pause button. Another words, if this song is currently inactive, when mouse leave, it should back to song number
      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      }
    });
    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target)
    });
  }
};
