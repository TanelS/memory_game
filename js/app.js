/*
 * Create a list that holds all of your cards
 */

let timer;
let minutes = '0';
let seconds = '0';

function startTimer() {
    timer = setInterval(function () {
        seconds ++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000)
}


function stopTimer() {
    clearInterval(timer);
}

function formatTime() {
    let sec = seconds < 9 ? '0' + String(seconds) : String(seconds);
    let min = minutes < 9 ? '0' + String(minutes) : String(minutes);
    return min + ':' + sec;
}

function newGame() {
    let packOfCards = [];
    let cards = document.querySelectorAll(".card");
    let cardPack = document.querySelector(".deck");
    let stars = document.querySelectorAll(".fa-star-o");
    let counter = document.querySelector('.moves');
    counter.innerText = 0;
    for (let card of cards) {
        card.className = 'card';
        packOfCards.push(card);
    }

    shuffle(packOfCards);

    for (card of packOfCards) {
        cardPack.appendChild(card);
    }
    for (let star of stars) {
        star.className = 'fa fa-star';
    }
    startTimer(); //TODO:  ei funka korralikult

    console.log('Strars on:', stars); //TODO: kustuta!
}

function theGame() {
    let openCards = [];
    let moveCount = 0;
    let foundPairs = 0;
    let clickedCard;
    let cards = document.querySelectorAll(".card");
    let restartButton = document.querySelector('.fa-repeat');
    let timerDisplay = document.querySelector('.game-timer');
    timerDisplay.innerText = setInterval(function () {
        formatTime()
    },1000);


    restartButton.addEventListener('click', function () {
        openCards = [];
        moveCount = 0;
        foundPairs = 0;
        newGame();
    });
    for (card of cards) {
        card.addEventListener("click", function (card) {
            openCard(card);
            clickedCard = card.target;

            openCards.push(clickedCard);

            if (openCards.length === 2) {
                console.log('Kaks kaarti!');
                pairCheck(openCards);
                if (!pairCheck(openCards)) {
                    console.log('vastus kontrollist', pairCheck(openCards));
                    openCards = [];
                } else {
                    foundPairs ++;
                    console.log('Leitud paare', foundPairs);
                    openCards = [];
                }
                moveCount ++;
                displayMoveCount(moveCount);
                console.log('move cpount:', moveCount);
                if (foundPairs === 8) {
                    stopTimer();
                    alert('Game over!');
                }
            }
        });
    }
}


function openCard(card) {
    card.target.classList.toggle("show");
    card.target.classList.toggle("open");
}

function pairCheck(array) {
    let result = false;
    if (array[0].lastElementChild.className ===
        array[1].lastElementChild.className) {
        array[0].className = 'card match';
        array[1].className = 'card match';
        result = true;
    } else {
        array[0].className = 'card incorrect';
        array[1].className = 'card incorrect';
        setTimeout(function() {
        array[0].className = 'card';
        array[1].className = 'card';}, 1000)
    }
    return result;
}

function displayMoveCount(moves) {
    let counter = document.querySelector('.moves');
    let timerDisplay = document.querySelector('.game-timer');
    timerDisplay.innerText = formatTime();
    let stars = document.querySelectorAll('.fa-star');
    counter.innerText = moves;

    switch (moves) {
        case 0:
            stars[0].className = 'fa fa-star';
            stars[1].className = 'fa fa-star';
            stars[2].className = 'fa fa-star';
            break;
        case 10:
            stars[0].className = 'fa fa-star';
            stars[1].className = 'fa fa-star';
            stars[2].className = 'fa fa-star-o';
            break;
        case 20:
            stars[0].className = 'fa fa-star';
            stars[1].className = 'fa fa-star-o';
            stars[2].className = 'fa fa-star-o';
            break;
        case 40:
            stars[0].className = 'fa fa-star-o';
            stars[1].className = 'fa fa-star-o';
            stars[2].className = 'fa fa-star-o';
            break;
    }
}


    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

// Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


newGame();
theGame();
startTimer();
