
/*
 * Create a list that holds all of your cards
 */
// Timer (start) ==========================================================
// Although using setInterval() is not that complicated I wathed
// https://discussions.udacity.com/t/memory-game-timer-help-please/784074
// and thied that solution. What I do not like about that is the use
// of the global variables. Timer functionality should be redisgned

let timer;
let minutes = 0;
let seconds = 0;
let gameStars = 0;
let runTimer = false;
let timerDisplay = document.querySelector('.game-timer');

function startTimer() {
    timer = setInterval(function () {
        seconds ++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timerDisplay.innerText = formatTime();
        }, 1000)
}


function stopTimer() {
    clearInterval(timer);
}

function formatTime() {
    let sec = seconds <= 9 ? '0' + String(seconds) : String(seconds);
    let min = minutes <= 9 ? '0' + String(minutes) : String(minutes);
    return min + ':' + sec;
}


// Timer (end) ==========================================================

// New game starting code. Unfortunately there is some code repetition from
// other functions.

function newGame() {
    let packOfCards = []; // here are the cards added for reshuffling
    let cards = document.querySelectorAll(".card");
    let cardPack = document.querySelector(".deck");
    let stars = document.querySelectorAll(".fa-star-o");
    let counter = document.querySelector('.moves');
    // new 'empty' values for the game
    timerDisplay.innerText = '00:00';
    counter.innerText = 0;
    for (let card of cards) {
        card.className = 'card';
        packOfCards.push(card);
    }

    // shuffling:
    shuffle(packOfCards);

    // adding reshuffled cards bach to the DOM:
    for (card of packOfCards) {
        cardPack.appendChild(card);
    }
    // changes stars to the maximum value, some might have retained state
    // from previous game
    for (let star of stars) {
        star.className = 'fa fa-star';
    }
    startTimer(); //TODO: kind of works but ... fix!
}

// Main function for running the game:

function theGame() {
    let openCards = [];
    let moveCount = 0;
    let foundPairs = 0;
    let clickedCard;
    let cards = document.querySelectorAll(".card");
    let restartButton = document.querySelector('.fa-repeat');

    // Eventlistener for clicks on the cards

    restartButton.addEventListener('click', function () {
        stopTimer();
        newGame();
    });
    for (card of cards) {
        card.addEventListener("click", function (card) {
            openCard(card);
            // startTimer(); // when starts from here the time starts to 'travel'
            runTimer = true;
            clickedCard = card.target;

            openCards.push(clickedCard);

            if (openCards.length === 2) {
                // Checking if the pair exist in th external function:
                pairCheck(openCards);
                if (!pairCheck(openCards)) {
                    // empties the array
                    openCards = [];
                } else {
                    // case when there is a match
                    foundPairs ++;
                    openCards = [];
                }
                moveCount ++;  // increases the move counter
                displayMoveCount(moveCount);
                console.log(foundPairs);
                // for ending the game, the maximum on pairs is 8
                if (foundPairs === 8) {
                    stopTimer(); // stops the timer
                    modalWinner(); // displays the modal window
                }
            }
        });
    }
}

// For 'flipping' the card:
function openCard(card) {
    card.target.classList.toggle("show");
    card.target.classList.toggle("open");
}

// Match cheking:
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
            array[1].className = 'card';}, 1000) // waits 1 second when no match
    }
    return result; // returns true/false
}


// code for changing the stars. A bit cumbersome code, but works
function displayMoveCount(moves) {
    let counter = document.querySelector('.moves');
    // let timerDisplay = document.querySelector('.game-timer');
    timerDisplay.innerText = formatTime();
    let starPanel = document.querySelector('.stars');
    let stars = starPanel.getElementsByTagName('i');
    counter.innerText = moves;

    switch (moves) {
        case 0:
            stars[0].className = 'fa fa-star';
            stars[1].className = 'fa fa-star';
            stars[2].className = 'fa fa-star';
            gameStars = 3;
            break;
        case 10:
            stars[0].className = 'fa fa-star';
            stars[1].className = 'fa fa-star';
            stars[2].className = 'fa fa-star-o';
            gameStars = 2;
            break;
        case 20:
            stars[0].className = 'fa fa-star';
            stars[1].className = 'fa fa-star-o';
            stars[2].className = 'fa fa-star-o';
            gameStars = 1;
            break;
        case 40:
            stars[0].className = 'fa fa-star-o';
            stars[1].className = 'fa fa-star-o';
            stars[2].className = 'fa fa-star-o';
            gameStars = 0;
    }
}

//Modal window stuff (start) - https://www.w3schools.com/howto/howto_css_modals.asp

function modalWinner() {
    let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName("close")[0];
    let secondsSpent = document.querySelector('.sec');
    let minutesSpent = document.querySelector('.min');
    let earnedStars = document.querySelector('.earned-stars');
    let playAgainButton = document.querySelector('#play-again');
    secondsSpent.innerText = seconds;
    minutesSpent.innerText = minutes;
    earnedStars.innerText = gameStars;
    playAgainButton.addEventListener('click', function () {
        newGame();
        modal.style.display = "none";
    });


    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    };
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
//Modal window stuff (end)




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
