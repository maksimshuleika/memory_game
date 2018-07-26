const oneDeck = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bomb'];

const cards = oneDeck.concat(oneDeck);

let count;

// Restart of the game using restart button
document.querySelector('.restart').addEventListener('click', displayCards);

// Start of new game from pop up window with scores
document.querySelector('.green-button').addEventListener('click', function() {
    hidePopUp();
    displayCards();
});

//document.querySelector('.card').addEventListener('click', setTime);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}

// Function to start the game
function displayCards(event) {
    restartTime();
    removeCards();
    shuffle();
    showCards();
    addListeners();
    resetCounter();
    resetStars();
}

// Showing all cards in window	
function showCards() {
    let str = "";
    cards.forEach(function(card) {
        str += '<li class="card">' + '<i class="' + card + '"></i>' + '</li>'
    });
    document.querySelector('.deck').innerHTML = str;
}

// Removing all cards from window
function removeCards() {
    document.querySelector('.deck').innerHTML = "";
}

// Moves' counter
function counter(){
    let element = document.querySelector('.moves')
    count = Number(element.innerText);
    count += 1;
    displayStar(count);
    element.innerText = count;
}

//Logic for comparing cards to match
function openCard(event) {
    let element = this;
    if (!element.classList.contains("open")) {
        counter();
    };
    startTime();
    let opened_cards = document.querySelectorAll('.show.open:not(.match)');

    if (opened_cards.length === 1 && opened_cards[0] === element)
        return;

    element.classList.add("open", "show");

    if (opened_cards.length > 0 ) {
        if (card_class(opened_cards[0]) === card_class(element) &&
            opened_cards[0] != element) {
            setTimeout(function(){ match(element, opened_cards[0]) }, 300);
        } else {
            setTimeout(function(){
                shake(element, opened_cards[0]);
                close(element, opened_cards[0]);
            }, 300);
            setTimeout(function(){
                stop_shake(element, opened_cards[0]);
            }, 800);
        }
    }
}

// Pop up window with scores on win
function popUp(){
    let opened_cards = document.querySelectorAll('.match')
    if (opened_cards.length == 16) {
        showPopUp();
    }
}

// Getting card class name
function card_class(element) {
    return element.children[0].className;
}

// Closing unmatch cards
function close(element1, element2) {
    element1.classList.remove("open","show");
    element2.classList.remove("open","show");
}

// Shaking cards on wrong match
function shake(element1, element2) {
    element1.classList.add("apply-shake");
    element2.classList.add("apply-shake");
}

// Stop shaking cards on wrong match
function stop_shake(element1, element2) {
    element1.classList.remove("apply-shake");
    element2.classList.remove("apply-shake");
}

// Showing cards as 'match'
function match(element1, element2) {
    element1.classList.add("match");
    element2.classList.add("match");
    setTimeout(popUp, 500);
}

// Adding event listener on card opening
function addListeners() {
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', openCard);
    }
}


// Reset moves counter to 0
function resetCounter() {
    document.querySelector('.moves').innerText = "0";
}

// Hiding main window and showing pop up window
function showPopUp() {
    let cont_popup = document.querySelector('.container_popup');
    let container = document.querySelector('.container');
    cont_popup.classList.remove("hide-window");
    container.classList.remove("show-window");
    cont_popup.classList.add("show-window");
    container.classList.add("hide-window");
    movesPopUp();
    timeSpent();
    stars();
}

// Hiding pop up window and showing main window
function hidePopUp() {
    let cont_popup = document.querySelector('.container_popup');
    let container = document.querySelector('.container');
    cont_popup.classList.remove("show-window");
    container.classList.remove("hide-window");
    cont_popup.classList.add("hide-window");
    container.classList.add("show-window");
}

// Displaying of moves on finish pop up
function movesPopUp() {
    let moves = document.querySelector('.scores').innerText;
    moves = "With " + count + " moves!";
    document.querySelector('.scores').innerText = moves;
}

// Displaying spent time on finish pop up
function timeSpent() {
    let time_spent = document.querySelector('.time').innerText;
    time_spent = "Time spent: ";
    let time = pad(parseInt(totalSeconds / 60)) + ":" + pad(totalSeconds % 60);
    document.querySelector('.time').innerText = time_spent + " " + time;
}

// Displaying stars on finish pop up
function stars() {
    let stars_count = document.getElementsByClassName("fa-star").length;

    let str = '<li><i class="fa fa-star"></i></li>';
    let stars = document.querySelector('.stars-total').innerText;

    stars = "With " + stars_count + " stars!";
    document.querySelector('.stars-total').innerText = stars;
}

// Displaying stars while playing
function displayStar(arg) {
    let str = '<li><i class="fa fa-star"></i></li>';
    let result = document.querySelector('.stars').innerHTML = "";
    let star;

    if (arg <= 26 ) {
        star = 3;
    } else if (arg > 26 && arg < 40 ){
        star = 2;
    } else {
        star = 1;
    }

    result = str.repeat(star);
    document.querySelector('.stars').innerHTML = result;
}

// Reset of stars
function resetStars(){
    let str = '<li><i class="fa fa-star"></i></li>';
    let reset = document.querySelector('.stars').innerHTML = "";
    let result = str.repeat(3);
    document.querySelector('.stars').innerHTML = result;
}

/*
 * Code for timer was taken from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
 */

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let timerId = null;

function startTime(){
    if (timerId == null) {
        timerId = setInterval(incrementTime, 1000);
    }
}

function restartTime(){
    if (timerId != null) {
        clearInterval(timerId);
        timerId = null;
        totalSeconds = 0;
        displayTime();
    }
}

function displayTime(){
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function incrementTime(){
    totalSeconds++;
    displayTime();
}

displayCards(this);
