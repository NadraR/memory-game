document.addEventListener('DOMContentLoaded', () => {
  const toggleSoundBtn = document.getElementById('toggleSoundSettings');
  const soundSettings = document.getElementById('soundSettings');
  const volumeIcon = document.getElementById('volumeIcon');
  const volumeRange = document.getElementById('volumeRange');
  const audio = document.getElementById('myAudio');

  let previousVolume = localStorage.getItem('volume') || 70;
  volumeRange.value = previousVolume;
  audio.volume = previousVolume / 100;
  audio.muted = previousVolume == 0;
  volumeIcon.textContent = previousVolume == 0 ? '🔇' : '🔊';

  toggleSoundBtn?.addEventListener('click', () => {
    const isVisible = soundSettings.style.display === 'block';
    soundSettings.style.display = isVisible ? 'none' : 'block';
  });

  volumeRange?.addEventListener('input', () => {
    const volume = volumeRange.value / 100;
    audio.volume = volume;
    localStorage.setItem('volume', volumeRange.value);
    if (volume === 0) {
      volumeIcon.textContent = '🔇';
      audio.muted = true;
    } else {
      volumeIcon.textContent = '🔊';
      audio.muted = false;
      previousVolume = volumeRange.value;
    }
  });

  volumeIcon?.addEventListener('click', () => {
    if (audio.muted || audio.volume === 0) {
      audio.muted = false;
      volumeRange.value = previousVolume || 70;
      audio.volume = volumeRange.value / 100;
      volumeIcon.textContent = '🔊';
    } else {
      previousVolume = volumeRange.value;
      audio.muted = true;
      audio.volume = 0;
      volumeRange.value = 0;
      volumeIcon.textContent = '🔇';
    }
    localStorage.setItem('volume', volumeRange.value);
  });
});
