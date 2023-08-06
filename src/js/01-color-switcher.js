const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let clickOnBtn = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onClick);
refs.stopBtn.addEventListener('click', onStop);

function onClick() {
  setButtonsStatus(true);

  clickOnBtn = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  clearInterval(clickOnBtn);
  setButtonsStatus(false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setButtonsStatus(startBtnStatus) {
  refs.startBtn.disabled = startBtnStatus;
  refs.stopBtn.disabled = !startBtnStatus;
}
