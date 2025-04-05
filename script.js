// 40 Tam Sual (20 İqtisadi + 20 Sosial)
const questions = [
    // İqtisadi (Sol=1-20)
    {question: "Dövlət əsas xidmətləri pulsuz təmin etməlidir", axis: "economic", direction: "left"},
    {question: "Bazar iqtisadiyyatı ən səmərəli sistemdir", axis: "economic", direction: "right"},
    {question: "Zənginlər daha çox vergi verməlidir", axis: "economic", direction: "left"},
    {question: "Dövlət müəssisələri özəlləşdirilməlidir", axis: "economic", direction: "right"},
    {question: "İşçilər şirkətlərdə səs hüququna malik olmalıdır", axis: "economic", direction: "left"},
    {question: "Gömrük vergiləri minimuma endirilməlidir", axis: "economic", direction: "right"},
    {question: "Əsas infrastruktur dövlət tərəfindən həyata keçirilməlidir", axis: "economic", direction: "left"},
    {question: "Həmkarlar ittifaqları gücləndirilməlidir", axis: "economic", direction: "left"},
    {question: "Dövlət sənayeyə müdaxilə etməməlidir", axis: "economic", direction: "right"},
    {question: "Təqaüd sistemi dövlət tərəfindən təmin edilməlidir", axis: "economic", direction: "left"},
    {question: "İstehsal vasitələri fərdlərə məxsus olmalıdır", axis: "economic", direction: "right"},
    {question: "Torpaq özəlləşdirilməlidir", axis: "economic", direction: "right"},
    {question: "Banklar dövlət nəzarətində olmalıdır", axis: "economic", direction: "left"},
    {question: "İşsizlik müavinətləri artırılmalıdır", axis: "economic", direction: "left"},
    {question: "Dövlət tərəfindən təbliğat aparılmalıdır", axis: "economic", direction: "left"},
    {question: "İstehsalat dövlət tərəfindən planlaşdırılmalıdır", axis: "economic", direction: "left"},
    {question: "İşçilər öz iş yerlərini idarə etməlidir", axis: "economic", direction: "left"},
    {question: "Dövlət sənətkarlığı dəstəkləməlidir", axis: "economic", direction: "left"},
    {question: "Tibb işçiləri daha çox maaş almalıdır", axis: "economic", direction: "left"},
    {question: "İctimai nəqliyyat pulsuz olmalıdır", axis: "economic", direction: "left"},
    
    // Sosial (21-40)
    {question: "Hökumət şəxsi hüquqları məhdudlaşdıra bilər", axis: "social", direction: "authoritarian"},
    {question: "Cins azlıqları eyni hüquqlara malik olmalıdır", axis: "social", direction: "libertarian"},
    {question: "Əsgərlik məcburi olmalıdır", axis: "social", direction: "authoritarian"},
    {question: "Dövlət mətbuatı nəzarət etməlidir", axis: "social", direction: "authoritarian"},
    {question: "Narkotik maddələrin istifadəsi azad olmalıdır", axis: "social", direction: "libertarian"},
    {question: "Din dövlət işlərindən ayrı olmalıdır", axis: "social", direction: "libertarian"},
    {question: "Cinayətkarlara daha sərt cəzalar verilməlidir", axis: "social", direction: "authoritarian"},
    {question: "Silah sahibliyi məhdudlaşdırılmalıdır", axis: "social", direction: "authoritarian"},
    {question: "Hər kəs öz bədəni haqqında özü qərar verməlidir", axis: "social", direction: "libertarian"},
    {question: "Milli mədəniyyət qorunmalıdır", axis: "social", direction: "authoritarian"},
    {question: "Həbsxanalar islah üçün deyil, cəza üçün olmalıdır", axis: "social", direction: "authoritarian"},
    {question: "İmmiqrantlar üçün daha sərt qaydalar tətbiq edilməlidir", axis: "social", direction: "authoritarian"},
    {question: "Həyat hüququ hər şeydən üstün olmalıdır", axis: "social", direction: "libertarian"},
    {question: "Dövlət sənətkarlığı dəstəkləməlidir", axis: "social", direction: "authoritarian"},
    {question: "Uşaq baxçası dövlət tərəfindən təmin edilməlidir", axis: "social", direction: "authoritarian"},
    {question: "Dövlət təhsil proqramlarını tənzimləməlidir", axis: "social", direction: "authoritarian"},
    {question: "Hər kəs öz ailə qurumunu seçməkdə azad olmalıdır", axis: "social", direction: "libertarian"},
    {question: "Milli təhlükəsizlik üçün şəxsi məlumatlar toplanmalıdır", axis: "social", direction: "authoritarian"},
    {question: "Dövlət vətəndaşların şəxsi həyatına qarışmamalıdır", axis: "social", direction: "libertarian"},
    {question: "Dövlət dinə müdaxilə etməməlidir", axis: "social", direction: "libertarian"}
];

// Proqram vəziyyəti
const state = {
    currentQuestion: 0,
    answers: [],
    economicScore: 0,
    socialScore: 0
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
    initCompass();
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

// Nəticələri göstər (DÜZƏLDİLMİŞ)
function showResults() {
    elements.quizContainer.classList.add('hidden');
    elements.resultContainer.classList.remove('hidden');
    
    // Xalları hesabla (-100 ilə 100 arası)
    const economic = Math.round((state.economicScore / 60) * 100); // 20 sual * max 3 xal
    const social = Math.round((state.socialScore / 60) * 100);
    
    // Markerın yerini təyin et (ƏSAS DÜZƏLDİLMƏ)
    updateMarkerPosition(
        (economic / 100) * 40, // X oxu: sol=negativ, sağ=pozitiv
        (social / 100) * 40    // Y oxu: aşağı=negativ, yuxarı=pozitiv
    );
    
    // Nəticə mətni
    let position = '';
    if (economic < 0 && social > 0) position = 'solçu və avtoritar';
    else if (economic < 0 && social < 0) position = 'solçu və libertar';
    else if (economic > 0 && social > 0) position = 'sağçı və avtoritar';
    else position = 'sağçı və libertar';
    
    elements.resultText.innerHTML = `
        <h3>Sizin Siyasi Mövqeyiniz</h3>
        <p><strong>İqtisadi:</strong> ${economic < 0 ? 'Sol' : 'Sağ'} (${Math.abs(economic)}%)</p>
        <p><strong>Sosial:</strong> ${social > 0 ? 'Avtoritar' : 'Libertar'} (${Math.abs(social)}%)</p>
        <p><strong>Ümumi:</strong> ${position}</p>
    `;
}

// Markerın yerini yenilə (DÜZƏLDİLMİŞ)
function updateMarkerPosition(x, y) {
    const marker = document.getElementById('marker');
    // Mərkəz nöqtəsi 50%,50% 
    // X oxu: sol= -, sağ= +
    // Y oxu: aşağı= -, yuxarı= +
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

// İlerləmə çubuğunu yenilə
function updateProgress() {
    const progress = ((state.currentQuestion + 1) / questions.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
}

// Yenidən başlat düyməsi
elements.restartBtn.addEventListener('click', () => {
    elements.resultContainer.classList.add('hidden');
    elements.quizContainer.classList.remove('hidden');
    initQuiz();
});

// Proqramı başlat
document.addEventListener('DOMContentLoaded', initQuiz);
