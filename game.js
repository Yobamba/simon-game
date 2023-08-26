let gamePattern = [];
let userClickedPattern = [];
let hasStarted = false;
let level = 0;

// array of colors
const buttonColors = ["red", "blue", "green", "yellow"];

// new function called nextSequence()
function nextSequence() {
  // generate a new random number between 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);
  let chosenColor = randomChosenColor(randomNumber);
  let buttonSelector = "." + chosenColor;
  //   $(buttonSelector).toggleClass("flash");
  $(buttonSelector).fadeIn(100).fadeOut(100).fadeIn(100);

  if (hasStarted == true) {
    // if the game has started, then each time this function is called we
    // go up by a level
    level = level + 1;
    $("h1").text("Level " + level); // to keep updating the level
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
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

function wrongSound() {
  const audio = new Audio("./sounds/" + "wrong" + ".mp3");
  audio.play();
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  hasStarted = false;
  level = 0;
}

function animateGameOver() {
  $("body").addClass("game-over");
  wrongSound();
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}

// Code that checks if the user's pattern matches the game sequence

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    animateGameOver();
  }
}

// This listens for the keypress that will start the game
$(document).keydown(function (event) {
  if (hasStarted == false) {
    // this is so we only react to the keyboard once to start the game

    $("h1").text("Level " + level);
    hasStarted = true; // the game has started at this point
    nextSequence();
    let gamePatternLength = gamePattern.length;
  }
});

$("div.btn").on("click", function () {
  const userChosenColor = this.id; // stores the id of the button the user clicks on

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  const thisDiv = "div.btn." + userChosenColor;
  animatePress(thisDiv);
  checkAnswer(userClickedPattern.length - 1);
});
