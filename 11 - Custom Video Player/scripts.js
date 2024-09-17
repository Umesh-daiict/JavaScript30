const vidoeElement =  document.querySelector("video")

const playBtn = document.querySelector(".toggle")

const volumeSlider = document.querySelector(".player__slider[name=volume]")
const speedSlider = document.querySelector(".player__slider[name=playbackRate]")

const skipBtn = document.querySelectorAll(".player__button[data-skip]")
const progress = document.querySelector(".progress__filled");
const progressCon  = document.querySelector(".progress");
 
console.log(skipBtn,"1")
console.log(speedSlider,"2")
console.log(volumeSlider,"3")
console.log(playBtn,"4")
console.log(vidoeElement,"5")

playBtn.addEventListener("click",handlePlayVidoe)
volumeSlider.addEventListener("change",handleVidoeVolume)
speedSlider.addEventListener("change",handleVidoeSpeed)
skipBtn.forEach(btn=>btn.addEventListener("click",handleSkip))

vidoeElement.addEventListener("timeupdate", function() {
    const percentage = (vidoeElement.currentTime / vidoeElement.duration) * 100;
    progress.style.flexBasis = percentage + "%";
  });
  

function handleSkip(e){
    if(Number.isFinite(+this.dataset.skip)){
        vidoeElement.currentTime += Number(this.dataset.skip) ; 
    }
}

function handleVidoeVolume(e){
    if(e.target.value<=1 && e.target.value >=0){
        vidoeElement.volume =e.target.value
    }
}


function handleVidoeSpeed(e){
    console.log("s",e.target.value)
    if(e.target.value<=2 && e.target.value >=0){
        vidoeElement.playbackRate =e.target.value
    }
}

let isPlay = false
function handlePlayVidoe(e){
    if(isPlay){
        vidoeElement.pause()
        playBtn.innerHTML = "▶"
    }else{
        vidoeElement.play()
        playBtn.innerHTML = "❚❚"

    }
    isPlay  = !isPlay
}

let dragOn = false
progressCon.addEventListener("click",gotoTime)
progressCon.addEventListener("mousemove",(e)=>dragOn&& gotoTime(e))
progressCon.addEventListener("mousedown",()=>dragOn=true)
progressCon.addEventListener("mouseup",()=>dragOn=false)


function gotoTime(e){
    const rect = progressCon.getBoundingClientRect();
    const position = e.clientX - rect.left; 
    const percentage = (position / rect.width) * 100;
  
    vidoeElement.currentTime = (vidoeElement.duration * percentage) / 100;   
}

