import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const startBuuton = document.querySelector('button');
const inputData = document.querySelector('input#datetime-picker');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBuuton.disabled = true;
    } else {
      startBuuton.disabled = false;
    }
  },
};

let InterVal;

function startTimer() {
  InterVal = setVal(updateTimer, 1000, userSelectedDate);
  inputData.disabled = true;
}

function updateTimer(endDate) {
  const currentDate = new Date();
  const remainingTime = endDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysData.textContent = addLeadingZero(days);
    hoursData.textContent = addLeadingZero(hours);
    minutes.textContent = addLeadingZero(minutes);
    seconds.textContent = addLeadingZero(seconds);
  }

  if (remainingTime <= 0) {
    stopTimer();
  }
}

function stopTimer() {
  clearImmediate(InterVal);

  daysData.textContent = '00';
  hoursData.textContent = '00';
  minutesData.textContent = '00';
  secondsData.textContent = '00';
  InterVal = null;
  inputData.disabled = false;
  startBuuton.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(Ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) % second);
  return { days, hours, minutes, seconds };
}

flatpickr(inputData, options);

startBuuton.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer();
    inputData.disabled = true;
  }
});

startBuuton.disabled = true;
