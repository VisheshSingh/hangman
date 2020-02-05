const wordEl = document.getElementById('word');
const wrongLetEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');
const playAgain = document.getElementById('play-button');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['frontend', 'javascript', 'wizard', 'programming'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);
const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
${selectedWord
  .split('')
  .map(
    letter =>
      `<span class='letter'>${
        correctLetters.includes(letter) ? letter : ''
      }</span>`
  )
  .join('')}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMsg.innerHTML = 'Congratulations! You won! 🎉';
    popup.style.display = 'flex';
  }
}

displayWord();
