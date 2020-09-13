const wordDisplay = document.getElementById('word-display');
const input = document.getElementById('input');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const results = document.querySelector('.results');
const wpm = document.getElementById('wpm');

const wordArray = ["the", "big", "brown", "lazy", "fox", "jumped", "over", "the", "fence"];

var countDownTimer;

function setup(){
    generateRandomWords();
    results.style.display = "none";
    currentWordCount = 0;
    clearInterval(countDownTimer);
    countDownTimer = setInterval(countDown, 1000);
    input.style.display = "block";
    input.focus();
    time = 60;
    timer.innerText = time;
}

function generateRandomWords(){
    wordDisplay.innerHTML = "";
    for(let i = 0; i < 20; i++){
        const randomWord = document.createElement('p');
        randomWord.innerText = wordArray[Math.floor(Math.random() * wordArray.length)] + " ";
        wordDisplay.appendChild(randomWord);
    }
}

startButton.addEventListener('click', setup);

var currentWordCount = 0;

function checkText(){
    const currentWord = wordDisplay.children[currentWordCount].innerText;
    const lastChar = input.value[input.value.length - 1];

    if(lastChar == " "){
        if(input.value == currentWord){
            wordDisplay.children[currentWordCount].style.color = "green";
        }
        else{
            wordDisplay.children[currentWordCount].style.color = "red";
        }

        currentWordCount++;
        input.value = "";
    }
}

let time = 60;

function countDown(){
    time--;
    timer.innerText = time;

    if(time == 0){
        clearInterval(countDownTimer);
        showResults();
        input.style.display = "none";
    }
}

function showResults(){
    results.style.display = "block";
    wpm.innerText = 10;
}