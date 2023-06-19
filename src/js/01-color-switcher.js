const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick() {
  intervalId = setInterval(setRandomColor, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', 'true');
}
function onStopBtnClick() {
  clearInterval(intervalId);
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');
}
function setRandomColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
