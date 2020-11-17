const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

if(mostRecentScore<=0){
    finalScore.innerText="YAY!!!  You are A happy person. Keep Smiling and Shining."
}
else if(0<mostRecentScore && mostRecentScore<=25){
    finalScore.innerText="You are having a low stress level. Be Calm and try this meditation music for additional benifits."
}
else if(25<mostRecentScore && mostRecentScore<=75){
    finalScore.innerText="You are having a moderate stress level.Try meditating for sometime and contact a nearby doctor."
}
else if(75<mostRecentScore && mostRecentScore<=100){
    finalScore.innerText="You are at high stress levels. Consult a Doctor for better results."
}
else if(100<mostRecentScore && mostRecentScore<=150){
    finalScore.innerText="Your Stress Level is Very High. Contact a Doctor immediately."
}
// finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};
