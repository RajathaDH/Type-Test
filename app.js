import wordsList from './words.js';

const wordRow1Element = document.querySelector('#wordRow1');
const wordRow2Element = document.querySelector('#wordRow2');
const textInputElement = document.querySelector('#textInput');
const timerElement = document.querySelector('#timer');
const startButtonElement = document.querySelector('#start');
const resultsElement = document.querySelector('#results');
const wpmElement = document.querySelector('#wpm');
const accuracyElement = document.querySelector('#accuracy');

const colours = {
    CORRECT_COLOUR: 'green',
    INCORRECT_COLOUR: 'red',
    BACKGROUND_COLOUR: 'yellow'
};

const WORDS_LENGTH = 10;
const TIME_LIMIT = 60;
let words = {
    'row-1': [],
    'row-2': []
};
let currentWordIndex = 0;
let correctWordsCount = 0;
let totalWordsCount = 0;
let timer;
let currentTime = 0;

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

    renderWords(words['row-1'], wordRow1Element);
    renderWords(words['row-2'], wordRow2Element);

    resultsElement.style.display = 'none';
    wordRow1Element.children[0].style.background = colours.BACKGROUND_COLOUR;
    textInputElement.value = '';
    textInputElement.focus();

    correctWordsCount = 0;
    totalWordsCount = 0;
    currentWordIndex = 0;

    currentTime = TIME_LIMIT;
    timerElement.textContent = currentTime;
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
}

function countDown() {
    currentTime -= 1;

    timerElement.textContent = currentTime;

    if (currentTime <= 0) {
        clearInterval(timer);
        showResults();
    }
}

function renderWords(words, element) {
    element.innerHTML = '';

    for (let i = 0; i < words.length; i++) {
        const word = document.createElement('span');
        word.textContent = words[i] + ' ';
        element.appendChild(word);
    }
}

function checkText() {
    const currentWordElement = wordRow1Element.children[currentWordIndex];
    const currentWord = currentWordElement.textContent;
    const inputLength = textInputElement.value.length;
    const lastInputCharacter = textInputElement.value[textInputElement.value.length - 1];

    if (currentWord.slice(0, inputLength) === textInputElement.value) {
        currentWordElement.style.background = colours.BACKGROUND_COLOUR;
    } else {
        currentWordElement.style.background = colours.INCORRECT_COLOUR;
    }
    
    if (lastInputCharacter === ' ') {
        if (textInputElement.value === currentWord) {
            currentWordElement.style.color = colours.CORRECT_COLOUR;
            correctWordsCount += 1;
        } else {
            currentWordElement.style.color = colours.INCORRECT_COLOUR;
        }

        totalWordsCount += 1;
        currentWordIndex += 1;

        if (currentWordIndex < 10) {
            textInputElement.value = '';
            currentWordElement.style.background = 'none';
            wordRow1Element.children[currentWordIndex].style.background = colours.BACKGROUND_COLOUR;
        } else {
            currentWordIndex = 0;
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

    renderWords(words['row-2'], wordRow2Element);
}

function showResults() {
    wpmElement.textContent = correctWordsCount;
    accuracyElement.textContent = totalWordsCount ? `${(correctWordsCount / totalWordsCount) * 100}%` : '0%';

    resultsElement.style.display = '';
}