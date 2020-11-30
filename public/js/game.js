const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
// const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const questionElement = document.getElementById("quiz-container");
const choiceElement = document.getElementById("choice-animation");
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let flag = 0;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
   
    
    if (availableQuesions.length === 0 || questionCounter === MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        document.getElementById("button").style.display = 'block';
        flag = 1;
    }
    if (flag === 0) {
        questionCounter++;
        questionElement.classList.add("question-slide");
        choiceElement.classList.add("choice-slide");
    }

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    console.log(currentQuestion);
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;
            questionElement.classList.remove("question-slide");
            choiceElement.classList.remove("choice-slide");

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const classToApply = selectedChoice.dataset['number'];


        if (classToApply == 1) {
            incrementScore(15);
        } else if (classToApply == 2) {
            incrementScore(10)
        } else if (classToApply == 3) {
            incrementScore(5)
        } else if (classToApply == 4) {
            incrementScore(0)
        } else if (classToApply == 5) {
            incrementScore(-5)
        }
        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 600);
    });
});

incrementScore = (num) => {
    score += num;
};