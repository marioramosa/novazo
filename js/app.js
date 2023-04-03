let audio = new Audio()
let tabTitle = document.querySelector('#tabTitle')
let main = document.querySelector('html')
let playBtn = document.getElementById('playBtn')
let prevBtn = document.getElementById('prevBtn')
let nextBtn = document.getElementById('nextBtn')
let nowTitle = document.getElementById('title')
let nowArtist = document.getElementById('artist')
let cover = document.getElementById('cover')
let trackNbr = document.getElementById('trackNbr')
let progress = document.getElementById('progressTime')
let currTime = document.getElementById('currTime')
let totalTime = document.getElementById('totalTime')
let volume = document.getElementById('volumeBar')

let songListPanel = document.querySelector('.list')
let listBtn = document.getElementById('listBtn')
let closeListBtn = document.getElementById('closeListBtn')
let randomBtn = document.getElementById('randomBtn')
let random = false

let repeatBtn = document.getElementById('repeatBtn')
let repeat = false

let songs = [
    {title:"Masoava", artist:"EVAN'S", src:"music/song1.mp3", cover:"images/song1.jpg"},
    {title:"Maria", artist:"LO RAZ ft RG", src:"music/song2.mp3", cover:"images/song2.jpg"},
    {title:"Feeling (2023)", artist:"LO RAZ ft ALAIN~BOY", src:"music/song3.mp3", cover:"images/song3.jpg"},
    {title:"Baby (By RAMS Prod)", artist:"LAOLLI", src:"music/song4.mp3", cover:"images/song4.jpg"},
    {title:"Masoandro (Prod by RAMS)", artist:"ELOVEA ft LO RAZ", src:"music/song5.mp3", cover:"images/song5.jpg"},
    {title:"Mifankatia", artist:"CLEM'S", src:"music/song6.mp3", cover:"images/song6.jpg"},
    {title:"Tsy Tagna (by RAMS Prod)", artist:"CLEM'S & LO RAZ ft EVAN'S ", src:"music/song7.mp3", cover:"images/song7.jpg"},
    {title:"Magniry Anao", artist:"CLEM'S", src:"music/song8.mp3", cover:"images/song8.jpg"},
    {title:"Tsy mampagnahy (RAMS Prod)", artist:"FIALLF", src:"music/song9.mp3", cover:"images/song9.jpg"},
    {title:"Magneva", artist:"LNT ft MOJEAN", src:"music/song10.mp3", cover:"images/song10.jpg"},
    {title:"Mbola ho avy", artist:"EL-BOY", src:"music/song11.mp3", cover:"images/song11.jpg"},
    {title:"Vaky vala", artist:"EL_BOY Feat.TEDDY PREZEAU", src:"music/song12.mp3", cover:"images/song12.jpg"},
    {title:"Fiainako", artist:"TINAH", src:"music/song13.mp3", cover:"images/song13.jpg"},
    {title:"Managna ano", artist:"TREEZEY", src:"music/song14.mp3", cover:"images/song14.jpg"}

]

let currentSong = 0
audio.src = songs[currentSong].src

function updatePlayer () {
    tabTitle.innerHTML = `${songs[currentSong].artist} ${songs[currentSong].title}`
    trackNbr.innerHTML = `${currentSong + 1} / ${songs.length}`
    nowArtist.innerHTML = songs[currentSong].artist
    nowTitle.innerHTML = `${songs[currentSong].title}`
    cover.src = songs[currentSong].cover
    main.style.backgroundImage = `url(/${songs[currentSong].cover})`;
    setTimeout(function() {
        totalTime.innerHTML = timeFormat(audio.duration)
        progress.max = audio.duration
    }, 1000)
}
function updateSize () {
    let playerH = $('.player').innerHeight()
    $('.list').innerHeight(window.innerHeight - playerH - 20)
    $('.playing').innerHeight(window.innerHeight - playerH)
}

window.onload = () => {
    updatePlayer()
    updateSize()
}

