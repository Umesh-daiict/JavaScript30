const vidoeElement = document.querySelector("video");
const playBtn = document.querySelector(".toggle");
const volumeSlider = document.querySelector(".player__slider[name=volume]");
const speedSlider = document.querySelector(
  ".player__slider[name=playbackRate]"
);
const skipBtn = document.querySelectorAll(".player__button[data-skip]");
const progress = document.querySelector(".progress__filled");
const progressCon = document.querySelector(".progress");

// event listener
vidoeElement.addEventListener("click",handlePlayVidoe)
playBtn.addEventListener("click", handlePlayVidoe);
volumeSlider.addEventListener("change", handleVidoeVolume);
speedSlider.addEventListener("change", handleVidoeSpeed);
skipBtn.forEach((btn) => btn.addEventListener("click", handleSkip));
vidoeElement.addEventListener("pause", handleVideoChange);
vidoeElement.addEventListener("play", handleVideoChange);

let dragOn = false;
progressCon.addEventListener("click", gotoTime);
progressCon.addEventListener("mousemove", (e) => dragOn && gotoTime(e));
progressCon.addEventListener("mousedown", () => (dragOn = true));
progressCon.addEventListener("mouseup", () => (dragOn = false));

vidoeElement.addEventListener("timeupdate", function () {
  const percentage = (vidoeElement.currentTime / vidoeElement.duration) * 100;
  progress.style.flexBasis = percentage + "%";
});

// function handler

function handleVideoChange() {
  if (this.paused) {
      playBtn.innerHTML = "▶";
    } else {
      playBtn.innerHTML = "❚❚";
  }
}
function handleSkip(e) {
  if (Number.isFinite(+this.dataset.skip)) {
    vidoeElement.currentTime += Number(this.dataset.skip);
  }
}

function handleVidoeVolume(e) {
  if (e.target.value <= 1 && e.target.value >= 0) {
    vidoeElement.volume = e.target.value;
  }
}

function handleVidoeSpeed(e) {
  if (e.target.value <= 2 && e.target.value >= 0) {
    vidoeElement.playbackRate = e.target.value;
  }
}

function handlePlayVidoe(e) {
   if (vidoeElement.paused) {
    vidoeElement.play();
  } else {
    vidoeElement.pause();
  }
}

function gotoTime(e) {
  const rect = progressCon.getBoundingClientRect();
  const position = e.clientX - rect.left;
  const percentage = (position / rect.width) * 100;

  vidoeElement.currentTime = (vidoeElement.duration * percentage) / 100;
}
