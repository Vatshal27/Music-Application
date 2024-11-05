console.log('JAVASCRIPT');

let currentSong= new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
   if (isNaN(seconds) || seconds < 0) {
      return "00:00 ";
   }
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);

   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
   
   return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs() {
     let a = await fetch("http://127.0.0.1:5500/songs/")
     let response = await a.text();
     console.log(response)
     let div = document.createElement("div")
     div.innerHTML= response;
     let as = div.getElementsByTagName("a")
     let songs = []
     for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href. split("/songs/")[1])
        }
        
     }
     return songs
}                                                                                            

const playMusic = (track, pause=false) => {
  currentSong.src = "/songs/" + track
  if(!pause){
    currentSong.play()
     play.src = "pause.svg"
  }

      document.querySelector(".songinfo").innerHTML = decodeURI(track)
   document.querySelector(".songtime").innerHTML = "00.00 / 00.00"

}

                                                
async function main(){


              
//list of all songs
 songs = await getSongs()
 playMusic(songs[0], true)

//show songs in the playlist
let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="music.svg" alt="">
                <div class="info">
                    <div class="songName">${song.replaceAll("%20"," ")}</div>
                    <div class="songartist"> change </div>
                 </div>
                 <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="play.svg" alt="" >
                 </div> </li>`;
}

//attach an event listner 
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
   e.addEventListener("click", element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
     playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    
   })
})

//attach an event listener to play, next, previous
play.addEventListener("click", () => {
   if(currentSong.paused) {
    currentSong.play()
      play.src = "pause.svg"
   } 
   else{
      currentSong.pause()
      play.src = "play.svg"
   }
  
})
//timeupdate
currentSong.addEventListener("timeupdate", ()=> {
   console.log(currentSong.currentTime, currentSong.duration);
   document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/
   ${secondsToMinutesSeconds(currentSong.duration)}`
   document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.
      duration) *100 + "%";
})
 
//add an eventlistener to seekbar
 document.querySelector(".seekbar").addEventListener("click", e=>{
   let precent = (e.offsetX/e.target.getBoundingClientRect().width)*100 
 document.querySelector(".circle").style.left = precent + "%";
 currentSong.currentTime = ((currentSong.duration)*precent) / 100
 })

 //add an eventlis
 // Open the sidebar when clicking the hamburger
document.querySelector(".hamburger").addEventListener("click", () => {
   document.querySelector(".left").style.left = "0%";
});

// Close the sidebar when clicking the hamburger again (toggle functionality)
document.querySelector(".hamburger").addEventListener("dblclick", () => {
   document.querySelector(".left").style.left = "-120%";
});

//add event listner yo prev next
previous.addEventListener("click", ()=>{
console.log("Prev clicked")
console.log(currentSong)

let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
if((index-1) >= 0)
playMusic(songs[index-1])
 })

//event listener of next
next.addEventListener("click", ()=>{
   currentSong.pause()
   console.log("Next clicked")
   let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

   if((index+1) < songs.length)
playMusic(songs[index+1])

})


//add event to vol
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
   console. log("Setting volume to ", e, e.target, e.target.value, "/ 100")
   currentSong.volume = parseInt(e.target.value) / 100
})

}
main()