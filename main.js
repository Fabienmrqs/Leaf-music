const audio_player = document.getElementById("music-player");

window.onload = () => {
  const song_artist = document.getElementById("song-artist");
  const song_title = document.getElementById("song-title");

  const prev_btn = document.getElementById("prev_btn");
  const play_btn = document.getElementById("play_btn");
  const pause_btn = document.getElementById("pause_btn");

  const next_btn = document.getElementById("next_btn");

  const audio_player = document.getElementById("music-player");

  const video = document.getElementById("video");

  const slide = document.getElementById("slide");

  const volumBar = document.getElementById("volumBar");
  const volumProgress = document.getElementById("volumProgress");
  const volumLogo = document.getElementById("volumLogo");

  const trackTime = document.getElementById("tracktime");
  const durationTime = document.getElementById("durationTime");

  let current_song_i;
  let current_video;

  let videoArray = [
    {
      videosPath: "assets/video/Tanjiro-Sword-Live-Wallpaper-Free.mp4",
    },
    {
      videosPath: "assets/video/Uso-To-Honto-Shigatsu-Wa-Kimi-No-Uso-Live-Wallpaper.mp4",
    },
    {
      videosPath: "assets/video/VFX Art Anime Scene - Tiamat Comet (Kimi no na wa) Animated Windows.mp4",
    },
    {
      videosPath: "assets/video/shiba-inu-falling-petals-4k-live-wallpaper (1).mp4",
    },
    {
      videosPath: "assets/video/shinobu-kocho-anime-free-live-wallpaper.mp4",
    },
    {
      videosPath: "assets/video/jinx-and-vi-lol-4k-live-wallpaper.mp4",
    },
    {
      videosPath: "assets/video/Kanao-Tsuyuri-Anime-Girl-Demon-Slayer-Live-Wallpaper.mp4",
    },
    {
      videosPath: "assets/video/mia-karnstein-code-vein-4k-live-wallpaper.mp4",
    },
    {
      videosPath: "assets/video/uraraka-ochako-my-hero-academia-4k-live-wallpaper.mp4",
    },
  ];

  let songs = [
    {
      title: "GTO - Ending 2",
      artist: "Miwako Okuda",
      songPath: "assets/music/gto_ending2.mp3",
    },
    {
      title: "Your Lie In April - Opening 1",
      artist: "Goose House",
      songPath: "assets/music/yourlieinapril_opening1.mp3",
    },
    {
      title: "Your name - Sparkle",
      artist: "Radwimps",
      songPath: "assets/music/yourName-Sparkle.mp3",
    },
  ];

  play_btn.addEventListener("click", TogglePlay);
  pause_btn.addEventListener("click", TogglePlay);
  next_btn.addEventListener("click", () => ChangeSong());
  prev_btn.addEventListener("click", () => ChangeSong(false));
  audio_player.addEventListener("timeupdate", ProgressBar);
  volumBar.addEventListener( "mousedown",(event) => {
      const clickedPosition = event.offsetX - event.target.offsetLeft;
      audio_player.volume = clickedPosition / event.target.offsetWidth;
      volumProgress.style.width = (clickedPosition / event.target.offsetWidth) * 100 + "%";
    },
    false
  );
  slide.addEventListener("click", UpdateProgressBar);
  volumLogo.addEventListener("click", () => {
    if (volumBar.style.display === "none") {
      volumBar.style.display = "block";
    } else {
      volumBar.style.display = "none";
    }
  });

  pause_btn.style = "display:none";

  audio_player.addEventListener("timeupdate", () => {
    let currentTimeLeft = Math.floor(audio_player.currentTime / 60);
    let currentTimeRight = Math.floor(audio_player.currentTime - currentTimeLeft * 60);

    let durationLeft = Math.floor(audio_player.duration / 60);
    let durationRight = Math.floor(audio_player.duration - durationLeft * 60);

    if (currentTimeLeft < 10) {
      currentTimeLeft = "0" + currentTimeLeft;
    }
    if (currentTimeRight < 10) {
      currentTimeRight = "0" + currentTimeRight;
    }

    if (durationLeft < 10) {
      durationLeft = "0" + durationLeft;
    }
    if (durationRight < 10) {
      durationRight = "0" + durationRight;
    }

    trackTime.innerHTML = currentTimeLeft + ":" + currentTimeRight;
    durationTime.innerHTML = durationLeft + ":" + durationRight;
  });

  initVideo();
  initPlayer();

  function initVideo() {
    current_video = 0;
    // current_video = getRandomInt(0,videoArray.length);
    setInterval(() => NextVideo(), 10000);
    UpdateVideo();
  }

  function UpdateVideo() {
    let myvid = videoArray[current_video];
    video.src = myvid.videosPath;
  }

  function NextVideo() {
    current_video++;
    if (current_video > videoArray.length - 1) {
      current_video = 0;
    }
    //    current_video = getRandomInt(0,videoArray.length);
    UpdateVideo();
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function initPlayer() {
    current_song_i = 0;
    UpdatePlayer();
  }

  function ProgressBar() {
    var currentTime = audio_player.currentTime;
    var duration = audio_player.duration;
    $(".hp_range")
      .stop(true, true)
      .animate({ width: ((currentTime + 0.25) / duration) * 100 + "%" }, 250, "linear");
  }

  function UpdateProgressBar(ev) {
    audio_player.currentTime = (ev.offsetX / slide.offsetWidth) * audio_player.duration;
  }

  function UpdatePlayer() {
    let song = songs[current_song_i];
    song_title.innerText = song.title;
    song_artist.innerText = song.artist;

    audio_player.src = song.songPath;
  }

  function TogglePlay() {
    if (audio_player.paused) {
      audio_player.play();
      play_btn.style = "display:none";
      pause_btn.style = "display:true";
      play_btn.classList.remove("play_btn");
      play_btn.classList.add("pause_btn");
    } else {
      audio_player.pause();
      pause_btn.style = "display:none";
      play_btn.style = "display:true";
    }
  }

  function ChangeSong(next = true) {
    if (next) {
      current_song_i++;
      if (current_song_i > songs.length - 1) {
        current_song_i = 0;
      }
    } else {
      current_song_i--;
      if (current_song_i < 0) {
        current_song_i = songs.length - 1;
      }
    }
    UpdatePlayer();
    TogglePlay();
  }
};
