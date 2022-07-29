import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onStartCicle);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onStartCicle(evt) {
  evt.preventDefault();
  const {
    elements: { delay, step, amount },
  } = formRef;
  let newDelay = 0;
  for (let i = 1; i <= amount.value; i += 1) {
    newDelay = i === 1 ? +delay.value : newDelay + +step.value;
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
