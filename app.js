//variable declarations
const overlay = document.getElementById('overlay');
const resetBtn = document.querySelector('.btn__reset');
const phrase = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');

const phrases = [
  "throw caution to the wind",
  "a dime a dozen",
  "the best of both worlds",
  "better late than never",
  "its not rocket science"
]

//declare game score variables
let missed = 0;

//hide start game overlay when "start" button is clicked
resetBtn.addEventListener('click', (e) => {
  overlay.style.display = 'none';
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
    let ul = document.querySelector('#phrase ul');
    ul.appendChild(li);
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(button) {
  const letters = document.getElementsByClassName('letter');
  var found = null;
  for(let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === button) {
      letters[i].className +=' ' + 'show';
      //let pickedLetters = letters[i];
      var found = button;
    }
  }
}

qwerty.addEventListener('click', (e) => {
  const letterPicked = event.target;
  letterPicked.className = 'chosen';
  letterPicked.setAttribute('disabled', 'true');
  let letterFound = checkLetter(letterPicked.textContent);
  console.log(letterPicked.textContent + 'event handler');
});
