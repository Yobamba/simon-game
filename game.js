const gamePattern = [];

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
  gamePattern.push(chosenColor);
  return chosenColor;
}

let ranNum = nextSequence();

let chosenColor = randomChosenColor(ranNum);

// let buttonSelector = "div" + "#" + chosenColor + ".btn." + chosenColor;
// let buttonSelector = "div" + "#" + chosenColor;
let buttonSelector = "." + chosenColor;

alert(buttonSelector);

// makes the button flash
$(buttonSelector).toggleClass("flash");

// plays the sound of the selected button
$(buttonSelector).on("click", function () {
  const audio = new Audio("./sounds/" + chosenColor + ".mp3");
  audio.play();
});
