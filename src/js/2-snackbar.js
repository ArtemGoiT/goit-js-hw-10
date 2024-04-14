import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Ці рядки імпортують бібліотеку iziToast для використання функцій створення сповіщень і CSS - стилів,
//   які потрібні для відображення цих сповіщень на сторінці.

const form = document.querySelector('.form');

// Цей рядок знаходить перший елемент форми на сторінці за допомогою його класу .form і зберігає його в змінній form.

function createPromise(event) {
  event.preventDefault();

  // Ця функція createPromise створюється для обробки події відправки форми.
  //  Вона перериває стандартну дію відправки форми методом event.preventDefault(), щоб уникнути перезавантаження сторінки.

  const delayInput = form.delay.value;
  const state = form.state.value;
  const delay = Number(delayInput);

  // Тут отримуються значення полів форми, таких як значення затримки та стан обіцянки,
  // і зберігаються відповідно в змінних delayInput, state та delay.

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  // Тут створюється новий об'єкт Promise,
  //  який виконується через певний період часу, визначений змінною delay.Він розрішується або відхиляється в залежності від значення state.

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'bottomCenter',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'bottomCenter',
      });
    });
}

// Тут обробляються результати виконання обіцянки.Якщо обіцянка успішно виконалася, виводиться успішне повідомлення з вказаною затримкою.
// Якщо обіцянка була відхилена, виводиться відповідне повідомлення про помилку.

form.addEventListener('submit', createPromise);

// Цей рядок додає обробник події submit до форми. Коли користувач відправляє форму, викликається функція createPromise, яка обробляє цю подію.
