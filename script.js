'use strict';

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
let currentDate = new Date();
let currentDateString = currentDate.toISOString().split('T')[0];
dateEl.setAttribute('min', currentDateString);

const countdown = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const timeElements = document.querySelectorAll('span');

const complete = document.getElementById('complete');
const completeTitle = document.getElementById('complete-title');
const completeInfo = document.getElementById('complete-info');
const newCountDownButton = document.getElementById('complete-button');

let countdownTitleInput = '';
let countdownDate = '';

let intervalActive;
let stopInterval = true;

const countDownKey = 'countDown';

function setSpanElements(timer, currentDate) {
  timeElements[0].textContent = Math.abs(
    timer.getDate() - currentDate.getDate()
  );
  timeElements[1].textContent = 24 - currentDate.getHours();
  timeElements[2].textContent = 60 - currentDate.getMinutes();
  timeElements[3].textContent = 60 - currentDate.getSeconds();
}

function setCountDown(e) {
  e.preventDefault();
  countdownTitleInput = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  inputContainer.hidden = true;

  const timer = new Date(countdownDate);

  setSpanElements(timer, currentDate);
  countdownTitle.textContent = countdownTitleInput;
  countdown.hidden = false;

  localStorage.setItem(countDownKey, timer);

  completeTitle.textContent = countdownTitleInput;
  completeInfo.textContent =
    'Countdown Finished on ' +
    timer.getDate() +
    '-' +
    timer.getMonth() +
    '-' +
    timer.getFullYear();
  complete.hidden = true;

  intervalActive = setInterval(updateCountDown, 1000);
}

function updateCountDown() {
  if (countdown.hidden == false) {
    currentDate = new Date();
    const savedDate = new Date(localStorage.getItem('countDown'));
    setSpanElements(savedDate, currentDate);
    stopInterval = true;

    timeElements.forEach((item) => {
      if (item.textContent !== '0') stopInterval = false;
    });
    stopInterval = true;

    if (stopInterval) {
      clearInterval(intervalActive);
      localStorage.removeItem(countDownKey);
      countdown.hidden = true;
      complete.hidden = false;
    }
  }
}

function newCountDown() {
  inputContainer.hidden = false;
  countdown.hidden = true;
  complete.hidden = true;
}

countdownForm.addEventListener('submit', setCountDown);
newCountDownButton.addEventListener('click', newCountDown);
