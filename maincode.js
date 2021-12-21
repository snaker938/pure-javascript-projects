"use strict";
const btnGuessGame = document.querySelector(".guess__btn--1");
const btnDiceGame = document.querySelector(".dice__btn--2");
const btnEcoTrader = document.querySelector(".eco_btn--3");

btnGuessGame.addEventListener("click", function () {
  window.location.href = "guess/guessgame.html";
});

/* I am 100% sure there are other ways to do this, but I do not know them, and this is the most efficient for what I need to do :)*/
btnDiceGame.addEventListener("click", function () {
  window.location.href = "dice/dicegame.html";
});

btnEcoTrader.addEventListener("click", function () {
  window.location.href = "investin-ecotrader/";
});
