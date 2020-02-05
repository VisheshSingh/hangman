const wordEl = document.getElementById('word');
const wrongLetEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');
const playAgain = document.getElementById('play-button');

const figureParts = Array.from(document.querySelectorAll('.figure-part'));

const words = ['frontend', 'javascript', 'wizard', 'programming'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];

function updateWrongLetterEl() {
  wrongLetEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
  // display figure
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    popup.style.display = 'flex';
    finalMsg.innerText = 'Unfortunately, you lost 😞';
  }
}

function showNotification() {
  // Display wrong letters
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

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

// keydown event listener
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    let letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgain.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetterEl();
  popup.style.display = 'none';
});
