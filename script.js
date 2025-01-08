let timer;
let isRunning = false;
let remainingTime = 1500; // Default: 25 minutes
let loopEnabled = false;

const animationContainer = document.getElementById("animation-container");
const timerDisplay = document.getElementById("timer");

// Function to format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Function to update the animation
function updateAnimation(mode) {
  animationContainer.className = mode; // Apply the class for the selected mode
}

// Function to start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        timerDisplay.innerText = formatTime(remainingTime);
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Time's up!");
        if (loopEnabled) handleLoop();
      }
    }, 1000);
  }
}

// Function to handle loop functionality
function handleLoop() {
  if (remainingTime === 0) {
    document.getElementById("short-break").click(); // Start short break after work
  }
}

// Event Listeners for buttons
document.getElementById("pomodoro").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 25 * 60; // 25 minutes
  timerDisplay.innerText = formatTime(remainingTime);
  updateAnimation("pomodoro");
});

document.getElementById("short-break").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 5 * 60; // 5 minutes
  timerDisplay.innerText = formatTime(remainingTime);
  updateAnimation("short-break");
});

document.getElementById("long-break").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 20 * 60; // 20 minutes
  timerDisplay.innerText = formatTime(remainingTime);
  updateAnimation("long-break");
});

document.getElementById("custom-timer").addEventListener("click", () => {
  const customTime = prompt("Enter custom time in minutes:");
  if (customTime && !isNaN(customTime)) {
    clearInterval(timer);
    isRunning = false;
    remainingTime = parseInt(customTime) * 60; // Custom time in minutes
    timerDisplay.innerText = formatTime(remainingTime);
    updateAnimation("custom");
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
});

document.getElementById("start").addEventListener("click", startTimer);

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 25 * 60; // Default to Pomodoro
  timerDisplay.innerText = formatTime(remainingTime);
  updateAnimation("pomodoro");
});

document.getElementById("loop-toggle").addEventListener("change", (e) => {
  loopEnabled = e.target.checked;
});
