const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

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
