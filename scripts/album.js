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
    var songNumber = parseInt($(this).attr('data-song-number'));
    //display Pause when first time click
    if (currentlyPlayingSongNumber === null) {
      $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      currentSoundFile.play();
      updateSeekBarWhileSongPlays();
      updatePlayerBarSong();
    }
    //display Play when click on active song
    else if (currentlyPlayingSongNumber === songNumber) {

      // currentlyPlayingSongNumber = null;
      // currentSongFromAlbum = null;
      if (currentSoundFile.isPaused()) {
        $(this).html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
      }
      else {
        $(this).html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
      }
    }
    //when song1 is active, click on song2, an inactive song
    //active song1 turns to inactive, display song number
    //inactive song2 turns to active, display Pause button
    else if (currentlyPlayingSongNumber !== songNumber) {
      var currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingSongElement.html(currentlyPlayingSongNumber);

      var $volumeFill = $('.volume .fill');
      var $volumeThumb = $('.volume .thumb');
      $volumeFill.width(currentVolume + '%');
      $volumeThumb.css({
        left: currentVolume + '%'
      });

      $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      currentSoundFile.play();
      updateSeekBarWhileSongPlays();
      updatePlayerBarSong();
    }

  };
  var onHover = function(event) {
    // Change the content from the number to the play button's HTML
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  }
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    //if this song is currently active, when mouse leave, it should stay active, at Pause button. Another words, if this song is currently inactive, when mouse leave, it should back to song number
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
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

var setSong = function(songNumber) {
    if (currentSoundFile) {
      currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
      formats: ['mp3'],
      preload: true
    });
    setVolume(currentVolume);
  }
  //Set Player to play song at specific time
var seek = function(time) {
  if (currentSoundFile) {
    currentSoundFile.setTime(time);
  }
}

var setVolume = function(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
};

//Function: tracking current playing song
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var nextSong = function() {
  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  // Note that we're _incrementing_ the song here
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  // Set a new current song
  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  updateSeekBarWhileSongPlays();

  // Update the Player Bar information
  updatePlayerBarSong()

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber)
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);


};
//Previous song
var previousSong = function() {
  var getLastSongNumber = function(index) {
    return index == currentAlbum.songs.length ? 1 : index + 1;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  // Note that we're _incrementing_ the song here
  currentSongIndex--;

  if (currentSongIndex <= -1) {
    currentSongIndex = currentAlbum.songs.length - 1;
  }

  // Set a new current song
  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  updateSeekBarWhileSongPlays();

  // Update the Player Bar information
  updatePlayerBarSong()

  var lastSongNumber = getLastSongNumber(currentlyPlayingSongNumber);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);


};
var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]')
}

//Sycn Pause button on album list and play controll bar
var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);

};

//Play Pause in control bar sync up with song status
var togglePlayFromPlayerBar = function() {
    if (currentSoundFile.isPaused()) {
      getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPauseButton);
      currentSoundFile.play();
    }
    else {
      getSongNumberCell(currentlyPlayingSongNumber).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      currentSoundFile.pause();
    }
  }
  //Make the .thumb moving following song progress
var updateSeekBarWhileSongPlays = function() {
  if (currentSoundFile) {
    //Binding the current time for current playing song
    currentSoundFile.bind('timeupdate', function(event) {
      //Current time of a song - Total time of a song
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');

      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
  }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100;
  //Set min max limit for offsetXPercent
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  //Convert to percentage and set .fill width and position of thumb
  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({
    left: percentageString
  });
};

var setupSeekBars = function() {
  var $seekBars = $('.player-bar .seek-bar');
  //1. For 1 click on Player Bar
  $seekBars.click(function(event) {
    //Find horizontal pageX of the clicked position
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();
    //Find ratio of clicked position to the whole bar
    var seekBarFillRatio = offsetX / barWidth;
    //If user clicks on player bar, update the new time for a song
    if ($(this).parent().attr('class') == 'seek-control') {
      seek(seekBarFillRatio * currentSoundFile.getDuration());
    }
    else { //If user clicks on volume bar, update the new volume level
      setVolume(seekBarFillRatio * 100);
    }
    //Update the .fill and .thumb with current ratio
    updateSeekPercentage($(this), seekBarFillRatio);
  });
  //2. For dragging on Player Bar
  $seekBars.find('.thumb').mousedown(function(event) {
    var $seekBar = $(this).parent();

    //Bind mousemove event on document so that when dragging .thumb out of player bar, it is still in scope
    $(document).bind('mousemove.thumb', function(event) {
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;
      //If user drag .thumb on player bar, update the new time for a song
      if ($seekBar.parent().attr('class') == 'seek-control') {
        seek(seekBarFillRatio * currentSoundFile.getDuration());
      }
      else { //If user drags .thumb on volume bar, update the new volume level
        setVolume(seekBarFillRatio * 100);
      }
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
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
var currentSoundFile = null;
var currentVolume = 80;

var $nextButton = $('.main-controls .next');
var $previousButton = $('.main-controls .previous');
var $ppButton = $('.main-controls .play-pause')

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  setupSeekBars();
  $nextButton.click(nextSong);
  $previousButton.click(previousSong);
  $ppButton.click(togglePlayFromPlayerBar)
});
