//Album View template
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">' +
    ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
    '  <td class="song-item-title">' + songName + '</td>' +
    '  <td class="song-item-duration">' + songLength + '</td>' +
    '</tr>';

  var $row = $(template);

  var clickHandler = function() {
    var songNumber = $(this).attr('data-song-number');
    //display Pause when first time click
    if (currentlyPlayingSongNumber === null) {
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSongNumber = songNumber;
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      updatePlayerBarSong();
    }
    //display Play when click on active song
    else if (currentlyPlayingSongNumber === songNumber) {
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
    }
    //when song1 is active, click on song2, an inactive song
    //active song1 turns to inactive, display song number
    //inactive song2 turns to active, display Pause button
    else if (currentlyPlayingSongNumber !== songNumber) {
      var currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      currentlyPlayingSongElement.html(currentlyPlayingSongElement);
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSongNumber = songNumber;
    }
  };

  var onHover = function(event) {
    // Change the content from the number to the play button's HTML
    var songNumber = $(this).find('.song-item-number');
    var songItemNumber = songNumber.attr('data-song-number');

    if (songItemNumber !== currentlyPlayingSongNumber) {
      songNumber.html(playButtonTemplate);
    }
  }


  var offHover = function(event) {
    var songNumber = $(this).find('.song-item-number');
    var songItemNumber = songNumber.attr('data-song-number');

    //if this song is currently active, when mouse leave, it should stay active, at Pause button. Another words, if this song is currently inactive, when mouse leave, it should back to song number
    if (songItemNumber !== currentlyPlayingSongNumber) {
      songNumber.html(songItemNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);

  $row.hover(onHover, offHover);

  return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album
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
//Function: tracking current playing song
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var previousSongIndex = null
var previousSongFromAlbum = null

var nextSong = function(album, song){
  var currentSongIndex = trackIndex(album,currentSongFromAlbum)
  previousSongIndex = currentSongIndex;
  var previousyPlayingSongElement = $('.song-item-number[data-song-number="' + previousSongIndex + 1 + '"]');
  if (currentSongIndex === album.songs.length - 1){
    currentSongIndex = 0;
  } else {
    currentSongIndex += 1
  }
  currentSongFromAlbum = album.songs[currentSongIndex];
  updatePlayerBarSong();
  currentlyPlayingSongNumber = currentSongIndex + 1;
  
  var songNumber = currentSongFromAlbum.find('.song-item-number');
  songNumber.html(pauseButtonTemplate)
  previousyPlayingSongElement = previousSongIndex + 1
  
};

//Sycn Pause button on album list and play controll bar
var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);

};

//Button Play in album list and in play control
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
});
