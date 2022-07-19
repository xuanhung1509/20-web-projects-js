const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification-container');
const playAgainBtn = document.getElementById('play-again');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord;
const correctLetters = [];
const wrongLetters = [];

// Random word
function randomWord() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
}

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')
    }
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  // Check if win
  if (innerWord === selectedWord) {
    gameOver('Congratulations! You win!');
  }
}

// Show Notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Update wrong letters
function updateWrongLetters() {
  // Display wrong letters 
  if (wrongLetters.length > 0) {
    wrongLettersEl.innerHTML = `
      <p>Wrong</p>
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
  }

  // Display figure parts
  figureParts.forEach((part, index) => {
    if (index < wrongLetters.length) {
      part.style.display = 'block';
    }
  });

  // Check if lose
  if (wrongLetters.length === figureParts.length) {
    gameOver('Unfortunately, You Lose!');
  }
}

// Game Over
function gameOver(msg) {
  finalMessage.textContent = msg;
  popup.style.display = 'flex';
}

randomWord();
displayWord();

// Listen for key press
window.addEventListener('keydown', e => {
  // Only fires if letter is in range (a-z)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

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
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

// Restart Game
playAgainBtn.addEventListener('click', () => {
  // Empty Arrays
  correctLetters.splice(0, correctLetters.length);
  wrongLetters.splice(0, wrongLetters.length);

  // Reload
  window.location.reload();
});