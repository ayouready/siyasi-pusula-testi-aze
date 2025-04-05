// Sorular veritabanı
const questions = [
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
    // Daha fazla soru ekleyin...
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
    resultContainer: document.getElementById('result-container'),
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
    
    elements.quizContainer.innerHTML = `
        <div class="question-card">
            <div class="question-text">${state.currentQuestion + 1}. ${question.question}</div>
            <div class="options" id="options-container"></div>
            <button id="next-btn">Növbəti sual</button>
        </div>
    `;
    
    // Seçenekleri oluştur
    const optionsContainer = document.getElementById('options-container');
    const optionValues = [
        { text: 'Tam razıyam', value: 3 },
        { text: 'Razıyam', value: 2 },
        { text: 'Qismən razıyam', value: 1 },
        { text: 'Bitərəfəm', value: 0 },
        { text: 'Qismən narazıyam', value: -1 },
        { text: 'Narazıyam', value: -2 },
        { text: 'Tam narazıyam', value: -3 }
    ];
    
    optionValues.forEach((option, i) => {
        const optionElement = document.createElement('label');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${option.value}">
            ${option.text}
        `;
        optionsContainer.appendChild(optionElement);
    });
    
    // Buton event listener ekle
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
}

// Sonuçları göster
function showResults() {
    initCompass();
    
    // Skorları hesapla (-100 ile 100 arası)
    const economic = Math.round((state.economicScore / (questions.length * 3)) * 100);
    const social = Math.round((state.socialScore / (questions.length * 3)) * 100);
    
    updateMarkerPosition(economic/2, social/2); // -50% ile 50% arasında pozisyon
    
    elements.quizContainer.classList.add('hidden');
    elements.resultContainer.classList.remove('hidden');
    
    // Sonuç metni
    let position = '';
    if (economic > 0 && social > 0) position = 'solçu və avtoritar';
    else if (economic > 0 && social < 0) position = 'solçu və libertar';
    else if (economic < 0 && social > 0) position = 'sağçı və avtoritar';
    else position = 'sağçı və libertar';
    
    elements.resultText.innerHTML = `
        <p><strong>İqtisadi:</strong> ${economic > 0 ? 'Sol' : 'Sağ'} (${economic}%)</p>
        <p><strong>Sosial:</strong> ${social > 0 ? 'Avtoritar' : 'Libertar'} (${social}%)</p>
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

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', initQuiz);
