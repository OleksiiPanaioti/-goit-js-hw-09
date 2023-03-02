const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorChange() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(function() {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);