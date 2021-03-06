var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 1;

function startGame() {
    $("#level-title").text(`Level ${level}`);
    nextSequence(level);
    $("#level-title").off("click", startGame);
}

function randomNumber() {
  return Math.floor(Math.random() * 4);
}

function playSound(name) {
  var sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(function() {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

function playButton() {
  setTimeout(function() {
    var newNum = randomNumber();
    var randomChosenColor = buttonColors[newNum];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
  }, 1000);
}

function nextSequence(currentLevel) {
  var count = 0;
  var timer = setInterval(function() {
    if (count < level) {
      playButton();
    } else {
      clearInterval(timer);
      $('.btn').click(collectInput);
    }
    count++;
  }, 1000);
}

function collectInput() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  if (gamePattern.length === userClickedPattern.length) {
    $('.btn').off("click", collectInput);
    var result = checkAnswer();

    if (result) {
      setTimeout(function() {
        level++;
        $("#level-title").text(`Level ${level}`);
        gamePattern = [];
        userClickedPattern = [];
        nextSequence(level);
      }, 1000);

    } else {
      $("#level-title").text(`Game Over, Click Here to Restart`);
      $("body").addClass("game-over");
      var sound = new Audio("sounds/wrong.mp3");
      sound.play();
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").click(restartGame);
    }
  }
}

function checkAnswer() {
  // Check if all items exist and are in the same order
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) return false;
  }
  // Otherwise, return true
  return true;
}

function restartGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    $("#level-title").text(`Level ${level}`);
    nextSequence(level);
    $("#level-title").off("click", restartGame);
}

$("#level-title").click(startGame);
