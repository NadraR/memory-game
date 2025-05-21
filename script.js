const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function()  {
  const nameInput = document.getElementById('playerName');
  const playerName = nameInput.value.trim();
  if (!playerName) {
      alert('Please enter your name');
      return;
  }
  localStorage.setItem('memoryGameUser', playerName);
  window.location.href = "level.html";
});

document.getElementById("settingsBtn").addEventListener("click", () => {
  window.location.href = "sound.html";
});

document.getElementById("closeBtn").addEventListener("click", () => {
  window.location.href = "Quit.html";
});

document.getElementById("aboutBtn").addEventListener("click", () => {
  window.location.href = "about.html";
});

const storedUser = localStorage.getItem('memoryGameUser');
if (storedUser) {
  document.getElementById('playerName').value = storedUser;
}
document.getElementById("startBtn").addEventListener("click", function () {
    window.location.href = "select_theme/select_theme_page/select_theme.html"; 
  });

