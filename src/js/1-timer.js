import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

// Ці рядки імпортують бібліотеки flatpickr і izitoast, а також стилі для них.
// flatpickr використовується для створення календаря для вибору дати та часу, а izitoast - для показу сповіщень.

const startButton = document.querySelector('button');
const inputData = document.querySelector('input#datetime-picker');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

// Тут визначаються змінні для кнопки запуску таймера, вводу дати та часу,
// а також для елементів, які відображатимуть решту днів, годин, хвилин та секунд після вибраної дати.

let userSelectedDate;
let conInterval;

// Визначені змінні для зберігання вибраної користувачем дати та часу, а також для ідентифікації інтервалу таймера.

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
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Об'єкт options містить налаштування для календаря flatpickr. Встановлено, щоб користувач міг вибирати дату та час, а також встановлено мінімальний інтервал у 1 хвилину.
// Також передбачено обробник події onClose, який викликається при закритті календаря.Цей обробник перевіряє, чи обрана дата належить майбутньому,
// і відповідно активує або деактивує кнопку запуску таймера та виводить повідомлення про помилку, якщо дата належить минулому.

function startTimer() {
  conInterval = setInterval(updateTimer, 1000, userSelectedDate);
}

// Функція startTimer встановлює інтервал, який викликає функцію updateTimer кожної секунди, передаючи обрану користувачем дату як аргумент.

function updateTimer(endDate) {
  const currentDate = new Date();
  const remainingTime = endDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysData.textContent = addLeadingZero(days);
    hoursData.textContent = addLeadingZero(hours);
    minutesData.textContent = addLeadingZero(minutes);
    secondsData.textContent = addLeadingZero(seconds);
  }

  if (remainingTime <= 0) {
    stopTimer();
  }
}

// Функція updateTimer оновлює відображення таймера, обчислюючи час, що залишився до обраної дати та часу.
// Вона конвертує решту мілісекунд у кількість днів, годин, хвилин та секунд і оновлює відповідні поля в HTML.Якщо час вже минув, таймер зупиняється.

function stopTimer() {
  clearInterval(conInterval);

  daysData.textContent = '00';
  hoursData.textContent = '00';
  minutesData.textContent = '00';
  secondsData.textContent = '00';

  conInterval = null;

  inputData.disabled = false;
  startButton.disabled = true;
}

// Функція stopTimer зупиняє таймер і скидає відображення до значень за замовчуванням. Також вона активує поля вводу дати та часу і деактивує кнопку запуску таймера.

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція addLeadingZero додає ведучий нуль до числа, якщо воно складається з однієї цифри.

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

// Функція convertMs конвертує мілісекунди у кількість днів, годин, хвилин та секунд.

flatpickr(inputData, options);

// Цей рядок ініціалізує календар flatpickr для елементу вводу дати та часу, використовуючи встановлені параметри.

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer();

    inputData.disabled = true;
  }
});

// Додається обробник події click до кнопки запуску таймера, який запускає таймер, якщо користувач обрав дату, та деактивує поле вводу дати та часу.

startButton.disabled = true;

// Цей рядок деактивує кнопку запуску таймера за замовчуванням, оскільки спочатку користувач повинен обрати дату.
