import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const from = document.querySelector('.from');

function createPromise(event) {
  event.preventDefault();
  const delay = from.delay.value;
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else if (state === 'rejected') {
      setTimeout(() => reject(delay), delay);
    }
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
