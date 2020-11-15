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
  if (document.getElementById('overlay').className === 'start') {
    return;
  } else {
    reset();
  }
});

function getRandomPhraseAsArray(arr){
    let phraseChar = arr[Math.floor(Math.random() * arr.length)].split('');
    return phraseChar;
}

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

var phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(button) {
  var found = null;
  for(let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === button) {
      letters[i].className +=' ' + 'show';
      //let pickedLetters = letters[i];
      var found = button;
    }
  }
  return found;
}

qwerty.addEventListener('click', (e) => {
  const letterPicked = event.target;
  letterPicked.className = 'chosen';
  letterPicked.setAttribute('disabled', 'true');
  let letterFound = checkLetter(letterPicked.textContent);
  if (letterFound === null) {
    missed++;
  }
  if (document.getElementsByClassName('show').length === document.getElementsByClassName('letter').length) {
    overlay.className = 'win';
    title.textContent = 'You Won!';
    resetBtn.textContent = 'Play Again?';
    overlay.style.display = '';
  } else if (missed === 5) {
    overlay.className = 'lose';
    title.textContent = 'You Lost';
    resetBtn.textContent = 'Play Again?';
    overlay.style.display = '';
  }
});

function reset() {
  for (let i = 0; i < letters.length; i++) {
    letters[i].className = 'letter';
  }
  for (let i =0; i < keys.length; i++) {
    keys[i].removeAttribute('disabled');
    keys[i].className = '';
  }
  missed = 0;
  ul.innerHTML = '';
  var phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}
