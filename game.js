var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function(event) {
  if(!gameStarted) {
      gameStarted = true;
      $("#level-title").text("Level 0");
       nextSequence();
  }
})

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(checkAnswer()) {
    correct();
  }
  else {
    incorrect();
  }
})

function nextSequence() {
  var randomChosenColour = buttonColours[nextColour()];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  updateLevel();
}

function checkAnswer(lastIndex) {
  for(var i = 0; i < userClickedPattern.length; i++) {
    if(userClickedPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function correct() {
  if(userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }
}

function incorrect() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  playSound("wrong");
  startOver();
}

function startOver() {
  $("#level-title").text("Game Over. Press a key to restart.");
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
}

function updateLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

function nextColour() {
  var ranNum = (Math.random() * 4);
  return (Math.floor(ranNum));
}

function animatePress(colour) {
  var animatedButton = $("." + colour);
  animatedButton.addClass("pressed");
  setTimeout(function() {
    animatedButton.removeClass("pressed");
  }, 100);
}

function playSound(soundName) {
  var sound;
  switch (soundName) {
    case "green":
      sound = new Audio("sounds/green.mp3");
      break;
    case "red":
      sound = new Audio("sounds/red.mp3");
      break;
    case "blue":
      sound = new Audio("sounds/blue.mp3");
      break;
    case "yellow":
      sound = new Audio("sounds/yellow.mp3");
      break;
    case "wrong":
      sound = new Audio("sounds/wrong.mp3");
      break;
    default:
      console.log(colour);
  }
  sound.play();
}
