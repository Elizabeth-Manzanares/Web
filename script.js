let level = 1;
let score = 0;
let correctAnswer = 4;
let timer;
let timeLeft = 30;

const levelText = document.getElementById("level");
const bestLevelText = document.getElementById("bestLevel");
const questionText = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

// Cargar mejor nivel guardado
let bestLevel = localStorage.getItem("bestLevel") || 1;
bestLevelText.textContent = `🥇 Nivel más alto: ${bestLevel}`;

function generateQuestion() {
  const a = Math.floor(Math.random() * level * 2 + 1);
  const b = Math.floor(Math.random() * level * 2 + 1);
  correctAnswer = a + b;
  questionText.textContent = `¿Cuánto es ${a} + ${b}?`;
  restartTimer();
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  clearInterval(timer);

  if (userAnswer === correctAnswer) {
    score += 10;
    level++;
    feedback.textContent = "✅ ¡Correcto! Sube de nivel.";

    if (level > bestLevel) {
      bestLevel = level;
      localStorage.setItem("bestLevel", bestLevel);
      bestLevelText.textContent = `🥇 Nivel más alto: ${bestLevel}`;
    }
  } else {
    score -= 5;
    feedback.textContent = `❌ Incorrecto. La respuesta era ${correctAnswer}`;
  }

  updateGame();
}

function updateGame() {
  answerInput.value = "";
  levelText.textContent = `Nivel: ${level}`;
  scoreText.textContent = `Puntaje: ${score}`;
  generateQuestion();
}

function restartTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerText.textContent = `⏳ Tiempo: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `⏳ Tiempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      feedback.textContent = `⏰ Tiempo agotado. La respuesta era ${correctAnswer}`;
      score -= 5;
      updateGame();
    }
  }, 1000);
}

// Iniciar juego
generateQuestion();
