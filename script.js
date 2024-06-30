console.log("Hey, this is spotify clone :)");

let songIndex = 0;
let PlayButton = document.getElementById('play-button');
let PlayBarTab = document.getElementById('bottomplaybarcont');
let ProgressBar = document.getElementById('progressbar');
let PlaybarCover = document.getElementById('playbar-cover-img');
let PlaySongName = document.getElementById('play-song-name');
let PlaySongDesc = document.getElementById('play-song-desc');
let songItems = Array.from(document.getElementsByClassName('songitem'));


let currentSong = new Audio();


PlayBarTab.style.opacity = "0";

document.querySelectorAll(".playlist-card-containor").forEach(e=>{
    e.addEventListener("click",()=>{
        console.log(e.querySelector(".card-title").innerHTML);
        playMusic(e.querySelector(".card-title").innerHTML,e.querySelector(".card-desc").innerHTML);
     });
     
});

function SecondsToMinSecFormat(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMin = String(minutes).padStart(2,'0');
    const formattedSec = String(remainingSeconds).padStart(2,'0');
    return `${formattedMin}:${formattedSec}`;
}

function playMusic(songName,artistName){

  PlayBarTab.style.opacity = "1";

  let songPath = `./songs/${songName}.mp3`;
  console.log(songPath)
  currentSong.src = songPath;
  currentSong.play();
  PlayButton.src = "./img/pause.png";

  document.getElementById("play-song-name").innerHTML = songName;
  document.getElementById("play-song-desc").innerHTML = artistName;
  document.getElementById("playbar-cover-img").src = `./img/cover/${songName}.jpg`;



  PlayButton.addEventListener('click',()=>{
    if(currentSong.paused){
        currentSong.play();
        PlayButton.src = "./img/pause.png"; 

    }
    else{
        currentSong.pause();
        PlayButton.src = "./img/play.png";
    }
});

//listens for timeupdate, when currentime of media changes
 currentSong.addEventListener("timeupdate",()=>{
    document.querySelector(".total-time").innerHTML = SecondsToMinSecFormat(currentSong.duration); 
    document.querySelector(".current-time").innerHTML = SecondsToMinSecFormat(currentSong.currentTime);    
    
    document.querySelector(".bar").value = (currentSong.currentTime/currentSong.duration);

    let progress = parseInt((currentSong.currentTime / currentSong.duration) * 100);
    ProgressBar.value = progress;

    //seek
    ProgressBar.addEventListener("click",()=>{
        let seekTime = ProgressBar.value;
        console.log(seekTime)
        if (seekTime >= 0 && seekTime <= currentSong.duration) {
            currentSong.currentTime = seekTime*(currentSong.duration/100);
        }
    });
    ProgressBar.addEventListener("change",()=>{
        let seekTime = ProgressBar.value;
        console.log(seekTime)
        if (seekTime >= 0 && seekTime <= currentSong.duration) {
            currentSong.currentTime = seekTime*(currentSong.duration/100);
        }
    });
    
 });

}


//making functionality of hamburger icon for responsiveness in mobile phones.


document.getElementById("hamburgericon").addEventListener("click",()=>{

    let sideBar = document.querySelector(".leftbox");
     
    sideBar.style.left = "0";

    document.getElementById("sidebarclosebutton").style.display = "flex";

    document.querySelector(".signinbutton").style.display = "none";
    document.querySelector(".loginbutton").style.display = "none";

    document.getElementById("sidebarclosebutton").addEventListener("click",()=>{
        sideBar.style.left = "-100%";
        document.getElementById("sidebarclosebutton").style.display = "none";
        document.querySelector(".signinbutton").style.display = "flex";
        document.querySelector(".loginbutton").style.display = "flex";
    });

    document.querySelector(".playlists").addEventListener("click",()=>{
        sideBar.style.left = "-100%";
        document.getElementById("sidebarclosebutton").style.display = "none";
        document.querySelector(".signinbutton").style.display = "flex";
        document.querySelector(".loginbutton").style.display = "flex";
    });

    
});
    













