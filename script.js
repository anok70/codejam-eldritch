import cardsDataBlue from './data/mythicCards/blue/index.js';
import cardsDataBrown from './data/mythicCards/brown/index.js';
import cardsDataGreen from './data/mythicCards/green/index.js';

let difficult = document.querySelector('.difficulty');
let shuffleBtn = document.querySelector('.shuffle-button');

// нажатие на  кнопку "Средняя"
difficult.addEventListener('click', diffChoice);

function diffChoice(){
    if (difficult.classList.contains('active')) {
        deckCardBack.classList.remove('visible');
        shuffleBtn.classList.remove('visible');  
        lastCard.classList.remove('visible');
    }
   else {
    shuffleBtn.classList.add('visible');
   }
   difficult.classList.toggle('active');
}

// нажатие на "Древний"
let ancient = document.querySelector('.ancient-card');
ancient.addEventListener('click', () => {
    ancient.classList.toggle('activeBorder');
    difficult.classList.toggle('visible');
    shuffleBtn.classList.remove('visible');
    difficult.classList.remove('active');
    deckCardBack.classList.remove('visible');
    lastCard.classList.remove('visible');
});

//  нажатие на "Замешать колоду"
let deckCardBack = document.querySelector('.deck');
shuffleBtn.addEventListener('click', () => {
    deckCardBack.classList.add('visible');
    shuffleBtn.classList.remove('visible');
})






// логика перемешивания карт Древнего
const ancientsData = {
    id: 'azathoth',
    name: 'azathoth',
    firstStage: {
        greenCards: 1,
        blueCards: 1,
        brownCards: 2,
    },
    secondStage: {
        greenCards: 2,
        blueCards: 1,
        brownCards: 3,
    },
    thirdStage: {
        greenCards: 2,
        blueCards: 0,
        brownCards: 4,
    },
};

function greenCards () {
    let greenTotal = ancientsData.firstStage.greenCards + 
    ancientsData.secondStage.greenCards + 
    ancientsData.thirdStage.greenCards;

    return greenTotal; // к-во зеленых карточек для 3-х стадий
}

function brownCards () {
    let brownTotal = ancientsData.firstStage.brownCards + 
    ancientsData.secondStage.brownCards + 
    ancientsData.thirdStage.brownCards;

    return brownTotal; // к-во коричневых карточек для 3-х стадий
}

function blueCards () {
    let blueTotal = ancientsData.firstStage.blueCards + 
        ancientsData.secondStage.blueCards + 
        ancientsData.thirdStage.blueCards;

    return blueTotal; // к-во синих карточек для 3-х стадий
}

function randomNumber(min, max){
    return Math.floor(min + Math.random() * (max - min + 1));
}

// создать массив рандомных карт по цвету в заданном кол-ве 
function greenRandomArr(){
    let greenStopka = [];
    let copyCards = [...cardsDataGreen]; // создать копию
    let max = cardsDataGreen.length - 1;
    for (let i = 0; i < greenCards(); i++, max--){
        let r = randomNumber(0, max);
        greenStopka.push(copyCards[r]);
        copyCards.splice(r, 1);
    }

    return greenStopka;
}

// создать массив рандомных карт по цвету в заданном кол-ве 
function brownRandomArr(){
    let brownStopka = [];
    let copyCards = [...cardsDataBrown]; // создать копию
    let max = cardsDataBrown.length - 1;
    for (let i = 0; i < brownCards(); i++, max--){
        let r = randomNumber(0, max);
        brownStopka.push(copyCards[r]);
        copyCards.splice(r, 1);
    }

    return brownStopka;
}

// создать массив рандомных карт по цвету в заданном кол-ве 
function blueRandomArr(){
    let blueStopka = [];
    let copyCards = [...cardsDataBlue]; // создать копию
    let max = cardsDataBlue.length - 1;
    for (let i = 0; i < blueCards(); i++, max--){
        let r = randomNumber(0, max);
        blueStopka.push(copyCards[r]);
        copyCards.splice(r, 1);
    }

    return blueStopka;
}

