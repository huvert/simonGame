var keyboardActive = true;
var clickActive = true;
var level = 0;
var buttonList = [];            // Referanse
var tempList = [];              // temporary
var crash = new Audio("sounds/wrong.mp3");
var audioBlue = new Audio("sounds/blue.mp3");
var audioGreen = new Audio("sounds/green.mp3");
var audioRed = new Audio("sounds/red.mp3");
var audioYellow = new Audio("sounds/yellow.mp3");

$("html").keypress(function() {                 // **** 1 ****
  if(keyboardActive === true) {
    level = 1;
    keyboardActive = false;
    resetGame();
  }
})
$(".btn").on("click", function(event) {         // **** 2 ****
  //let btn = event.currentTarget.$attr("class");
  btn = $(event.currentTarget).attr("class").slice(4);                                // This line WORKS :D
  if (btn == lastIndexOf(tempList)) {   // You hit the right button
    let btn = lastIndexOf(tempList);
    runGameAnimations(btn);
    tempList.pop();
    if (tempList.length == 0) {         // You won!
      levelUp();
    }
  }
  else {                                // You lose
    fail(btn);
  }

});

main();

/* ====     Main      ==== */
// Event-listeners
function main() {

}





/* ====     Functions     ==== */
function lastIndexOf(list) {
  return(list[list.length-1]);
}
function firstIndexOf(list) {
  return(list(0));
}

function resetGame() {
  level = 1;
  $("#level-title").html("level 1");
  buttonList = [];
  addToLists();
  setTimeout(function() {runGameAnimations(tempList[0])}, 600);
}
function resetTempList() {
  for (let i=-1; i<=tempList.length; i++) {
    tempList.pop();
  }
  for (let i=0; i<buttonList.length; i++) {
    tempList.push(buttonList[i]);
  }
}
function addToLists() {
  let num = Math.floor(Math.random()*4 + 1);           // 1 = Green, 2 = Red, 3 = Yellow, 4 = Blue
  switch (num) {
    case 1:
      buttonList.unshift("green");
      break;
    case 2:
      buttonList.unshift("red");
      break;
    case 3:
      buttonList.unshift("yellow");
      break;
    case 4:
      buttonList.unshift("blue");
      break;
    default:
  }
  resetTempList();
  let btn = tempList[0];
}
function levelUp() {
  clickActive = false;
  level++;
  $("#level-title").html("level "+level);
  addToLists();
  setTimeout(function() {buttonPress(buttonList[0]); runGameAnimations(buttonList[0]);}, 1000);
  setTimeout(function() {clickActive = true;}, 1100)
  clickActive = true;
}
function runGameAnimations(btn) {
  clickActive = false;
  let dT = 500;
  switch (btn) {
    case "blue":
      audioBlue.play();
      break;
    case "green":
      audioGreen.play();
      break;
    case "red":
      audioRed.play();
      break;
    case "yellow":
      audioYellow.play();
      break;
    default:

  }
  buttonPress(btn);
  setTimeout(function() {clickActive = true;}, 1100)
}

function buttonPress(x) {
  $("#"+x).removeClass(x);
  $("#"+x).addClass("pressed");
  setTimeout(function() {
    $("#"+x).removeClass("pressed");
    $("#"+x).addClass(x);
  }, 100);
}


function fail(btn) {
  buttonPress(btn);
  failBackground();
  crash.play();
  $("#level-title").html("Game Over, Press Any Key to Restart");
  keyboardActive = true;
}
function failBackground() {
  $("body").addClass("game-over");
  setTimeout(function() {$("body").removeClass("game-over")}, 100);
}
