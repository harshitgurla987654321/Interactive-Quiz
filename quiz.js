const questions = [
    { question: "What is 2 + 2?", choices: ["3", "4", "5", "6"], correct: 1 },
    { question: "Capital of France?", choices: ["Paris", "Berlin", "Rome", "Madrid"], correct: 0 },
    { question: "What is the color of the sky?", choices: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
    { question: " What is 1+1?" ,choices:["2","3","5","1"],correct:0,},
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-question");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const quizContainer = document.getElementById("quiz-container");
const restartButton = document.getElementById("restart-quiz");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesList.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice");
        button.addEventListener("click", () => selectAnswer(index));
        li.appendChild(button);
        choicesList.appendChild(li);
    });

    feedback.textContent = "";
    nextButton.disabled = true;
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Wrong! The correct answer is ${currentQuestion.choices[currentQuestion.correct]}.`;
        feedback.style.color = "red";
    }

    nextButton.disabled = false;
}

function showScore() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreText.textContent = `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
});

loadQuestion();
