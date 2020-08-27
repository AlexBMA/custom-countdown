'use strict';

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

const countdown = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const timeElements = document.querySelectorAll('span');

let countdownTitleInput = '';
let countdownDate = '';

function updateSpanElements(timer, todayA) {
    timeElements[0].textContent = Math.abs(timer.getDate() - todayA.getDate());
    timeElements[1].textContent = Math.abs(timer.getHours() - todayA.getHours());
    timeElements[2].textContent = Math.abs(timer.getMinutes() - todayA.getMinutes());
    timeElements[3].textContent = Math.abs(timer.getSeconds() - todayA.getSeconds());
}


function updateCountDown(e) {
  e.preventDefault();
  countdownTitleInput = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  const timer = new Date(countdownDate);
  const todayA = new Date();

  updateSpanElements(timer, todayA);

  countdownTitle.textContent = countdownTitleInput;
  inputContainer.hidden = true;
  countdown.hidden = false;
}

countdownForm.addEventListener('submit', updateCountDown);

