/* Progressive enhancement : Use custom controls if JS is correctly loaded */

const controls = document.getElementById("controls");
video.removeAttribute("controls");
controls.style.visibility = "visible";

/* Video controls */
const rewindButton = document.getElementById("rewind");
const playButton = document.getElementById("play");
const muteButton = document.getElementById("mute");
const volumeInput = document.getElementById("volume");
const currentTime = document.getElementById("current");
const duration = document.getElementById("duration");
const timeBar = document.getElementById("timeBar");
const forFive = document.getElementById("forFive");
const favFive = document.getElementById("favFive");

/* !!! Magic happens... !!! */
playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.innerText = "pause";
  } else {
    video.pause();
    playButton.innerText = "play";
  }
});
rewindButton.addEventListener("click", () => {
  video.currentTime = 0;
});
forFive.addEventListener("dblclick", () => {
  video.currentTime = video.currentTime - 5;
  forFive.classList.add("active");
  setTimeout(() => {
    forFive.classList.remove("active");
  }, 500);
});
favFive.addEventListener("dblclick", () => {
  video.currentTime = video.currentTime + 5;
  favFive.classList.add("active");
  setTimeout(() => {
    favFive.classList.remove("active");
  }, 500);
});
muteButton.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    muteButton.innerText = "mute";
  } else {
    video.muted = true;
    muteButton.innerText = "unmute";
  }
});
volumeInput.addEventListener("input", (event) => {
  video.volume = event.target.value;
});
timeBar.addEventListener("input", (event) => {
  video.currentTime = event.target.value;
});
video.addEventListener("timeupdate", () => {
  currentTime.textContent = getFormatedTime(video.currentTime);
  timeBar.value = video.currentTime;
});
function defaultVideoLoading() {
  duration.textContent = getFormatedTime(video.duration);
  video.muted = true;
  timeBar.max = video.duration;
}
defaultVideoLoading();
function getFormatedTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (seconds < 10) {
    return minutes + ":0" + seconds;
  }
  return minutes + ":" + seconds;
}
/* Play the video if it is in viewport, otherwise pause the video */
function playPauseVideo() {
  /* It is nicer to our users to have the video muted by default */

  video.play();

  const playPromise = video.play();

  if (playPromise) {
    playPromise.then((_) => {
      /* !!! Magic happens... !!! */
    });
  }
}

playPauseVideo();
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        playPauseVideo();
      } else {
        video.pause();
      }
    });
  },
  { threshold: 0.5 }
);
observer.observe(video);
