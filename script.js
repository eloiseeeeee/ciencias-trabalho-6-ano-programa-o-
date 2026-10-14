// Perguntas alinhadas ao currículo de Ciências do 6º Ano
const questions = [
  {
    question: "Qual sistema do corpo humano é responsável por transportar sangue, oxigênio e nutrientes?",
    options: ["Sistema Digestório", "Sistema Circulatório", "Sistema Respiratório", "Sistema Nervoso"],
    answer: 1
  },
  {
    question: "Qual é a camada mais externa da Terra, onde nós vivemos?",
    options: ["Manto", "Núcleo Externo", "Crosta Terrestre", "Núcleo Interno"],
    answer: 2
  },
  {
    question: "As plantas produzem seu próprio alimento através de qual processo?",
    options: ["Digestão", "Respiração Celular", "Fotossíntese", "Transpiração"],
    answer: 2
  },
  {
    question: "Qual órgão do corpo humano é responsável por absorver a maior parte dos nutrientes dos alimentos?",
    options: ["Estômago", "Boca", "Intestino Delgado", "Esôfago"],
    answer: 2
  },
  {
    question: "O conjunto de seres vivos e o ambiente em que vivem interagindo entre si é chamado de:",
    options: ["Cadeia Alimentar", "Ecossistema", "População", "Habitat"],
    answer: 1
  }
];

// Estado do Jogo
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let canAnswer = true;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score-display');
const livesDisplay = document.getElementById('lives-display');
const progressBar = document.getElementById('progress-bar');

const finalScore = document.getElementById('final-score');
const endTitle = document.getElementById('end-title');

// Eventos dos Botões
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  lives = 3;
  canAnswer = true;

  updateHUD();
  
  startScreen.classList.remove('active');
  endScreen.classList.remove('active');
  quizScreen.classList.add('active');

  showQuestion();
}

function updateHUD() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = '❤️'.repeat(lives);
  
  const progressPercentage = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function showQuestion() {
  canAnswer = true;
  updateHUD();

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.textContent = optionText;
    button.classList.add('btn', 'btn-option');
    button.addEventListener('click', () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex, selectedButton) {
  if (!canAnswer) return;
  canAnswer = false;

  const currentQuestion = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll('.btn-option');

  if (selectedIndex === currentQuestion.answer) {
    selectedButton.classList.add('correct');
    score += 10;
  } else {
    selectedButton.classList.add('incorrect');
    buttons[currentQuestion.answer].classList.add('correct');
    lives--;
  }

  updateHUD();

  setTimeout(() => {
    if (lives <= 0) {
      endGame(false);
    } else {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endGame(true);
      }
    }
  }, 1200);
}

function endGame(isWin) {
  quizScreen.classList.remove('active');
  endScreen.classList.add('active');

  finalScore.textContent = score;

  if (isWin) {
    endTitle.textContent = "Parabéns, Cientista! 🎉";
  } else {
    endTitle.textContent = "Ops! Suas vidas acabaram! 🧪";
  }
}