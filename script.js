const questions = [
    { text: "Dövlət zənginlərə daha çox vergi qoyaraq sosial proqramları maliyyələşdirməlidir.", axis: "economic", weight: -2 },
    { text: "Bazar iqtisadiyyatı hər sahədə daha effektiv nəticə verir.", axis: "economic", weight: 2 },
    { text: "Cəmiyyət ailə institutu ətrafında qurulmalıdır.", axis: "social", weight: 2 },
    { text: "Azad söz ifadəsi məhdudlaşdırılmamalıdır, hətta narahatedici olsa belə.", axis: "social", weight: -2 },
    { text: "Dövlət əhalinin təhsilinə daha çox yatırım etməlidir.", axis: "economic", weight: -1 },
    { text: "Əmək bazarında daha az müdaxilə olmalıdır.", axis: "economic", weight: 1 },
    { text: "Sosial dövlət və sosial təhlükəsizlik sistemləri gücləndirilməlidir.", axis: "social", weight: -1 },
    { text: "Şəxsi mülkiyyət hüquqları daha ciddi qorunmalıdır.", axis: "economic", weight: 2 },
    { text: "Qadınların siyasi həyatda daha çox yer alması təşviq edilməlidir.", axis: "social", weight: 1 },
    { text: "LGBT hüquqları daha çox müdafiə edilməlidir.", axis: "social", weight: -1 },
    { text: "Hökumət özəl sektora daha çox sərmayə qoymalı və özəl təşəbbüsləri dəstəkləməlidir.", axis: "economic", weight: -2 },
    { text: "Bütün dövlət xidmətləri pulsuz olmalıdır.", axis: "economic", weight: 1 },
    { text: "İnsanlar özlərini istədikləri şəkildə ifadə etməlidirlər, heç kimə məhdudiyyət qoyulmamalıdır.", axis: "social", weight: 2 },
    { text: "İctimai təhsil daha çox qiymətləndirilməli və təhsil sisteminə ciddi islahatlar aparılmalıdır.", axis: "economic", weight: -1 },
    { text: "Hökumət ən yüksək təhsil səviyyəsini təmin etməlidir, ancaq bunu yalnız peşəkar ixtisaslara əsaslanaraq etməlidir.", axis: "economic", weight: 1 },
    { text: "Dövlət işçi haqlarını müəyyən etməməli, bazar özü tənzimlənməlidir.", axis: "economic", weight: 2 },
    { text: "Yerli icmalar öz idarəetmələrində daha çox müstəqil olmalıdır.", axis: "social", weight: 2 },
    { text: "Din dövlət işlərinə qarışmamalıdır.", axis: "social", weight: 2 },
    { text: "Gəlir vergisi bütün vətəndaşlar üçün bərabər olmalıdır.", axis: "economic", weight: -2 },
    { text: "İnsanlar öz şəxsi həyatlarını dövlətin müdaxiləsi olmadan qurmalıdır.", axis: "social", weight: 1 },
    { text: "Özəl sektor işçiləri üçün hüquqlar təmin edilməlidir.", axis: "economic", weight: -1 },
    { text: "Bütün şəxsi mülkiyyətlər dövlətə verilərək yenidən paylanmalıdır.", axis: "economic", weight: -2 },
    { text: "Hökumət insanlara azad seçimlər verməlidir, lakin sosial ədalətə də diqqət yetirməlidir.", axis: "social", weight: 1 },
    { text: "Əhalinin böyük bir hissəsi dövlət yardımlarına ehtiyac duymamalıdır.", axis: "economic", weight: 1 },
    { text: "Cəmiyyətdə hər kəsin fərqli hüquqları olmalıdır, bu isə bərabərlikdən daha vacibdir.", axis: "social", weight: -1 },
    { text: "Dövlət mülkiyyətin əl dəyişməsinə müdaxilə etməməlidir.", axis: "economic", weight: 2 },
    { text: "Dövlət iqtisadiyyatın bütün sahələrinə nəzarət etməlidir.", axis: "economic", weight: -2 },
    { text: "Cəmiyyətdə hər bir fərd öz fikirlərini sərbəst şəkildə ifadə etməlidir, amma ictimai əxlaqı qorumaq şərtilə.", axis: "social", weight: 1 },
    { text: "Ailə başçısının hüquqları yalnız ata ilə məhdudlaşmamalıdır.", axis: "social", weight: 2 },
    { text: "Dövlət qanunlarını pozan şəxslər daha sərt cəzalarla cəzalandırılmalıdır.", axis: "social", weight: -1 },
    { text: "İnsanların öz seçdiyi liderlərə sadiq qalması və hər şeydə onlar üçün uyğun qərarlar alması vacibdir.", axis: "social", weight: -2 },
    { text: "İnsanların öz işlərini özünə aid olması və dövlətin onlara müdaxilə etməməsi vacibdir.", axis: "economic", weight: 2 },
    { text: "Hökumət bir çox sahədə monopoliyaya sahib olmalıdır.", axis: "economic", weight: -2 },
    { text: "Bütün dünyada sərhədlər aradan qaldırılmalıdır.", axis: "social", weight: 2 },
    { text: "İctimai səhiyyə dövlət tərəfindən təmin edilməli, amma insanların öz şəxsi sağlamlığına məsuliyyət daşıması vacibdir.", axis: "economic", weight: -1 },
    { text: "Əmək bazarında dövlətin nəzarəti daha çox olmalıdır.", axis: "economic", weight: 1 },
    { text: "Dövlət təhlükəsizliyi üçün daha çox sərmayə qoyulmalıdır.", axis: "social", weight: -1 },
    { text: "Təhsildə fərdi yanaşma tətbiq edilməlidir və hər kəsin öz qabiliyyətinə görə təhsil alması təmin edilməlidir.", axis: "economic", weight: 1 }
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
