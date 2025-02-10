const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
let currentAttempt = 0;
let boardState = Array.from({ length: MAX_ATTEMPTS }, () => Array(WORD_LENGTH).fill(''));
let gameOver = false;

const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

// Initialize the board
function initializeBoard() {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < WORD_LENGTH; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

// Update the board with the current attempt
function updateBoard() {
    const row = board.children[currentAttempt];
    for (let i = 0; i < WORD_LENGTH; i++) {
        row.children[i].textContent = boardState[currentAttempt][i];
    }
}

// Check the guess against the target word
function checkGuess() {
    const guess = boardState[currentAttempt].join('');
    if (guess === targetWord) {
        gameOver = true;
        message.textContent = 'Congratulations! You guessed the word!';
        colorCells(true);
    } else {
        colorCells(false);
        currentAttempt++;
        if (currentAttempt === MAX_ATTEMPTS) {
            gameOver = true;
            message.textContent = `Game over! The word was "${targetWord}".`;
        }
    }
}

// Color the cells based on the guess
function colorCells(isCorrect) {
    const row = board.children[currentAttempt];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const cell = row.children[i];
        if (isCorrect) {
            cell.classList.add('correct');
        } else if (targetWord.includes(boardState[currentAttempt][i])) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }
}

// Reset the game
function resetGame() {
    boardState = Array.from({ length: MAX_ATTEMPTS }, () => Array(WORD_LENGTH).fill(''));
    currentAttempt = 0;
    gameOver = false;
    message.textContent = '';
    board.innerHTML = '';
    initializeBoard();
    setDailyWord(); // Reset the daily word
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    if (e.key === 'Enter' && boardState[currentAttempt].join('').length === WORD_LENGTH) {
        checkGuess();
    } else if (e.key === 'Backspace') {
        const row = boardState[currentAttempt];
        const lastIndex = row.indexOf('');
        if (lastIndex === -1 || lastIndex === WORD_LENGTH) {
            row[WORD_LENGTH - 1] = '';
        } else {
            row[lastIndex - 1] = '';
        }
        updateBoard();
    } else if (/^[a-zA-Z]$/.test(e.key) && boardState[currentAttempt].join('').length < WORD_LENGTH) {
        const row = boardState[currentAttempt];
        const emptyIndex = row.indexOf('');
        if (emptyIndex !== -1) {
            row[emptyIndex] = e.key.toUpperCase();
            updateBoard();
        }
    }
});

resetButton.addEventListener('click', resetGame);

// Initialize the game
initializeBoard();