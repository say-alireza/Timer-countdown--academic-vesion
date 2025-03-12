// Variables
console.log('second js is working')
let arrow = document.getElementById("arrow-container");
const input_right = document.querySelectorAll(".btn-right");
const input_left = document.querySelectorAll(".btn-left");
let start_btn = document.getElementById("start");
let reset_btn = document.getElementById("reset");
let timerRunning = false;
let countstart = 0;

let activeTotalSeconds = 0; // Store the time for the active side
let isPaused = false; // Track pause status
const timeElementLeft = document.getElementById("time");
const timeElementRight = document.getElementById("time1");
let timer;

// Helper functions

// Format time as mm:ss
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Main countdown logic
function startCounter() {
  let activeTimeElement = arrow.classList.contains("arrow-left") ? timeElementLeft : timeElementRight;
  if (activeTotalSeconds > 0) {
    activeTotalSeconds--;
    activeTimeElement.innerHTML = formatTime(activeTotalSeconds);
    timer = setTimeout(startCounter, 1000);
  } else {
    clearTimeout(timer);
    start_btn.innerHTML = "Start"; // Update button text when finished
  }
}

// Toggle arrow direction and input activation
arrow.addEventListener("click", function () {
  this.classList.toggle("rotated-arrow");
  this.classList.toggle("arrow-right");
  
  const rightbuttons = document.querySelectorAll(".btn-right");
  const leftbuttons = document.querySelectorAll(".btn-left");

  if (!this.classList.contains("rotated-arrow")) {
    this.classList.add("arrow-left");
  } else {
    this.classList.remove("arrow-left");
  }

  if (arrow.classList.contains("arrow-left")) {
    rightbuttons.forEach((button) => (button.disabled = true));
    leftbuttons.forEach((button) => (button.disabled = false));
  } else if (arrow.classList.contains("arrow-right")) {
    leftbuttons.forEach((button) => (button.disabled = true));
    rightbuttons.forEach((button) => (button.disabled = false));
  }
});

// Single Start/Search function for left and right
function start_search() {
  let inputs, timerFunc;

  if (arrow.classList.contains("arrow-right")) {
    inputs = document.querySelectorAll(".input-right");
    timerFunc = timer_right;
  } else {
    inputs = document.querySelectorAll(".input-left");
    timerFunc = timer_left;
  }

  inputs.forEach((element) => {
    if (element.value !== "") {
      const inputVal = parseInt(element.value, 10);
      timerFunc(inputVal);
    }
  });

  timerRunning = true;
  start_btn.innerHTML = "Stop";
}

// Restart button logic for both sides
document.getElementById("restart").addEventListener("click", function () {
  let inputMinutes = 0;
  const inputs = arrow.classList.contains("arrow-left") ? document.querySelectorAll(".startTime") : document.querySelectorAll(".startTime1");

  inputs.forEach((input) => {
    const value = parseInt(input.value, 10);
    if (value !== 0 && inputMinutes === 0) {
      inputMinutes = value;
    }
  });

  clearTimeout(timer); // Stop existing timer
  activeTotalSeconds = inputMinutes * 60; // Assign to active side
  isPaused = false;
  document.getElementById("pause").innerHTML = "Pause";
  startCounter(); // Start the countdown
});

// Pause/Resume button logic
document.getElementById("pause").addEventListener("click", function () {
  if (!isPaused && activeTotalSeconds > 0) {
    clearTimeout(timer);
    isPaused = true;
    this.innerHTML = "Resume";
  } else if (isPaused && activeTotalSeconds > 0) {
    isPaused = false;
    this.innerHTML = "Pause";
    startCounter();
  }
});
