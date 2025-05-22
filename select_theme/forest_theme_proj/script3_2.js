const bgMusic = document.getElementById("bg-music");

window.addEventListener("click", () => bgMusic.play());
document.getElementById("settingsBtn").addEventListener("click", () => {
    window.location.href = "settings.html";
});
// start the game
const grid = document.querySelector('.game_grid');
const moveCounter = document.querySelector('#move_counter');
const timer = document.querySelector('#timer');
const restartBtn = document.querySelector('#restart_btn');

function playMatchSound() {
    const matchSound = new Audio('../audio/match.mp3');
    matchSound.play();
}

function playMismatchSound() {
    const mismatchSound = new Audio('../audio/mismatch.mp3');
    mismatchSound.play();
}

function playFlipSound() {
    const flipSound = new Audio('../audio/card-flip.mp3');
    flipSound.play();
}

const symbolsSet = [
"🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
"🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵",
"🙈", "🙉", "🙊", "🐒", "🦍", "🦧", "🐔", "🐧",
"🐦", "🐤", "🦆", "🦅", "🦉", "🦇", "🐺", "🦝"
];

let time = 0;
let timerInterval;
let gridSize;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function startTimer() {
    clearInterval(timerInterval);
    time = 0;
    timer.textContent = '00:00';

    timerInterval = setInterval(() => {
        time++;
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        timer.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

const storedDifficulty = localStorage.getItem('difficulty');

if (storedDifficulty) {
    gridSize = parseInt(storedDifficulty);
    startGame();
}

document.querySelectorAll('.difficulty').forEach(btn => {
    btn.addEventListener('click', () => {
    gridSize = parseInt(btn.value);
    startGame();
    });
});

function shuffleCards(array) {
    const cards = array;
    const result = [];

    while (cards.length) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const removed = cards.splice(randomIndex,1)[0];
        result.push(removed);
    }

    return result;
}

function createBoard() {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    const totalCards = gridSize * gridSize;
    const selectedSymbols = symbolsSet.slice(0, totalCards / 2);
    const doubledSymbols = selectedSymbols.concat(selectedSymbols);
    cards = shuffleCards(doubledSymbols);

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        grid.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && this.style.pointerEvents != 'none') {
        this.classList.add('flipped');

        this.innerHTML = this.dataset.symbol;
        flippedCards.push(this);
        playFlipSound();
        if (flippedCards.length == 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    moves++;
    moveCounter.textContent = moves;

    if (flippedCards[0].dataset.symbol == flippedCards[1].dataset.symbol) {
        playMatchSound();
        flippedCards.forEach(card => {
            card.classList.add('match');
        });
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('match');
            });
            flippedCards = [];
        }, 400);

        matchedPairs++;
        if (matchedPairs == cards.length / 2) {
            clearInterval(timerInterval);
            setTimeout(showWinBox, 300);
        }

    } else {
        playMismatchSound();
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.innerHTML = '';
        });
        flippedCards = [];
    }
}

function startGame() {
    clearInterval(timerInterval);
    timer.textContent = '00:00';
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    moveCounter.textContent = moves;

    createBoard();

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('flipped');
            card.innerHTML = card.dataset.symbol;
            card.style.pointerEvents = 'none';
        });
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flipped');
            card.innerHTML = '';
            card.style.pointerEvents = 'auto';
            });
            startTimer();
        }, 2000);
    }, 500);
}

restartBtn.addEventListener('click', startGame);

function showWinBox() {
    const winBox = document.getElementById('winBox');
    if (!winBox) {
        console.error('winBox not found!');
        return;
    }
    const playerName = localStorage.getItem('memoryGameUser') ;
    document.getElementById('winPlayerName').textContent = playerName; 
    document.getElementById('winMoves').textContent = moves;
    document.getElementById('winTime').textContent = timer.textContent;
    document.getElementById('winBox').classList.remove('hidden');
}

document.getElementById('playAgainBtn').addEventListener('click', () => {
    document.getElementById('winBox').classList.add('hidden');
    startGame();
});





