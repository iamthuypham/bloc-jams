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
var albumZimmers = {
  title: 'Batman vs Superman: Dawn Of Justice',
  artist: 'Hans Zimmer & Junkie XL',
  label: 'BATMAN V SUPERMAN: DAWN OF JUSTICE - THE SOUNDTRACK',
  year: '2016',
  albumArtUrl: 'http://ii.wbshop.com/fcgi-bin/iipsrv.fcgi?FIF=/images/warnerbros/source/warnerbros/bvswtmst02.tif&wid=3000&cvt=jpeg',
  songs: [{
    title: 'Beautiful Lie',
    duration: '3:48'
  }, {
    title: 'Do You Bleed?',
    duration: '4:36'
  }, {
    title: 'Black and Blue',
    duration: '8:31'
  }, {
    title: 'Is She With You?',
    duration: '5:47'
  }, {
    title: 'This Is My World',
    duration: '6:24'
  }]
};
//Album View template
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">' +
    '  <td class="song-item-number">' + songNumber + '</td>' +
    '  <td class="song-item-title">' + songName + '</td>' +
    '  <td class="song-item-duration">' + songLength + '</td>' +
    '</tr>';

  return template;
};
var albumList = [albumPicasso, albumMarconi, albumZimmers];

//Get album element
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

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
  
window.onload = function() {
  setCurrentAlbum(albumPicasso);
  var i = 0;
  albumImage.addEventListener('click',function(){
    setCurrentAlbum(albumList[i]);  
    i++;
  });
};