import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  spanEl: document.querySelector('.value'),
};

let chosenDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    const dateDifference = chosenDate - options.defaultDate;
    if (dateDifference < 0) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
    if (dateDifference > 0) refs.startBtn.disabled = false;
  },
};

refs.startBtn.disabled = true;
flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener('click', onClick);

function onClick() {
  timerInterval = setInterval(() => {
    refs.startBtn.disabled = true;
    const now = new Date().getTime();
    const distance = chosenDate - now;
    const timeToTheEnd = convertMs(distance);

    refs.daysEl.textContent = addLeadingZero(timeToTheEnd.days);
    refs.hoursEl.textContent = addLeadingZero(timeToTheEnd.hours);
    refs.minutesEl.textContent = addLeadingZero(timeToTheEnd.minutes);
    refs.secondsEl.textContent = addLeadingZero(timeToTheEnd.seconds);

    if (distance <= 0) {
      clearInterval(timerInterval);
      refs.daysEl.textContent = '00';
      refs.hoursEl.textContent = '00';
      refs.minutesEl.textContent = '00';
      refs.secondsEl.textContent = '00';
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
