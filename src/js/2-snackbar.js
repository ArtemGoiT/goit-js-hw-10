import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(event) {
  event.preventDefault();

  // Зміни назв змінних для кращої зрозумілості коду
  const delayInput = form.delay.value;
  const state = form.state.value;

  // Конвертувати значення затримки в число
  const delay = Number(delayInput);

  // Використання одного setTimeout з умовою для resolve або reject
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

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

form.addEventListener('submit', createPromise);
