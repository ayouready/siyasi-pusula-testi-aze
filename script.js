const questions = [
    { text: "Dövlət zənginlərə daha çox vergi qoyaraq sosial proqramları maliyyələşdirməlidir.", axis: "economic", weight: -2 },
    { text: "Bazar iqtisadiyyatı hər sahədə daha effektiv nəticə verir.", axis: "economic", weight: 2 },
    { text: "Cəmiyyət ailə institutu ətrafında qurulmalıdır.", axis: "social", weight: 2 },
    { text: "Azad söz ifadəsi məhdudlaşdırılmamalıdır, hətta narahatedici olsa belə.", axis: "social", weight: -2 },
];

let currentQuestion = 0;
let economicScore = 0;
let socialScore = 0;

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const ecoRes = document.getElementById('economic-result');
const socRes = document.getElementById('social-result');
const compass = document.getElementById('compass');
const ctx = compass.getContext("2d");

const options = [
    { text: "Tam razıyam", value: 2 },
    { text: "Razıyam", value: 1 },
    { text: "Bitərəfəm", value: 0 },
    { text: "Razı deyiləm", value: -1 },
    { text: "Tam razı deyiləm", value: -2 }
];

// Sualları göstərmək funksiyası
function showQuestion() {
    const q = questions[currentQuestion];
    questionContainer.innerText = q.text;
    optionsContainer.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;
        btn.onclick = () => selectAnswer(opt.value);
        optionsContainer.appendChild(btn);
    });
    nextBtn.style.display = "none";  // Növbəti düymə gizlədilir
}

// Cavab seçimi funksiyası
function selectAnswer(value) {
    const q = questions[currentQuestion];
    if (q.axis === "economic") economicScore += q.weight * value;
    else if (q.axis === "social") socialScore += q.weight * value;

    nextBtn.style.display = "block";  // Növbəti düymə göstərilir
}

// Növbəti düyməsi ilə keçid
nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        nextBtn.style.display = "none";  // Yenidən növbəti düyməni gizlət
    } else {
        showResults();
    }
};

// Nəticələri göstərmək
function showResults() {
    questionContainer.style.display = "none";
    optionsContainer.style.display = "none";
    nextBtn.style.display = "none";
    resultDiv.style.display = "block";

    ecoRes.innerText = "İqtisadi Ox: " + economicScore;
    socRes.innerText = "Mədəni Ox: " + socialScore;
    drawCompass();
}

// Kompası çək
function drawCompass() {
    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    ctx.moveTo(150, 0); ctx.lineTo(150, 300);
    ctx.moveTo(0, 150); ctx.lineTo(300, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150 + economicScore * 5, 150 - socialScore * 5, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
}

// İlk sualı göstər
showQuestion();
