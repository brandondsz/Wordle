const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
let currentAttempt = 0;
let boardState = Array.from({ length: MAX_ATTEMPTS }, () => Array(WORD_LENGTH).fill(''));
let gameOver = false;

const board = document.getElementById('board');
const message = document.getElementById('message');
const keyboard = document.getElementById('keyboard');

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
        colorCells(targetWord);
    } else {
        colorCells(targetWord);
        currentAttempt++;
        if (currentAttempt === MAX_ATTEMPTS) {
            gameOver = true;
            message.textContent = `Game over! The word was "${targetWord}".`;
        }
    }
}

// Color the cells based on the guess
function colorCells(targetWord) {
    const row = board.children[currentAttempt];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const cell = row.children[i];
        if (boardState[currentAttempt][i]==targetWord[i]) {
            cell.classList.add('correct');
        } else if (targetWord.includes(boardState[currentAttempt][i])) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }
}

// Handle keyboard button clicks
keyboard.addEventListener('click', (e) => {
    if (gameOver) return;

    const key = e.target.dataset.key;
    const currentRow = boardState[currentAttempt];

    if (key === 'Backspace') {
        // Handle backspace
        const lastIndex = currentRow.indexOf('');
        if (lastIndex === -1 || lastIndex === WORD_LENGTH) {
            currentRow[WORD_LENGTH - 1] = '';
        } else if (lastIndex > 0) {
            currentRow[lastIndex - 1] = '';
        }
    } else if (key === 'Enter') {
        // Handle Enter key
        if (currentRow.join('').length === WORD_LENGTH) {
            checkGuess();
        }
    } else if (/^[A-Z]$/.test(key) && currentRow.join('').length < WORD_LENGTH) {
        // Handle letter input
        const emptyIndex = currentRow.indexOf('');
        if (emptyIndex !== -1) {
            currentRow[emptyIndex] = key;
        }
    }

    updateBoard();
});

// Focus on the hidden input when the board is clicked
board.addEventListener('click', () => {
    hiddenInput.focus();
});


// Initialize the game
initializeBoard();
hiddenInput.focus(); // Focus on the hidden input for mobile