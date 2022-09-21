//Starting Variables
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var started= false;
var buttonColors = ["green", "red", "yellow", "blue"];

//Game Sequence

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

//Game Start
$(document).keypress(function () {
if (!started) {
  $("#level-title").html("Level " + level);
  nextSequence();
  started = true;
}
});


//Click Detection


  $(".btn").on("click", function () {

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    buttonAnimated(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    });

// Sound function

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//Animation Function

function buttonAnimated(currentKey) {
  var activeButton = $("#" + currentKey);
  $(activeButton).addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);

}

//Answer Check Function

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart.");
    gameOver();

    console.log("Wrong");
  }
}

//Game Over function

function gameOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

// function buttonAnimated(currentKey) {
//   var activeButton = document.querySelector("#" + currentKey);
//   console.log("#" + currentKey);
//   activeButton.classList.add("pressed");
//   setTimeout(function() {
//     activeButton.classList.remove("pressed");
//   }, 100);
//
// }

// Same function in JQuery
