const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startInterval = () => {
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
    console.log(bodyRef.style.backgroundColor);
  }, 1000);
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
};

startBtnRef.addEventListener('click', startInterval);

const stopInterval = () => {
  clearInterval(intervalId);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
};
stopBtnRef.addEventListener('click', stopInterval);
