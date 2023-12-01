const focusButton = document.getElementById("focus");
const buttons = document.querySelectorAll(".btn");
const shortBreakButton = document.getElementById("shortbreak");
const startBtn = document.getElementById("btn-start");
const reset = document.getElementById("btn-reset");
const pause = document.getElementById("btn-pause");
const time = document.getElementById("time");

let active = "focus";
let minCount = 24;
let count = 59;
let paused = true;

const appendZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const updateTimerDisplay = () => {
  time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
};

const resetTimer = () => {
  clearInterval(set);
  paused = true;
  startBtn.classList.remove("hide");
  pause.classList.remove("show");
  reset.classList.remove("show");
  switch (active) {
    case "short":
      minCount = 4;
      break;
    default:
      minCount = 24;
      break;
  }
  count = 59;
  updateTimerDisplay();
};

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  active = "focus";
  resetTimer();
});

shortBreakButton.addEventListener("click", () => {
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  active = "short";
  resetTimer();
});

pause.addEventListener("click", () => {
  paused = true;
  clearInterval(set);
  updateTimerDisplay();
});

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");

  if (paused) {
    paused = false;
    updateTimerDisplay();

    set = setInterval(() => {
      count--;
      updateTimerDisplay();

      if (count === 0) {
        if (minCount !== 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});

reset.addEventListener("click", () => {
  resetTimer();
});
