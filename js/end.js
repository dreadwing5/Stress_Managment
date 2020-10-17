const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

if(mostRecentScore<=0){
    finalScore.innerText="You are A happy person."
}
else if(0<mostRecentScore && mostRecentScore<=25){
    finalScore.innerText="You are having a low stress level.And may try this meditation music for additional benifits."
}
else if(25<mostRecentScore && mostRecentScore<=75){
    finalScore.innerText="You are having a moderate stress level.Read this article for releasing stress."
}
else if(75<mostRecentScore && mostRecentScore<=100){
    finalScore.innerText="You are at severe conditions.Consult a Doctor for better results."
}
else if(100<mostRecentScore && mostRecentScore<=150){
    finalScore.innerText="Your Stress Level is Very High. You should probably contact a Doctor."
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
