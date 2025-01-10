// Select the buttons and body
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const body = document.body;

// Initialize a variable to store the interval ID
let intervalId;

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to start changing the background color
function startChangingColor() {
  if (intervalId) return; // Prevent multiple intervals
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomColor();
  }, 1000); // Change color every second
}

// Function to stop changing the background color
function stopChangingColor() {
  clearInterval(intervalId);
  intervalId = null; // Reset the interval ID
}

// Attach event listeners to the buttons
startButton.addEventListener("click", startChangingColor);
stopButton.addEventListener("click", stopChangingColor);
