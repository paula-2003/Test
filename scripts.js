const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let scoreDisplay = document.getElementById("score");
console.log(parseInt(scoreDisplay.innerText))
let allCardsMatched = false;
let remainingCards = 8;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;


    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    compareCards();
    resetBoard();
    remainingCards--;
    if (remainingCards === 0) {
        allCardsMatched = true;
        displayCongratulations();
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        compareCards()
        resetBoard();
    }, 3000);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));




let score = 0;
let x = 2;
function compareCards() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        scoreDisplay.innerText = parseInt(scoreDisplay.innerText) + x;
    } else if (firstCard.dataset.framework != secondCard.dataset.framework) {
        scoreDisplay.innerText = parseInt(scoreDisplay.innerText) - 1;
        if (parseInt(scoreDisplay.innerText) < 0) {
            scoreDisplay.innerText = 0;
        }
    }
}

function displayCongratulations() {
    let congrats = document.getElementById('congrats');
    congrats.innerText = `Herzlichen Glückwunsch, du hast das Spiel erfolgreich beendet. Dein Highscore ist: ${scoreDisplay.innerText}`;
    document.body.appendChild(congrats);
}

