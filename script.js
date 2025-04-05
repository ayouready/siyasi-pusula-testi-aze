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
    {
        question: "Bazar iqtisadiyyatı ən yaxşı iqtisadi sistemdir.",
        axis: "economic",
        direction: "right"
    }
];

// Proqramın vəziyyəti
const state = {
    currentQuestion: 0,
    answers: [],
    economicScore: 0,
    socialScore: 0,
    musicPlaying: false
};

// DOM elementləri
const elements = {
    quizContainer: document.getElementById('quiz-container'),
    progressBar: document.getElementById('progress-bar'),
    resultContainer: document.getElementById('result-container'),
    resultText: document.getElementById('result-text'),
    restartBtn: document.getElementById('restart-btn')
};

// Testi başlat
function initQuiz() {
    state.currentQuestion = 0;
    state.answers = [];
    state.economicScore = 0;
    state.socialScore = 0;
    renderQuestion();
    updateProgress();
}

// Sualı göstər
function renderQuestion() {
    const question = questions[state.currentQuestion];
    
    elements.quizContainer.innerHTML = `
        <div class="question-card">
            <div class="question-text">${state.currentQuestion + 1}. ${question.question}</div>
            <div class="options" id="options-container"></div>
            <button id="next-btn">${state.currentQuestion < questions.length - 1 ? 'Növbəti sual' : 'Nəticəni gör'}</button>
        </div>
    `;
    
    // Cavab seçimlərini yarat
    const optionsContainer = document.getElementById('options-container');
    const options = [
        { text: 'Tam razıyam', value: 3 },
        { text: 'Razıyam', value: 2 },
        { text: 'Qismən razıyam', value: 1 },
        { text: 'Bitərəfəm', value: 0 },
        { text: 'Qismən narazıyam', value: -1 },
        { text: 'Narazıyam', value: -2 },
        { text: 'Tam narazıyam', value: -3 }
    ];
    
    options.forEach(option => {
        const optionElement = document.createElement('label');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${option.value}">
            ${option.text}
        `;
        optionsContainer.appendChild(optionElement);
    });
    
    // Düyməyə klik hadisəsi əlavə et
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
}

// Növbəti suala keç
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert('Zəhmət olmasa bir cavab seçin!');
        return;
    }
    
    // Cavabı qeyd et
    const currentQ = questions[state.currentQuestion];
    const answerValue = parseInt(selectedOption.value);
    
    state.answers[state.currentQuestion] = {
        question: currentQ.question,
        value: answerValue,
        axis: currentQ.axis,
        direction: currentQ.direction
    };
    
    // Xalı hesabla
    if (currentQ.axis === 'economic') {
        state.economicScore += (currentQ.direction === 'left') ? answerValue : -answerValue;
    } else {
        state.socialScore += (currentQ.direction === 'authoritarian') ? answerValue : -answerValue;
    }
    
    // Növbəti suala keç və ya nəticəni göstər
    if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        renderQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// Nəticələri göstər
function showResults() {
    elements.quizContainer.classList.add('hidden');
    elements.resultContainer.classList.remove('hidden');
    
    // Xalları hesabla (-100 ilə 100 arası)
    const economic = Math.round((state.economicScore / (questions.length * 3)) * 100);
    const social = Math.round((state.socialScore / (questions.length * 3)) * 100);
    
    // Markerın yerini təyin et
    updateMarkerPosition(economic/2, social/2);
    
    // Nəticə mətni
    let position = '';
    if (economic > 0 && social > 0) position = 'solçu və avtoritar';
    else if (economic > 0 && social < 0) position = 'solçu və libertar';
    else if (economic < 0 && social > 0) position = 'sağçı və avtoritar';
    else position = 'sağçı və libertar';
    
    elements.resultText.innerHTML = `
        <h3>Sizin Siyasi Mövqeyiniz</h3>
        <p><strong>İqtisadi:</strong> ${economic > 0 ? 'Sol' : 'Sağ'} (${economic}%)</p>
        <p><strong>Sosial:</strong> ${social > 0 ? 'Avtoritar' : 'Libertar'} (${social}%)</p>
        <p><strong>Ümumi:</strong> ${position}</p>
    `;
}

// İlerləmə çubuğunu yenilə
function updateProgress() {
    const progress = ((state.currentQuestion + 1) / questions.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
}

// Markerın yerini yenilə
function updateMarkerPosition(x, y) {
    const marker = document.getElementById('marker');
    marker.style.left = `${50 + x}%`;
    marker.style.top = `${50 - y}%`;
}

// Pusula etiketlərini yarat
function initCompass() {
    const compass = document.getElementById('compass');
    const labels = ['SOL', 'SAĞ', 'AVTORİTAR', 'LİBERTAR'];
    const positions = ['left', 'right', 'top', 'bottom'];
    
    positions.forEach((pos, i) => {
        const label = document.createElement('div');
        label.className = `compass-label ${pos}`;
        label.textContent = labels[i];
        compass.appendChild(label);
    });
}

// Proqramı başlat
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initCompass();
});

// Yenidən başlat düyməsi
document.getElementById('restart-btn').addEventListener('click', () => {
    elements.resultContainer.classList.add('hidden');
    elements.quizContainer.classList.remove('hidden');
    initQuiz();
});
