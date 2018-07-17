var cards = [
	'fa fa-diamond',
	'fa fa-paper-plane-o',
	'fa fa-anchor',
	'fa fa-bolt',
	'fa fa-cube',
	'fa fa-leaf',
	'fa fa-bicycle',
	'fa fa-bomb',
	'fa fa-diamond',
	'fa fa-paper-plane-o',
	'fa fa-anchor',
	'fa fa-bolt',
	'fa fa-cube',
	'fa fa-leaf',
	'fa fa-bicycle',
	'fa fa-bomb'];

document.querySelector('.restart').addEventListener('click', displayCards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}

function removeCards() {
	document.querySelector('.deck').innerHTML = "";
}

function displayCards(event) {
	removeCards();
	shuffle();
	showCards();
	addListeners();
	resetCounter();
}	
	
function showCards() {
	var str = "";
	cards.forEach(function(card) {
  		str += '<li class="card">' + '<i class="' + card + '"></i>' + '</li>'
	}); 
	document.querySelector('.deck').innerHTML = str;
}

function counter(){
	var element = document.querySelector('.moves')
	var count = Number(element.innerText);
	count += 1;
	element.innerText = count;
}

function openCard(event) {
	counter();
	var element = this;
	var opened_cards = document.querySelectorAll('.show.open:not(.match)');
	
	if (opened_cards.length == 1 && opened_cards[0] == element)
		return;

	element.classList.add("open", "show");

	if (opened_cards.length > 0 ) {
		if (card_class(opened_cards[0]) == card_class(element)) {
			setTimeout(function(){ match(element, opened_cards[0]) }, 300);
		} else {
			setTimeout(function(){ close(element, opened_cards[0]) }, 300);
		}
	}
}

function popUp(){
	var opened_cards = document.querySelectorAll('.match')
	if (opened_cards.length == 16) {
		alert("End of the game! Score: " + document.querySelector('.moves').innerText);
	}
}

function card_class(element) {
	return element.children[0].className;
}

function close(element1, element2) {
	element1.classList.remove("open","show");
	element2.classList.remove("open","show");
}

function match(element1, element2) {
	element1.classList.add("match");
	element2.classList.add("match");
	setTimeout(popUp, 500);
}

function addListeners() {
	var cards = document.querySelectorAll('.card');
	for (var i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', openCard);
	}
}

function resetCounter() {
	document.querySelector('.moves').innerText = "0";
}

displayCards(this);



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
