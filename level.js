const bgMusic = document.getElementById("bg-music");

window.addEventListener("click", () => {
  bgMusic.play().catch(err => {
    console.log("Autoplay Error:", err);
  });
}, { once: true });

const levelButtons = document.querySelectorAll('.level-btn');

levelButtons.forEach(button => {
  button.addEventListener('click', () => {
    const level = button.dataset.level;
    window.location.href = `game.html?level=${level}`;
  });
});

document.getElementById("settingsBtn").addEventListener("click", () => {
  window.location.href = "settings.html";
});
