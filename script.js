console.log('JAVASCRIPT');

let currentSong= new Audio();
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

const playMusic = (track)=>{
  currentSong.src = "/songs/" + track
   currentSong.play()
   play.src = "pause.svg"
   document.querySelector(".songinfo").innerHTML = track
   document.querySelector(".songtime").innerHTML = "00.00 / 00.00"
}


async function main(){
let currentSong= new Audio();


//list of all songs
let songs = await getSongs()

//show songs in the playlist
let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML += `<li><img class="invert" width="34" src="music.svg" alt="">
                <div class="info">
                    <div class="songName">${song.replaceAll("%20"," ")}</div>
                    <div class="songartist"> change </div>
                 </div>
                 <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="play.svg" alt="" >
                 </div></li>`;
}

//attach an event listner 
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
   e.addEventListener("click", element=>{
   console.log(e.querySelector(".info").firstElementChild.innerHTML)
   playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    
})
})
//attach an event listener to play, next, previous
play.addEventListener("click", ()=>{
   if(currentSong.paused) {
    currentSong.play()
   }
   else{
      currentSong.pause()
   }
  
})


}
main()