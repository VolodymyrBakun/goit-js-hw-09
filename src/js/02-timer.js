import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartEl = document.querySelector('[data-start]');
const inputDateEl = document.getElementById('datetime-picker');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMinutesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

let selectedDate;
let intervalId;

// console.log(inputDateEl);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
    const date = selectedDates[0];
      if (date.getTime() < nowDate.getTime()) {
        Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnStartEl.disabled = false;

    selectedDate = date.getTime();
  },
};

btnStartEl.disabled = true;

flatpickr(inputDateEl, options);

btnStartEl.addEventListener('click', () => {
  btnStartEl.disabled = true;
Notiflix.Notify.success('Time is running!');
    intervalId = setInterval(() => {
    const nowDate = new Date();
      const timeDifference = selectedDate - nowDate.getTime();
      if (timeDifference >= 0) {
        const timeComponents = convertMs(timeDifference);
        timerDaysEl.textContent = addLeadingZero(timeComponents.days);
        timerHoursEl.textContent = addLeadingZero(timeComponents.hours);
        timerMinutesEl.textContent = addLeadingZero(timeComponents.minutes);
        timerSecondsEl.textContent = addLeadingZero(timeComponents.seconds);
      } else {
          clearInterval(intervalId)
          Notiflix.Notify.warning('Your time is over!');
      }
    
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