function nextSong() {
    if (!random) {
        if (currentSong < songs.length - 1) {
            currentSong++
        } else {
            currentSong = 0
        } 
    } else {
        currentSong = Math.floor(Math.random() * (songs.length - 1))
    }
    audio.src = songs[currentSong].src
    updatePlayer()
    audio.play()
    playBtn.classList.replace('ti-player-play', 'ti-player-pause')
}

function prevSong() {
    if (!random) {
        if (currentSong > 0) {
            currentSong--
        } else {
            currentSong = songs.length - 1
        }
    } else {
        currentSong = Math.floor(Math.random() * (songs.length - 1))
    }
    audio.src = songs[currentSong].src
    updatePlayer()
    audio.play()
    playBtn.classList.replace('ti-player-play', 'ti-player-pause')
}

function timeFormat(time) {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time - min * 60)

    if (sec < 10) {
        sec = `0${sec}`
    }
    if (min < 10) {
        min = `0${min}`
    }

    return `${min}:${sec}`
}

playBtn.onclick = () => {
    if (audio.paused) {
        playBtn.classList.replace('ti-player-play', 'ti-player-pause')
        updatePlayer()
        audio.play()
    } else {
        playBtn.classList.replace('ti-player-pause', 'ti-player-play')
        updatePlayer()
        audio.pause()
    }
}

nextBtn.onclick = () => {
    nextSong()
}

prevBtn.onclick = () => {
    prevSong()
}

randomBtn.onclick = () => {
    if (!random) {
        randomBtn.style.backgroundColor = 'white'
        randomBtn.style.color = 'black'
        random = true
    } else {
        randomBtn.style.backgroundColor = 'transparent'
        randomBtn.style.color = 'white'
        random = false
    }
}

repeatBtn.onclick = () => {
    if (!repeat) {
        repeatBtn.style.backgroundColor = 'white'
        repeatBtn.style.color = 'black'
        repeat = true
    } else {
        repeatBtn.style.backgroundColor = 'transparent'
        repeatBtn.style.color = 'white'
        repeat = false
    }
}

audio.onpause = () => {   
    playBtn.classList.replace('ti-player-pause', 'ti-player-play')
}
audio.onplay = () => {
    playBtn.classList.replace('ti-player-play', 'ti-player-pause')
}


window.setInterval(function() {
    currTime.innerHTML = timeFormat(audio.currentTime)
    progress.value = audio.currentTime
    if (audio.currentTime == audio.duration) {
        if (!repeat) {
            nextSong()
        } else {
            audio.currentTime = 0
            audio.play()
        } 
    } 
}, 1000)

progress.oninput = () => {
    audio.currentTime = progress.value
}

volume.value = audio.volume * 100
volume.oninput = () => {
    audio.volume = volume.value / 100
}

let ul = document.querySelector('.list')
for (let i = 0; i < songs.length; i++) {
    var li = document.createElement('li')
    li.id = i
    li.innerHTML = `${songs[i].artist} ${songs[i].title}`
    ul.appendChild(li)
}

let songList = Array.from(document.querySelectorAll('li'))
songList.map(function(element) {
    element.onclick = () => {
        currentSong = parseInt(element.id)
        audio.src = songs[currentSong].src
        updatePlayer()
        audio.play()
        // songListPanel.style.display = 'none'
        if (window.innerWidth <= 680) {
            $('.list').slideUp(500)
        }
    }
})

listBtn.onclick = () => {
    // songListPanel.style.display = 'flex'
    
    // alert(playerH)
    $('.list').slideDown(500)
    

}
closeListBtn.onclick = () => {
    // songListPanel.style.display = 'none'
    $('.list').slideUp(500)
}

window.onresize = () => {
    if (window.innerWidth > 680) {
        $('.list').slideDown(500)
    } else {
        $('.list').slideUp(500)
    }
    updateSize()
}

window.onkeydown = (e) => {
    e.preventDefault()
    // spacebar
    if (e.key == ' ') {
        if (!audio.paused) {
            audio.pause()
        } else {
            audio.play()
        }
    }
    // n or N
    if (e.key == 'n' || e.key == 'N') {
        nextSong()
    }
    // p or P
    if (e.key == 'p' || e.key == 'P') {
        prevSong()
    }
    // m or M
    // if (e.key == 'm' || e.key == 'M') {
        
    // }

}
