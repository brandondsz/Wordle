const words = [
    'APPLE', 'BRAIN', 'CRANE', 'DANCE', 'EAGLE',
    'FLAME', 'GRACE', 'HEART', 'IGLOO', 'JELLY'
];

let targetWord;

function setDailyWord() {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const seed = parseInt(today.replace(/-/g, ''), 10); // Convert date to a number
    const index = seed % words.length; // Use the seed to pick a word
    targetWord = words[index];
}

setDailyWord(); // Set the word for the day