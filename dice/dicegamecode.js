'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const header = document.querySelector('.header');
const text = document.querySelector('.text');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

let scores, currentScore, activePlayer, playing;

let rolled1 = false;

let header1, text1;
const cannotheader = 'You cannot do this yet!';
const cannottext =
  'The game is not over yet! Get a score of exactly 100 to win the game!';

const normalheader = 'Player Switched!';
const normaltext =
  'You have either rolled a one, or have a score greater than 100!';

// Starting conditions
const reset = function () {
  score0EL.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  rolled1 = false;
  header1 = normalheader;
  text1 = normaltext;
};

const check = function () {
  if (!playing) {
    reset();
  } else {
    rolled1 = false;
    openWindow();
  }
};

reset();

// Open Modal Window
const openWindow = function () {
  if (rolled1) {
    header1 = normalheader;
    text1 = normaltext;
    document.getElementById(`header`).textContent = header1;
    document.getElementById(`text`).textContent = text1;
    modal.classList.remove('hidden2');
    overlay.classList.remove('hidden2');
  }
  if (rolled1 == false) {
    header1 = cannotheader;
    text1 = cannottext;
    modal.classList.remove('hidden2');
    overlay.classList.remove('hidden2');
    document.getElementById(`header`).textContent = header1;
    document.getElementById(`text`).textContent = text1;
  }
};

// Closed Modal Window
const closeWindow = function () {
  modal.classList.add('hidden2');
  overlay.classList.add('hidden2');
};

/* Switch Player */

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    if (currentScore + scores[activePlayer] > 100) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      rolled1 = true;
      openWindow();
      switchPlayer();
    }
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Check if '1' is the score they need to win
    if (scores[activePlayer] == 99) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player and pause
      rolled1 = true;
      openWindow();
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score is >= 100

  if (scores[activePlayer] == 100) {
    // Finish Game
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
  if (scores[activePlayer] > 100) {
    openWindow();
    switchPlayer();
  } else {
    // 3. Switch active player
    switchPlayer();
  }
});

// Player wants to reset the game
btnNew.addEventListener('click', check);

// Close Modal Window
document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    closeWindow();
  }
});
btnCloseModal.addEventListener('click', closeWindow);
modal.addEventListener('click', closeWindow);

// Home Button :)
const home = document.querySelector('.home');

home.addEventListener('click', function () {
  window.location.href = window.origin + '/' + 'index.html';
});
