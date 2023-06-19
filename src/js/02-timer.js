import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.setAttribute('disabled', 'true');

let intervalId = null;
let pickDate = null;

function onStartBtnClick() {
  clearInterval(intervalId);
  intervalId = setInterval(handleTime, 1000);
  refs.startBtn.setAttribute('disabled', 'true');
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDatePick,
});

function handleDatePick(selectedDates) {
  pickDate = selectedDates[0].getTime();
  const nowDate = new Date().getTime();

  if (pickDate < nowDate) {
    refs.startBtn.setAttribute('disabled', 'true');
    clearInterval(intervalId);
    Notify.failure('Please choose a date in the future');
    return;
  } else {
    refs.startBtn.removeAttribute('disabled');
  }
}

function handleTime() {
  const nowDate = new Date().getTime();
  const timeDifer = pickDate - nowDate;
  const timeConvert = convertMs(timeDifer);

  renderTimer(timeConvert);

  if (timeDifer <= 0) {
    clearInterval(intervalId);
    renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTimer(timeConvert) {
  refs.daysEl.textContent = addLeadingZero(timeConvert.days);
  refs.hoursEl.textContent = addLeadingZero(timeConvert.hours);
  refs.minutesEl.textContent = addLeadingZero(timeConvert.minutes);
  refs.secondsEl.textContent = addLeadingZero(timeConvert.seconds);
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