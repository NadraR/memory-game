

const levelButtons = document.querySelectorAll('.level-btn');

levelButtons.forEach(button => {
  button.addEventListener('click', () => {
    const level = button.dataset.level;
    window.location.href = `game.html?level=${level}`;
  });
});

document.getElementById("settingsBtn").addEventListener("click", () => {
  window.location.href = "sound.html";
});

document.getElementById("closeBtn").addEventListener("click", () => {
  window.history.back();
});
