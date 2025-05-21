  document.addEventListener('DOMContentLoaded', () => {
    const audioList = document.getElementsByTagName('audio');
    for (let i in audioList){
      const audio = document.getElementsByTagName('audio')[i];
      let savedVolume = localStorage.getItem('volume') || 70;
      savedVolume = parseInt(savedVolume);

      audio.volume = savedVolume / 100;
      audio.muted = savedVolume === 0;
    }
 
  });