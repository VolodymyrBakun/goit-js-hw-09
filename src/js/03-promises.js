import Notiflix from 'notiflix';

const formEl = document.querySelector(".form")

const { delay, step, amount} = formEl.elements;

formEl.addEventListener("submit", onBtnSubmit)

function onBtnSubmit(event) {
  event.preventDefault();
  const firstDelay = Number(delay.value);
  const delayStep = Number(step.value);
  const amountOfPromises = Number(amount.value);

  for (let i = 0; i < amountOfPromises; i += 1) {
    createPromise(i + 1, firstDelay + (delayStep * i))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })

    }

function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
  };
