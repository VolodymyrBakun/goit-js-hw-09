const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

const bgChangeInterval = function () {
  intervalId = setInterval(() => {
    bodyEl.style.background = `${getRandomHexColor()}`;
  }, 1000);
  btnStartEl.disabled = 'true';
};

const bgClearInterval = function () {
  btnStartEl.disabled = false;
  clearInterval(intervalId);
  bodyEl.style.background = '';
};

btnStartEl.addEventListener('click', bgChangeInterval);
btnStopEl.addEventListener('click', bgClearInterval);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
