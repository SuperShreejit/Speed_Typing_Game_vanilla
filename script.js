const timer = document.getElementById('timer');
const text = document.getElementById('text');
const input = document.getElementById('input');

const RANDOM_OUOTE_API_URL = "http://api.quotable.io/random";
let startTime;

input.addEventListener('input',validate);

function validate() {
  const quoteSpanArr = text.querySelectorAll('span');
  const arrayValue = input.value.split("");
  let correct = true;
  quoteSpanArr.forEach((charSpan,index)=>{
    const character = arrayValue[index];
    if(character == null){
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      correct = false;
    }
    else if(character === charSpan.innerText){
      charSpan.classList.add('correct');
      charSpan.classList.remove('incorrect');
    }
    else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      correct = false;
    }
  });
  toNextQuote(correct);
}

function getRandomQuote() {
  return fetch(RANDOM_OUOTE_API_URL)
  .then(res=> res.json())
  .then(data=>data.content)
  .catch(err =>console.error(err));
}

async function showNewQuote() {
  const quote = await getRandomQuote();
  text.innerText = "";
  quote.split('').forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    text.appendChild(charSpan);
  });
  input.value= null;
  startTimer();
}

function toNextQuote(isCorrect) {
  if (isCorrect) showNewQuote();
}

function startTimer(){
  timer.innerText = 0;
  startTime = new Date();
  setInterval(()=>{
    timer.innerText = getTimerTime();
  },1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime)/1000);
}

showNewQuote();