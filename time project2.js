// Variables
let arrow = document.getElementById("arrow-container");
let startButtonsLeft = document.querySelectorAll(".btn-left");
let startButtonsRight = document.querySelectorAll(".btn-right");
let pauseButton = document.getElementById("pause");
let timerDisplayLeft = document.getElementById("time");
let timerDisplayRight = document.getElementById("time1");

let timers = {};
let activeButton = null; // Track the currently active button

// Helper function to format time as mm:ss
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Function to start the timer for a specific button
function startTimer(button) {
  const buttonId = button.querySelector('input').classList.contains('startTime') ? 'left' : 'right';
  const inputTime = parseInt(button.querySelector('input').value, 10);

  if (!timers[buttonId]) {
    timers[buttonId] = { totalSeconds: inputTime * 60, interval: null, isPaused: false };
  }

  activeButton = buttonId;

  // Update the display for the corresponding side
  const display = buttonId === 'left' ? timerDisplayLeft : timerDisplayRight;
  clearInterval(timers[buttonId].interval); // Clear any existing interval

  // Start countdown
  timers[buttonId].interval = setInterval(() => {
    if (timers[buttonId].totalSeconds <= 0) {
      clearInterval(timers[buttonId].interval);
      return;
    }
    timers[buttonId].totalSeconds--;
    display.innerHTML = formatTime(timers[buttonId].totalSeconds);
  }, 1000);

  button.querySelector('input').value = ""; // Clear the input after starting the timer
}

// Function to pause the timer
function pauseTimer() {
  if (activeButton && timers[activeButton]) {
    if (timers[activeButton].isPaused) {
      // Resume timer
      timers[activeButton].isPaused = false;
      startTimer(document.querySelector(`.btn-${activeButton}`)); // Restart timer for the active button
      pauseButton.innerHTML = "Pause";
    } else {
      // Pause timer
      clearInterval(timers[activeButton].interval);
      timers[activeButton].isPaused = true;
      pauseButton.innerHTML = "Resume";
    }
  }
}

// Event listener for buttons
startButtonsLeft.forEach(button => {
  button.addEventListener("click", () => {
    startTimer(button);
    pauseButton.innerHTML = "Pause"; // Reset pause button text
  });
});

startButtonsRight.forEach(button => {
  button.addEventListener("click", () => {
    startTimer(button);
    pauseButton.innerHTML = "Pause"; // Reset pause button text
  });
});

// Event listener for pause button
pauseButton.addEventListener("click", pauseTimer);

// Arrow toggle functionality
arrow.addEventListener("click", function () {
  this.classList.toggle("rotated-arrow");
  this.classList.toggle("arrow-right");
});
