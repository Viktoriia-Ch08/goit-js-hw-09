const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let clickOnBtn = null;

refs.startBtn.addEventListener('click', onClick);
refs.stopBtn.addEventListener('click', onStop);

function onClick() {
  clickOnBtn = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }, 1000);
}

function onStop() {
  clearInterval(clickOnBtn);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
