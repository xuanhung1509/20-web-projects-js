// UI Elements
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');

// Play/Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  } else {
    video.pause();
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  }
}

// Update Control Progress
function updateControlProgress() {
  // Update Progress Bar
  progress.value = ( video.currentTime / video.duration ) * 100;

  // Update Time Stamp
  let mins;
  mins = Math.floor( video.currentTime / 60 );
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let secs;
  secs = Math.floor( video.currentTime % 60 );
  if (secs < 10) {
    secs = `0${secs}`;
  }

  timeStamp.innerHTML = `${mins}:${secs}`;
}

// Update Video Progress
function updateVideoProgress() {
  video.currentTime = ( +progress.value / 100 ) * video.duration;
}

// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
  play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
video.addEventListener('timeupdate', updateControlProgress);
progress.addEventListener('change', updateVideoProgress);

