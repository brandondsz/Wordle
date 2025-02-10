const words = [
    'APPLE', 'BRAIN', 'CRANE', 'DANCE', 'EAGLE',
    'FLAME', 'GRACE', 'HEART', 'IGLOO', 'JELLY'
];

let targetWord='';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setTargetWord() {
    const wordFromUrl = getQueryParam('w')?.toUpperCase();
    if (wordFromUrl && wordFromUrl.length === 5) {
        for (let i = 0; i < wordFromUrl.length; i++) {
            let charCode = wordFromUrl.charCodeAt(i) - (i + 1);
            
            // Wrap around if the character code goes below 'A'
            if (charCode < 65) {
              charCode = 90 - (64 - charCode);
            }            
            targetWord += String.fromCharCode(charCode);
          }
        } else {
        // Fallback to daily word logic
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
        const seed = parseInt(today.replace(/-/g, ''), 10); // Convert date to a number
        const index = seed % words.length; // Use the seed to pick a word
        targetWord = words[index];
    }
}

setTargetWord(); // Set the target word