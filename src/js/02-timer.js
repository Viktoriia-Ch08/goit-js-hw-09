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
  onClose([selectedDates]) {
    chosenDate = selectedDates;
    const dateDifference = chosenDate - options.defaultDate;
    if (dateDifference < 0) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
    refs.startBtn.disabled = false;
  },
};

refs.startBtn.disabled = true;
flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener('click', onClick);

function onClick() {
  timerInterval = setInterval(() => {
    refs.startBtn.disabled = true;
    const now = Date.now();
    const distance = chosenDate - now;
    const timeToTheEnd = convertMs(distance);

    setTextContent(timeToTheEnd);

    if (distance <= 0) {
      clearInterval(timerInterval);
      setTextContent({});
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

function setTextContent({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
