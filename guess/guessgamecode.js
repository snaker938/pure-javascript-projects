'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let a = 1;
let b = 20;
let counter = 0;

let secretNumber = Math.trunc(Math.random() * b) + 1;
let guesses = 0;
let inGame = true;
let highscore = 0;
let allowedGuesses = 5;
let score = 0;

// Checks if the player is able to reset
function reset() {
  if (!inGame) {
    counter = counter + 1;
    b = b + 10;
    if (counter === 5) {
      allowedGuesses = allowedGuesses + 2;
      counter === 0;
    }
    document.querySelector(
      '.guessesleft'
    ).textContent = `You are allowed ${allowedGuesses} guesses!`;
    document.querySelector('.between').textContent = `(Between 1 and ${b})`;
    secretNumber = Math.trunc(Math.random() * b) + 1;
    guesses = 0;
    document.querySelector('.score').textContent = guesses;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = null;
    document.querySelector('.number').textContent = '?';
    inGame = true;
  } else if (guesses === allowedGuesses) {
    b = 20;
    score = 0;
    document.querySelector('.actualScore').textContent = score;
    counter = 0;
    allowedGuesses = 5;
    document.querySelector(
      '.guessesleft'
    ).textContent = `You are allowed ${allowedGuesses} guesses!`;
    document.querySelector('.between').textContent = `(Between 1 and ${b})`;
    secretNumber = Math.trunc(Math.random() * b) + 1;
    guesses = 0;
    document.querySelector('.score').textContent = guesses;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = null;
    document.querySelector('.number').textContent = '?';
    inGame = true;
  } else {
    document.querySelector('.message').textContent = 'You cannot do this yet!';
  }
}

// Checks for a new highscore

function checkHighscore(currentScore) {
  if (currentScore > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = score;
  }
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (inGame) {
    // When there is no input
    if (!guess || guess > b || guess < a) {
      document.querySelector('.message').textContent = '⛔ Not a vaild entry!';

      // When player wins
    } else if (guess === secretNumber) {
      score = score + 1;
      document.querySelector('.message').textContent = '🎉 Correct Number!';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.actualScore').textContent = score;
      inGame = false;
      checkHighscore(score);

      // Checks if the score is bigger or smaller than the number
    } else if (guess !== secretNumber) {
      if (guesses < allowedGuesses - 1) {
        document.querySelector('.message').textContent =
          guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
        guesses++;
        document.querySelector('.score').textContent = guesses;
      } else {
        document.querySelector('.score').textContent = allowedGuesses;
        document.querySelector('.message').textContent =
          '💥 You lost the game!';
        score = 0;
        document.querySelector('body').style.backgroundColor = '#B22222';

        if (guesses !== allowedGuesses) {
          guesses++;
        }
      }
    }
  }
});

// Player wants to play again
document.querySelector('.again').addEventListener('click', function () {
  reset();
});

// Home Button :)
const home = document.querySelector('.home');

home.addEventListener('click', function () {
  window.location.href = window.origin + '/' + 'index.html';
});
