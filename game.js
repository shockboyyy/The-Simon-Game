var gamePattern = [];

var tog = "false";

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

$(".btn").on("click",function(e) {

  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});



$(document).keypress(function() {
  if (tog == "false") {
    $("#level-title").text("Level " + level);
    nextSequence();
    tog = "true";
  }
});



function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
    $("h1").text("Game Over, press any key to restart !");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  tog = "false";
}
