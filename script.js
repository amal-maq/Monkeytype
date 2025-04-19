const sentences = {
  easy: "the cat sat on the mat hello world keep typing dogs love to run the sun rises stay strong keep going",
  medium: "javascript makes web dynamic practice typing every second read books coding helps focus on task good things come with time",
  hard: "the quick brown fox jumps accuracy and speed developing typing skills takes effort hard work stay calm typing fast without accuracy learn from mistakes attention to detail"
};

const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty');
const wordCountSelect = document.getElementById('wordCount');
const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game');
const sentenceDisplay = document.getElementById('sentence');
const inputField = document.getElementById('input');
const statsDisplay = document.getElementById('stats');
const resultDiv = document.getElementById('result');
const finalStats = document.getElementById('final-stats');

let correctWords = 0;
let startTime;
let requiredWords;
let currentSentence = '';

startBtn.addEventListener('click', () => {
  setupDiv.style.display = 'none';
  resultDiv.style.display = 'none';
  gameDiv.style.display = 'flex';
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();

  requiredWords = parseInt(wordCountSelect.value);
  correctWords = 0;

  currentSentence = sentences[difficultySelect.value].split(" ").slice(0, requiredWords).join(" ");
  sentenceDisplay.textContent = currentSentence;

  startTime = Date.now();
});

inputField.addEventListener('input', () => {
  const typedText = inputField.value.trim(); // Typed text so far
  const originalText = currentSentence; // Original sentence
  let highlightedText = '';

  // Highlight letter by letter
  for (let i = 0; i < originalText.length; i++) {
    if (i < typedText.length) {
      if (typedText[i] === originalText[i]) {
        highlightedText += `<span class="correct-letter">${originalText[i]}</span>`;
      } else {
        highlightedText += `<span class="incorrect-letter">${originalText[i]}</span>`;
      }
    } else {
      highlightedText += `<span class="untyped-letter">${originalText[i]}</span>`;
    }
  }

  sentenceDisplay.innerHTML = highlightedText;

  // Calculate stats
  const typedWords = typedText.split(/\s+/);
  const originalWords = currentSentence.split(/\s+/);

  correctWords = typedWords.filter((word, index) => word === originalWords[index]).length;
  const elapsedTime = (Date.now() - startTime) / 1000;
  const wpm = Math.round((correctWords / elapsedTime) * 60);

  statsDisplay.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm} | Correct Words: ${correctWords} | Score: ${correctWords}`;

  // End game logic
  if (typedWords.length >= originalWords.length && typedText.endsWith(originalWords[originalWords.length - 1])) {
    endGame();
  }
});

function endGame() {
  inputField.disabled = true;
  gameDiv.style.display = 'none';
  resultDiv.style.display = 'flex';

  const elapsedTime = (Date.now() - startTime) / 60;
  const wpm = Math.round((correctWords / elapsedTime));
  finalStats.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm}, Correct Words: ${correctWords}, Score: ${correctWords}`;
}