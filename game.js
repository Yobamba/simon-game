const gamePattern = [];
const userClickedPattern = [];
let hasStarted = false;
let level = 0;

// array of colors
const buttonColors = ["red", "blue", "green", "yellow"];

// new function called nextSequence()
function nextSequence() {
  // generate a new random number between 0 and 3
  const randomNumber = Math.floor(Math.random() * 4);

  if (hasStarted == true) {
    // if the game has started, then each time this function is called we
    // go up by a level
    level = level + 1;
    $("h1").text("Level " + level); // to keep updating the level
  }

  return randomNumber;
}

function randomChosenColor(randomNumber) {
  const chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);
  return chosenColor;
}

// function that takes in the color and plays the corresponding sound
function playSound(color) {
  const audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

// This listens for the keypress that will start the game
$(document).keydown(function (event) {
  if (hasStarted == false) {
    // this is so we only react to the keyboard once to start the game

    $("h1").text("Level " + level);
    hasStarted = true; // the game has started at this point
    if (hasStarted == true) {
      alert("we in this if statement");
      let ranNum = nextSequence();

      let chosenColor = randomChosenColor(ranNum);

      // let buttonSelector = "div" + "#" + chosenColor + ".btn." + chosenColor;
      // let buttonSelector = "div" + "#" + chosenColor;
      let buttonSelector = "." + chosenColor;

      alert(buttonSelector);

      // makes the button flash
      $(buttonSelector).toggleClass("flash");

      // // plays the sound of the selected button
      // $(buttonSelector).on("click", function () {
      //   playSound(buttonSelector);
      // });

      // Event Listener for a click on any of the buttons
      $("div.btn").on("click", function () {
        const userChosenColor = this.id; // stores the id of the button the user clicks on
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        const thisDiv = "div.btn." + userChosenColor;
        animatePress(thisDiv);
      });

      checkAnswer();
    }
  }
});

// ***************************************
// Code that checks if the user's pattern matches the game sequence

function checkAnswer() {
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      alert("the next message is from gamePattern");
      alert(gamePattern[i]);
      alert("now the next will be from userClickedPattern");
      alert(userClickedPattern[i]);
      alert("testing !=");
    }
  }
}
