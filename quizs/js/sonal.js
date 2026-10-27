

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let answered = false;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

function startQuiz() {
    clearInterval(timer);

    currentQuestion = 0;
    score = 0;

    home.classList.add("d-none");
    result.classList.add("d-none");
    quiz.classList.remove("d-none");

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    answered = false;
    timeLeft = 30;

    const q = questions[currentQuestion];

    document.getElementById("question-count").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").textContent = q.question;
    document.getElementById("time").textContent = timeLeft;

    document.getElementById("progress").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    document.getElementById("next-btn").disabled = true;
    document.getElementById("next-btn").textContent =
        currentQuestion === questions.length - 1
            ? "See Result ->"
            : "Next Question ->";

    const options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.onclick = () => selectAnswer(index, button);
        options.appendChild(button);
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            revealAnswer(null);
        }
    }, 1000);
}

function selectAnswer(index, button) {
    if (answered) return;

    if (index === questions[currentQuestion].answer) {
        score++;
    }

    revealAnswer(index);
}

function revealAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    clearInterval(timer);

    const correctIndex = questions[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
    });

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);

    quiz.classList.add("d-none");
    result.classList.remove("d-none");

    const percentage = Math.round((score / questions.length) * 100);

    document.getElementById("final-score").textContent =
        `${score} / ${questions.length}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    document.getElementById("message").textContent =
        percentage >= 80 ? "Excellent! You are a champion!" :
        percentage >= 50 ? "Good job! Keep practicing!" :
        "Keep learning. You can do better!";
}
