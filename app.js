const WORD_ARRAY = [
    "the",
    "big",
    "brown",
    "lazy",
    "fox",
    "jumped",
    "over",
    "fence",
    "university",
    "zebra",
    "country",
    "mountain",
    "cat",
    "dog",
    "because",
    "of",
    "human",
    "dinosaur",
    "television",
    "radio",
    "bike",
    "car",
    "girrafe",
    "location",
    "house",
    "five",
    "ten",
    "program"
];

const wordDisplay = document.getElementById('word-display');
const input = document.getElementById('input');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
//const restartButton = document.getElementById('restart');
const results = document.querySelector('.results');
const wpm = document.getElementById('wpm');

var countDownTimer;

function setup(){
    wordDisplay.innerHTML = "";
    generateRandomWords();
    input.value = "";
    results.style.display = "none";
    currentWordCount = 0;
    clearInterval(countDownTimer);
    countDownTimer = setInterval(countDown, 1000);
    input.style.display = "block";
    input.focus();
    time = 60;
    timer.innerText = time;
    correctWords = 0;
}

function generateRandomWords(){
    for(let i = 0; i < 10; i++){
        const randomWord = document.createElement('p');
        randomWord.innerText = WORD_ARRAY[Math.floor(Math.random() * WORD_ARRAY.length)] + " ";
        wordDisplay.appendChild(randomWord);
    }
}

startButton.addEventListener('click', setup);

let currentWordCount = 0;
let correctWords = 0;

function checkText(){
    const currentWord = wordDisplay.children[currentWordCount].innerText;
    const lastChar = input.value[input.value.length - 1];

    if(lastChar == " "){
        if(input.value == currentWord){
            wordDisplay.children[currentWordCount].style.color = "green";
            correctWords++;
        }
        else{
            wordDisplay.children[currentWordCount].style.color = "red";
        }

        currentWordCount++;
        input.value = "";

        if(currentWordCount == 5){
            for(let i = 0; i < 5; i++){
                wordDisplay.children[0].remove();
            }
            currentWordCount = 0;
            generateRandomWords();
        }
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
    wpm.innerText = correctWords;
}