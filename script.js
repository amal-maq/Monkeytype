const sentences = {
  easy: [
    "the cat sat on the mat",
    "hello world this is fun",
    "keep typing and do not stop",
    "dogs love to run in the park",
    "a book can open many minds",
    "the sun rises in the east",
    "stay strong and keep going",
    "the sky is blue and bright"
  ],
  medium: [
    "javascript makes the web dynamic",
    "practice typing to gain speed",
    "every second counts in the game",
    "read books to grow your brain",
    "keep going until you get better",
    "coding helps solve many problems",
    "focus on the task at hand",
    "good things come with time"
  ],
  hard: [
    "the quick brown fox jumps over the lazy dog",
    "accuracy and speed go hand in hand",
    "developing typing skills takes effort and time",
    "hard work and practice build skill",
    "stay calm and keep your fingers moving",
    "typing fast is not enough without accuracy",
    "learn from your mistakes and improve",
    "writing code requires attention to detail"
  ]
};

const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty');
const customTextInput = document.getElementById('customText');
const timeSelect = document.getElementById('timeSelect');
const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game');
const sentenceDisplay = document.getElementById('sentence');
const inputField = document.getElementById('input');
const timerDisplay = document.getElementById('timer');
const statsDisplay = document.getElementById('stats');
const resultDiv = document.getElementById('result');
const finalStats = document.getElementById('final-stats');

let timer;
let timeLeft = 30;
let correctWords = 0;
let totalWords = 0;
let currentSentence = '';
let content = '';
let startTime;

startBtn.addEventListener('click', () => {
  setupDiv.style.display = 'none';
  resultDiv.style.display = 'none';
  gameDiv.style.display = 'flex';
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();

  timeLeft = parseInt(timeSelect.value);
  correctWords = 0;
  totalWords = 0;
  statsDisplay.textContent = `WPM: 0 | Correct Words: 0 | Score: 0`;

  const customText = customTextInput.value.trim();
  let rawSentence;

  if (customText.length > 0) {
    rawSentence = customText.replace(/[.,!?]/g, '');
  } else {
    const difficulty = difficultySelect.value;
    const difficultySentences = sentences[difficulty];
    rawSentence = difficultySentences[Math.floor(Math.random() * difficultySentences.length)];
  }

  content = rawSentence.split(' ').join(' ');
  currentSentence = content;

  sentenceDisplay.textContent = currentSentence;
  timerDisplay.textContent = `Time: ${timeLeft}s`;

  startTime = Date.now();

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    } else {
      addMoreContent();
    }
  }, 1000);
});

inputField.addEventListener('input', () => {
  const typedWords = inputField.value.trim().split(/\s+/);
  const originalWords = currentSentence.trim().split(/\s+/);

  correctWords = typedWords.filter((word, index) => word === originalWords[index]).length;
  totalWords = typedWords.length;
  const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
  const wpm = Math.round((correctWords / elapsedTime) * 60);
  const score = correctWords;

  statsDisplay.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm} | Correct Words: ${correctWords} | Score: ${score}`;
});

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function addMoreContent() {
  if (timeLeft > 0) {
    const difficulty = difficultySelect.value;
    const difficultySentences = sentences[difficulty];
    const additionalSentence = difficultySentences[Math.floor(Math.random() * difficultySentences.length)];
    content += " " + additionalSentence;
    sentenceDisplay.textContent = content;
  }
}

function endGame() {
  clearInterval(timer);
  inputField.disabled = true;
  gameDiv.style.display = 'none';
  resultDiv.style.display = 'flex';

  const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
  const wpm = Math.round((correctWords / elapsedTime) * 60); // Corrected WPM formula
  finalStats.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm}, Correct Words: ${correctWords}, Score: ${correctWords}`;
}
