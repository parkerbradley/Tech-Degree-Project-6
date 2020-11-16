//variable declarations
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const resetBtn = document.querySelector('.btn__reset');
const phrase = document.getElementById('phrase');
let ul = document.querySelector('#phrase ul');
const LIs = ul.childNodes;
const letters = document.getElementsByClassName('letter');
const qwerty = document.getElementById('qwerty');
const keys = document.querySelectorAll('.keyrow button');
const ol = document.querySelector('ol');
const tries = document.querySelectorAll('.tries');

//random phrases array
const phrases = [
  "throw caution to the wind",
  "a dime a dozen",
  "the best of both worlds",
  "better late than never",
  "its not rocket science"
]

//declare game score variables
var missed = 0;

//hide start game overlay when "start" button is clicked
resetBtn.addEventListener('click', (e) => {
  overlay.style.display = 'none';
  //runs the reset function only if the overlay class is won or lost. If it is the start overlay the event listener ends
  if (document.getElementById('overlay').className === 'start') {
    return;
  } else {
    reset();
  }
});

//gets a random phrase from the phrases array and splits the array into an array of characters
function getRandomPhraseAsArray(arr){
    let phraseChar = arr[Math.floor(Math.random() * arr.length)].split('');
    return phraseChar;
}

//takes the random array of characters and places each character in an <li>. <li> that are not empty spaces are assigned an class of "letter"
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i];
    if (arr[i] === ' '){
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li);
  }
}

//prints the random phrase to the screen
var phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//compares the key selected to the letters in the phrase. Displays the letter in the phrase if there is a match
function checkLetter(button) {
  var found = null;
  for(let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === button) {
      letters[i].className +=' ' + 'show';
      letters[i].style.transition = 'ease-in 1s';
      var found = button;
    }
  }
  return found;
}

//event listener for the keyboard
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const letterPicked = event.target;
    letterPicked.className = 'chosen';
    letterPicked.setAttribute('disabled', 'true');
    let letterFound = checkLetter(letterPicked.textContent);
    //if the letter selected is not in the phrase, adds 1 to the missed score and removes a heart from the lives display
    if (letterFound === null) {
      missed++;
      ol.removeChild(ol.firstElementChild);
    }
  }
  //watches for game status
  //if all letters are selected the game is won and overlay is edited
  if (document.getElementsByClassName('show').length === document.getElementsByClassName('letter').length) {
    overlay.className = 'win';
    title.textContent = 'You Won!';
    resetBtn.textContent = 'Play Again?';
    overlay.style.display = '';
  //if missed = 5, the game is lost and overlay is edited for a lost game
  } else if (missed === 5) {
    overlay.className = 'lose';
    title.textContent = 'You Lost';
    resetBtn.textContent = 'Play Again?';
    overlay.style.display = '';
  }
});

//resets the game screen and displays a new random phrase from the won or lost overlay
function reset() {
  for (let i = 0; i < letters.length; i++) {
    letters[i].className = 'letter';
  }
  for (let i =0; i < keys.length; i++) {
    keys[i].removeAttribute('disabled');
    keys[i].className = '';
  }
  for (let i = 0; i < 4; i++) {
    tries[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    tries[i].className = 'tries';
  }
  missed = 0;
  ul.innerHTML = '';
  var phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}
