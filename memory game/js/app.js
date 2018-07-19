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

var count;

document.querySelector('.restart').addEventListener('click', displayCards);
document.querySelector('.green-button').addEventListener('click', function() {
	hidePopUp();
	displayCards();
});

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

function removeCards() {
	document.querySelector('.deck').innerHTML = "";
}

function counter(){
	var element = document.querySelector('.moves')
	count = Number(element.innerText);
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

function popUp(){
	var opened_cards = document.querySelectorAll('.match')
	if (opened_cards.length == 16) {
		showPopUp();
	}
}

function card_class(element) {
	return element.children[0].className;
}

function close(element1, element2) {
	element1.classList.remove("open","show");
	element2.classList.remove("open","show");
}

function shake(element1, element2) {
	element1.classList.add("apply-shake");
	element2.classList.add("apply-shake");
}

function stop_shake(element1, element2) {
	element1.classList.remove("apply-shake");
	element2.classList.remove("apply-shake");
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

function showPopUp() {
	var cont_popup = document.querySelector('.container_popup');
	var container = document.querySelector('.container');
	cont_popup.classList.remove("hide-window");
	container.classList.remove("show-window");
	cont_popup.classList.add("show-window");
	container.classList.add("hide-window");
	movesPopUp();
}

function hidePopUp() {
	var cont_popup = document.querySelector('.container_popup');
	var container = document.querySelector('.container');
	cont_popup.classList.remove("show-window");
	container.classList.remove("hide-window");
	cont_popup.classList.add("hide-window");
	container.classList.add("show-window");
}

function movesPopUp() {
	var moves = document.querySelector('.scores').innerText;
	moves = "With " + count + " moves!";
	document.querySelector('.scores').innerText = moves;
}

displayCards(this);
