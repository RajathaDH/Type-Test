import wordsList from './words.js';

const wordRow1Element = document.querySelector('#wordRow1');
const wordRow2Element = document.querySelector('#wordRow2');
const textInputElement = document.querySelector('#textInput');
const timerElement = document.querySelector('#timer');
const startButtonElement = document.querySelector('#start');
const resultsElement = document.querySelector('#results');
const wpmElement = document.querySelector('#wpm');

const colours = {
    CORRECT_COLOUR: 'green',
    INCORRECT_COLOUR: 'red',
    BACKGROUND_COLOUR: 'yellow'
};

const WORDS_LENGTH = 10;
let words = {
    'row-1': [],
    'row-2': []
};
let currentWordCount = 0;
let correctWordsCount = 0;
let currentLength = 0;
let timer;
let currentTime = 60;

startButtonElement.addEventListener('click', setup);

function getRandomWords(length) {
    let words = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        const randomWord = wordsList[randomIndex];
        words.push(randomWord);
    }

    return words;
}

function setup() {
    words['row-1'] = getRandomWords(WORDS_LENGTH);
    words['row-2'] = getRandomWords(WORDS_LENGTH);

    renderWords(words);
    textInputElement.value = '';
    textInputElement.focus();

    currentTime = 60;
    timerElement.textContent = currentTime; 

    wordRow1Element.children[0].style.background = colours.BACKGROUND_COLOUR;

    clearInterval(timer);
    timer = setInterval(countDown, 1000);
}

function countDown() {
    currentTime -= 1;

    timerElement.textContent = currentTime;

    if (currentTime <= 0) {
        clearInterval(timer);
    }
}

function renderWords(words) {
    wordRow1Element.innerHTML = '';
    wordRow2Element.innerHTML = '';

    for (let i = 0; i < WORDS_LENGTH; i++) {
        const row1Word = document.createElement('span');
        row1Word.textContent = words['row-1'][i] + ' ';
        wordRow1Element.appendChild(row1Word);

        const row2Word = document.createElement('span');
        row2Word.textContent = words['row-2'][i] + ' ';
        wordRow2Element.appendChild(row2Word);
    }
}

function checkText() {
    const currentWordElement = wordRow1Element.children[currentWordCount];
    const currentWord = currentWordElement.textContent;
    const inputLength = textInputElement.value.length;
    const lastInputCharacter = textInputElement.value[textInputElement.value.length - 1];

    if (currentWord.slice(0, inputLength) === textInputElement.value) {
        currentWordElement.style.background = colours.BACKGROUND_COLOUR;
    } else {
        currentWordElement.style.background = colours.INCORRECT_COLOUR;
    }

    currentLength = inputLength;
    
    if (lastInputCharacter === ' ') {
        if (textInputElement.value === currentWord) {
            currentWordElement.style.color = colours.CORRECT_COLOUR;
            correctWordsCount += 1;
        } else {
            currentWordElement.style.color = colours.INCORRECT_COLOUR;
        }

        currentWordCount += 1;
        if (currentWordCount < 10) {
            textInputElement.value = '';
            currentWordElement.style.background = 'none';
            wordRow1Element.children[currentWordCount].style.background = colours.BACKGROUND_COLOUR;
        } else {
            currentWordCount = 0;
            currentLength = 0;
            updateWords();
            textInputElement.value = '';
            wordRow1Element.children[0].style.background = colours.BACKGROUND_COLOUR;
        }
    }
}

// expose function to window, only available in this file due to type module
window.checkText = checkText;

function updateWords() {
    wordRow1Element.innerHTML = wordRow2Element.innerHTML;

    words['row-2'] = getRandomWords(WORDS_LENGTH);

    wordRow2Element.innerHTML = '';

    for (let i = 0; i < WORDS_LENGTH; i++) {
        const row2Word = document.createElement('span');
        row2Word.textContent = words['row-2'][i] + ' ';
        wordRow2Element.appendChild(row2Word);
    }
}