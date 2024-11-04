const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'muzyka/Everlong.mp3',
        displayName: 'Everlong',
        cover: 'muzyka/Everlong.png',
        artist: 'Foo Fighters',
    },
    {
        path: 'muzyka/Youngest Daughter.mp3',
        displayName: 'Youngest Daughter',
        cover: 'muzyka/Youngest Daughter.png',
        artist: 'Superheaven',
    },
    {
        path: 'muzyka/Would.mp3',
        displayName: 'Would?',
        cover: 'muzyka/Would.png',
        artist: 'Alice in Chains',
    },
    {
        path: 'muzyka/Be Quiet And Drive.mp3',
        displayName: 'Be Quiet And Drive',
        cover: 'muzyka/Be Quiet And Drive.png',
        artist: 'Deftones',
    },
    {
        path: 'muzyka/Open Your Eyes.mp3',
        displayName: 'Open Your Eyes',
        cover: 'muzyka/Open Your Eyes.png',
        artist: 'Guano Apes',
    },
    {
        path: 'muzyka/Even Flow.mp3',
        displayName: 'Even Flow',
        cover: 'muzyka/Even Flow.png',
        artist: 'Pearl Jam',
    },
    {
        path: 'muzyka/The Pretender.mp3',
        displayName: 'The Pretender',
        cover: 'muzyka/The Pretender.png',
        artist: 'Foo Fighters',
    },
      {
        path: 'muzyka/CANT STOP.mp3',
        displayName: 'CANT STOP',
        cover: 'muzyka/CANT STOP.png',
        artist: 'Red Hot Chili Pepers',
    },
     {
        path: 'muzyka/Learn To Fly.mp3',
        displayName: 'Learn To Fly',
        cover: 'muzyka/Learn To Fly.png',
        artist: 'Foo Fighters',
    },
    {
        path: 'muzyka/Self Esteem.mp3',
        displayName: 'Self Esteem',
        cover: 'muzyka/Self Esteem.png',
        artist: 'The Offspring',
    },
    {
        path: 'muzyka/Song 2.mp3',
        displayName: 'Song 2',
        cover: 'muzyka/Song 2.png',
        artist: 'Blur',
    },
    {
        path: 'muzyka/My hero.mp3',
        displayName: 'My hero',
        cover: 'muzyka/My hero.png',
        artist: 'Foo Fighters',
    },
    {
        path: 'muzyka/Man In the Box.mp3',
        displayName: 'Man In the Box',
        cover: 'muzyka/Man In the Box.png',
        artist: 'Alice In Chains',
    },
    
    
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');
   
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
  
    playBtn.classList.replace('fa-pause', 'fa-play');
   
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
