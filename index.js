const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const timerEl = document.querySelector('span')

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - (hours * 3600)) / 60);
  let remainingSeconds = seconds % 60;

  let formattedTime = "";

  if (hours < 10) {
    formattedTime += "0";
  }
  formattedTime += hours + ":";

  if (minutes < 10) {
    formattedTime += "0";
  }
  formattedTime += minutes + ":";

  if (remainingSeconds < 10) {
    formattedTime += "0";
  }
  formattedTime += remainingSeconds;

  return formattedTime;
}

const createTimerAnimator = () => {
  var intervalId
  return (time) => {
    clearInterval(intervalId)
    intervalId = setInterval(() => {
      let parts = time.split(":");
      let hours = parseInt(parts[0], 10);
      let minutes = parseInt(parts[1], 10);
      let seconds = parseInt(parts[2], 10);

      if (seconds > 0) {
        seconds--;
      } else {
        if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else {
            clearInterval(intervalId);
            alert("Время вышло!");
            return;
          }
        }
      }

      time = (hours < 10 ? "0" + hours : hours) + ":" +
          (minutes < 10 ? "0" + minutes : minutes) + ":" +
          (seconds < 10 ? "0" + seconds : seconds);
      timerEl.textContent = time
    }, 1000)
  }
}

const animateTimer = createTimerAnimator()

inputEl.addEventListener('input', () => {
  const inputValue = inputEl.value
  const cleanedValue = inputValue.replace(/\D/g, '')
  inputEl.value = cleanedValue
})

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value)
  let time = formatTime(seconds)
  timerEl.textContent = time
  animateTimer(time)

  inputEl.value = ''
})