// перемешиваем карты выбранного стейджа
function shuffle(resultStage) {
    let shuffledResultStage = resultStage;
    let randomIndex = randomNumber(0, shuffledResultStage.length - 1);
    if (randomIndex !== shuffledResultStage.length - 1) {
        let temp = shuffledResultStage[shuffledResultStage.length - 1];
        shuffledResultStage[shuffledResultStage.length - 1] = shuffledResultStage[randomIndex];
        shuffledResultStage[randomIndex] = temp;
    }

    return shuffledResultStage;
}

let greenStopka = greenRandomArr();
let brownStopka = brownRandomArr();
let blueStopka = blueRandomArr();

function createCardsForFirstStage() {
  let resultStage = [];

  let greenFirstCount = ancientsData.firstStage.greenCards;
  resultStage = [...greenStopka.slice(0, greenFirstCount)];

  let brownFirstCount = ancientsData.firstStage.brownCards;
  resultStage = [...resultStage, ...brownStopka.slice(0, brownFirstCount)];

  let blueFirstCount = ancientsData.firstStage.blueCards;
  resultStage = [...resultStage, ...blueStopka.slice(0, blueFirstCount)];

  let shuffledResultStage = shuffle(resultStage);
  return shuffledResultStage;
}

function createCardsForSecondStage() {
    let resultStage = [];
  
    let greenFirstCount = ancientsData.firstStage.greenCards;
    let greenSecondCount = ancientsData.secondStage.greenCards;
    resultStage = [...greenStopka.slice(greenFirstCount, greenFirstCount + greenSecondCount)];
  
    let brownFirstCount = ancientsData.firstStage.brownCards;
    let brownSecondCount = ancientsData.secondStage.brownCards;
    resultStage = [...resultStage, ...brownStopka.slice(brownFirstCount, brownFirstCount + brownSecondCount)];
  
    let blueFirstCount = ancientsData.firstStage.blueCards;
    let blueSecondCount = ancientsData.secondStage.blueCards;
    resultStage = [...resultStage, ...blueStopka.slice(blueFirstCount, blueFirstCount + blueSecondCount)];
  
    let shuffledResultStage = shuffle(resultStage);
    return shuffledResultStage;
}

function createCardsForThirdStage() {
    let resultStage = [];
  
    let greenFirstCount = ancientsData.firstStage.greenCards;
    let greenSecondCount = ancientsData.secondStage.greenCards;
    resultStage = [...greenStopka.slice(greenFirstCount + greenSecondCount)];

    let brownFirstCount = ancientsData.firstStage.brownCards;
    let brownSecondCount = ancientsData.secondStage.brownCards;
    resultStage = [...resultStage, ...brownStopka.slice(brownFirstCount + brownSecondCount)];
  
    let blueFirstCount = ancientsData.firstStage.blueCards;
    let blueSecondCount = ancientsData.secondStage.blueCards;
    resultStage = [...resultStage, ...blueStopka.slice(blueFirstCount + blueSecondCount)];
  
    let shuffledResultStage = shuffle(resultStage);
    return shuffledResultStage;
}

console.log('green all ', greenStopka);
console.log('brown all ', brownStopka);
console.log('blue all ', blueStopka);

console.log(createCardsForFirstStage());
console.log(createCardsForSecondStage());
console.log(createCardsForThirdStage());

let stack = [].concat(
    createCardsForFirstStage(), 
    createCardsForSecondStage(), 
    createCardsForThirdStage()
);

console.log(stack);

// нажатие на карту("на рубашку")

let lastCard = document.querySelector('.last-card');
let image = document.querySelector('.image');
let indexGetCard = 0;
deckCardBack.addEventListener('click', () => {
    lastCard.classList.add('visible'); 
    image.setAttribute('src', `${stack[indexGetCard].cardFace}`); 
    indexGetCard ++;
   
});
