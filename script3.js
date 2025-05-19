const grid = document.querySelector('.game_grid');
const moveCounter = document.querySelector('#move_counter');
const timer = document.querySelector('#timer');
const restartBtn = document.querySelector('#restart_btn');

const matchSound = new Audio('match.mp3');
const mismatchSound = new Audio('mismatch.mp3');

const symbolsSet = ['💎', '🌶️', '🍇', '🍉', '🍍', '🍓', '🌝','😍', '😎', '🐱', '🐶', '🐵', '🐻', '🐼', '🐸', '🦁', '🐯', '🐨', '🦊', '🐰', '🐔', '🦄', '🐮', '🐘', '🦓', '🐙', '🐬', '🐠', '🐞', '🦋', '🌸', '🌟'];

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

        if (flippedCards.length == 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    moves++;
    moveCounter.textContent = moves;

    if (flippedCards[0].dataset.symbol == flippedCards[1].dataset.symbol) {
        matchSound.play();
        matchedPairs++;
        if (matchedPairs == cards.length / 2) {
              clearInterval(timerInterval);
             setTimeout(showWinBox, 300);
        }
        flippedCards = [];
    } else {
        mismatchSound.play();
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
        }, 3000);
    }, 500);
}

function showWinBox() {
    document.getElementById('winMoves').textContent = moves;
    document.getElementById('winTime').textContent = timer.textContent;
    document.getElementById('winBox').classList.remove('hidden');
}

document.getElementById('playAgainBtn').addEventListener('click', () => {
    document.getElementById('winBox').classList.add('hidden');
    startGame();
});

document.getElementById('about_btn').addEventListener('click', () => {
    window.location.href = 'about.html';
});

restartBtn.addEventListener('click', startGame);

