// array of colors
const buttonColors = ["red", "blue", "green", "yellow"];

// new function called nextSequence()
function nextSequence() {
  // generate a new random number between 0 and 3
  const randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function randomChosenColor(randomNumber) {
  const chosenColor = buttonColors[randomNumber];
}
