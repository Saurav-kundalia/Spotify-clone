/*
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    return songs;
}

async function main() {
    let songs = await getSongs();

    console.log(songs);

    // Play first song
    let audio = new Audio(songs[0]);
    audio.play();
}

main();
*/
let currentsong = new Audio();
const play = document.getElementById("play");
currentsong.volume = 0.5;
let audio;


async function getaudio() {
    let songs = [];

    songs.push("/song/808.mp3".split("/").pop());
    songs.push("/song/am i asking for too much.mp3".split("/").pop());
    songs.push("/song/external_volume.mp3".split("/").pop());
    songs.push("/song/PARTY PEOPLE.mp3".split("/").pop());
    songs.push("/song/sample-45s.mp3".split("/").pop());
    songs.push("/song/sample-speech-1m.mp3".split("/").pop());
    songs.push("/song/Top (prod.by Yellxw Mxtey).mp3".split("/").pop());

    return songs;
}

const playMusic = (track) => {
    currentsong.src = "/song/" + track
    currentsong.play()
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    audio = await getaudio();

    //let audio = new Audio("http://127.0.0.1:5500/song/");
    //audio.play();

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    for (const song of audio) {
        songul.innerHTML = songul.innerHTML + `<li> <img class="invert" src="img/music.svg" alt="playlist">
                            <div class="info">
                                <div>${song}</div>
                            </div>
                                <span>Play</span>
                                <img class="invert" src="img/play.svg" alt="play">
                            </li>`;
    }



    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log("Duration:", duration, "seconds:");
    // });


    //attach an eveent listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        });
    });

    //for play,next,prev button
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "img/pause.svg"
        } else {
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);

        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentsong.currentTime)}/
         ${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let seekbar = document.querySelector(".seekbar");

        let percent = (e.offsetX / seekbar.getBoundingClientRect().width) * 100;

        document.querySelector(".circle").style.left = percent + "%";

        currentsong.currentTime = (currentsong.duration * percent) / 100;
    });

    const hamburger = document.querySelector(".hamburger");
    const left = document.querySelector(".left");

    hamburger.addEventListener("click", () => {
        left.classList.toggle("active");
    });

    // hamburger.addEventListener("click",() =>{
    //     document.querySelector(".left").style.left = "0";
    // })


    previous.addEventListener("click", () => {

        let currentTrack = decodeURIComponent(currentsong.src.split("/").pop());

        let index = audio.indexOf(currentTrack);

        if (index > 0) {
            playMusic(audio[index - 1]);
        }
    });

    next.addEventListener("click", () => {

        let currentTrack = decodeURIComponent(currentsong.src.split("/").pop());

        let index = audio.indexOf(currentTrack);

        if (index < audio.length - 1) {
            playMusic(audio[index + 1]);
        }
    });



    volumeSlider.addEventListener("input", () => {

        currentsong.volume = volumeSlider.value;
    });

    volumeIcon.addEventListener("click", () => {

        if (currentsong.volume > 0) {
            currentsong.volume = 0;
            volumeSlider.value = 0;
        } else {
            currentsong.volume = 0.5;
            volumeSlider.value = 0.5;
        }

    });

}

getSongs();
