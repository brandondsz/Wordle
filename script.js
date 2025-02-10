const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
let currentAttempt = 0;
let boardState = Array.from({ length: MAX_ATTEMPTS }, () => Array(WORD_LENGTH).fill(''));
let gameOver = false;

const board = document.getElementById('board');
const message = document.getElementById('message');
const hiddenInput = document.getElementById('hiddenInput');
const currentInput = document.getElementById('currentInput');

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

// Handle input from the hidden input field
hiddenInput.addEventListener('input', (e) => {
    if (gameOver) return;

    const input = e.target.value.toUpperCase().slice(0, WORD_LENGTH);
    hiddenInput.value = input; // Limit input to 5 characters
    boardState[currentAttempt] = input.split('');
    updateBoard();
});

// Handle Backspace and Enter keys
hiddenInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        // Handle backspace
        const currentRow = boardState[currentAttempt];
        const lastIndex = currentRow.indexOf('');
        if (lastIndex === -1 || lastIndex === WORD_LENGTH) {
            currentRow[WORD_LENGTH - 1] = '';
        } else if (lastIndex > 0) {
            currentRow[lastIndex - 1] = '';
        }
        updateBoard();
    } else if (e.key === 'Enter' && boardState[currentAttempt].join('').length === WORD_LENGTH) {
        // Handle Enter key
        checkGuess();
        hiddenInput.value = '';
    }
});

// Focus on the hidden input when the board is clicked
board.addEventListener('click', () => {
    hiddenInput.focus();
});


// Initialize the game
initializeBoard();
hiddenInput.focus(); // Focus on the hidden input for mobile