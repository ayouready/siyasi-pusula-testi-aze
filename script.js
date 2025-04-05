// Sorular veritabanı
const questions = [
  // Siyasi
  {
    question: "Dövlət iqtisadiyyata güclü müdaxilə etməlidir.",
    axis: "economic",
    direction: "left"
  },
  {
    question: "Hökumət şəxsi hüquqları ictimai təhlükəsizlik üçün məhdudlaşdıra bilər.",
    axis: "social",
    direction: "authoritarian"
  },
  // İqtisadi
  {
    question: "Böyük şirkətlər daha çox vergi verməlidir.",
    axis: "economic",
    direction: "left"
  },
  {
    question: "Bazar iqtisadiyyatı ən yaxşı iqtisadi sistemdir.",
    axis: "economic",
    direction: "right"
  },
  // Sosial
  {
    question: "Cins azlıqları eyni hüquqlara malik olmalıdır.",
    axis: "social",
    direction: "libertarian"
  },
  {
    question: "Əsgərlik məcburi olmalıdır.",
    axis: "social",
    direction: "authoritarian"
  },
  // Daha fazla soru eklenebilir
];

// Uygulama durumu
const state = {
  currentQuestion: 0,
  answers: [],
  economicScore: 0,
  socialScore: 0,
  musicPlaying: false
};

// DOM elementleri
const elements = {
  quizContainer: document.getElementById('quiz-container'),
  progressBar: document.getElementById('progress-bar'),
  questionText: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  nextBtn: document.getElementById('next-btn'),
  resultContainer: document.getElementById('result-container'),
  compass: document.getElementById('compass'),
  marker: document.getElementById('marker'),
  resultText: document.getElementById('result-text'),
  restartBtn: document.getElementById('restart-btn'),
  musicControl: document.getElementById('music-control'),
  musicIcon: document.getElementById('music-icon'),
  bgMusic: document.getElementById('bg-music')
};

// Testi başlat
function initQuiz() {
  state.currentQuestion = 0;
  state.answers = [];
  state.economicScore = 0;
  state.socialScore = 0;
  
  renderQuestion();
  updateProgress();
  
  // Müzik kontrolü
  elements.bgMusic.volume = 0.3;
  elements.musicControl.addEventListener('click', toggleMusic);
}

// Soruyu render et
function renderQuestion() {
  const question = questions[state.currentQuestion];
  
  elements.questionText.textContent = `${state.currentQuestion + 1}. ${question.question}`;
  
  // Seçenekleri oluştur
  elements.optionsContainer.innerHTML = '';
  const options = [
    { text: 'Tam razıyam', value: 3 },
    { text: 'Razıyam', value: 2 },
    { text: 'Qismən razıyam', value: 1 },
    { text: 'Bitərəfəm', value: 0 },
    { text: 'Qismən narazıyam', value: -1 },
    { text: 'Narazıyam', value: -2 },
    { text: 'Tam narazıyam', value: -3 }
  ];
  
  options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.innerHTML = `
      <input type="radio" name="answer" id="option-${index}" value="${option.value}">
      <label for="option-${index}">${option.text}</label>
    `;
    
    // Önceden cevaplanmışsa işaretle
    if (state.answers[state.currentQuestion] !== undefined) {
      if (state.answers[state.currentQuestion].value === option.value) {
        optionElement.querySelector('input').checked = true;
      }
    }
    
    elements.optionsContainer.appendChild(optionElement);
  });
}

// İlerleme çubuğunu güncelle
function updateProgress() {
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;
  elements.progressBar.style.width = `${progress}%`;
}

// Sonraki soruya geç
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  
  if (!selectedOption) {
    alert('Zəhmət olmasa bir cavab seçin!');
    return;
  }
  
  // Cevabı kaydet
  const currentQ = questions[state.currentQuestion];
  const answerValue = parseInt(selectedOption.value);
  
  state.answers[state.currentQuestion] = {
    question: currentQ.question,
    value: answerValue,
    axis: currentQ.axis,
    direction: currentQ.direction
  };
  
  // Skoru güncelle
  if (currentQ.axis === 'economic') {
    state.economicScore += (currentQ.direction === 'left') ? answerValue : -answerValue;
  } else {
    state.socialScore += (currentQ.direction === 'authoritarian') ? answerValue : -answerValue;
  }
  
  // Sonraki soruya geç veya bitir
  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion++;
    renderQuestion();
    updateProgress();
  } else {
    showResults();
  }
}

// Sonuçları göster
function showResults() {
  elements.quizContainer.classList.add('hidden');
  elements.resultContainer.classList.remove('hidden');
  
  // Normalize scores (-100 to 100)
  const economic = Math.round((state.economicScore / (questions.length * 3)) * 100);
  const social = Math.round((state.socialScore / (questions.length * 3)) * 100);
  
  // Pusulada konum belirle
  const x = 50 + (economic * 0.4); // %50 merkez
  const y = 50 - (social * 0.4);   // %50 merkez
  
  elements.marker.style.left = `${x}%`;
  elements.marker.style.top = `${y}%`;
  
  // Sonuç metni
  let position = '';
  if (economic > 0 && social > 0) {
    position = 'solçu və avtoritar';
  } else if (economic > 0 && social < 0) {
    position = 'solçu və libertar';
  } else if (economic < 0 && social > 0) {
    position = 'sağçı və avtoritar';
  } else {
    position = 'sağçı və libertar';
  }
  
  elements.resultText.innerHTML = `
    <h3>Sizin Siyasi Mövqeyiniz</h3>
    <p><strong>İqtisadi Ox:</strong> ${economic > 0 ? 'Solçu' : 'Sağçı'} (${economic}%)</p>
    <p><strong>Sosial Ox:</strong> ${social > 0 ? 'Avtoritar' : 'Libertar'} (${social}%)</p>
    <p><strong>Ümumi:</strong> ${position}</p>
  `;
}

// Müzik kontrolü
function toggleMusic() {
  if (state.musicPlaying) {
    elements.bgMusic.pause();
    elements.musicIcon.className = 'fas fa-volume-mute';
  } else {
    elements.bgMusic.play();
    elements.musicIcon.className = 'fas fa-volume-up';
  }
  state.musicPlaying = !state.musicPlaying;
}

// Event listeners
elements.nextBtn.addEventListener('click', nextQuestion);
elements.restartBtn.addEventListener('click', () => {
  elements.resultContainer.classList.add('hidden');
  elements.quizContainer.classList.remove('hidden');
  initQuiz();
});

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
  // FontAwesome ikonları yükle
  const fa = document.createElement('link');
  fa.rel = 'stylesheet';
  fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  document.head.appendChild(fa);
  
  // Google Fonts yükle
  const gf = document.createElement('link');
  gf.rel = 'stylesheet';
  gf.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap';
  document.head.appendChild(gf);
  
  initQuiz();
});
