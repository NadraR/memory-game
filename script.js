const startBtn = document.getElementById("startBtn");
const bgMusic = document.getElementById("bg-music");

window.addEventListener("click", () => {
  bgMusic.play().catch(err => {
    console.log("Autoplay Error:", err);
  });
}, { once: true });

startBtn.addEventListener("click", () => {
  window.location.href = "level.html";
});



document.getElementById("settingsBtn").addEventListener("click", () => {
  window.location.href = "settings.html";
});

document.getElementById("aboutBtn").addEventListener("click", () => {
  window.location.href = "about.html";
});
