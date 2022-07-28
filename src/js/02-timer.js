import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const datetimePickerRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinutesRef = document.querySelector('[data-minutes]');
const dataSecondsRef = document.querySelector('[data-seconds]');
startBtnRef.disabled = true;

flatpickr(datetimePickerRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');

      // alert('Please choose a date in the future');
      return;
    }
    Notify.success('Click on the button "start" to starting timer');
    startBtnRef.disabled = false;
    startTimer(selectedDates);
  },
});

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

function startTimer(selectedDates) {
  startBtnRef.addEventListener('click', () => {
    startBtnRef.disabled = true;
    const setIntervalId = setInterval(() => {
      if (selectedDates[0] < new Date()) {
        clearInterval(setIntervalId);
        return;
      }
      const timer = convertMs(selectedDates[0] - new Date());
      getTimer(timer);
    }, 1000);
  });
}

function getTimer({ days, hours, minutes, seconds }) {
  dataDaysRef.textContent = addLeadingZero(days);
  dataHoursRef.textContent = addLeadingZero(hours);
  dataMinutesRef.textContent = addLeadingZero(minutes);
  dataSecondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
