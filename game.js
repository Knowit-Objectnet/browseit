var acceptInput = true;
var isPlaying = false;
var highScore = 0;

$('#playButton').click(function(e){
  showPlay();
  initGame();
  isPlaying = true;
});
$('#endButton').click(function(e){
  isPlaying = false;
  gameOver();
});
$('#retryButton').click(function(e){
  initGame();
  showPlay();
  isPlaying = true;
});
$('#quitButton').click(function(e){
  isPlaying = false;
  showMenu();
});


var getLocalHighScore = function(){
  highScore = localStorage.getItem("browseItNameGameScore");
  if(highScore == null){
    highScore = 0;
    $("#bestHighScore").html("");
  }
  else{
    $("#bestHighScore").html("Your best score: " + highScore);
  }
}

var checkIfNewHighScore = function (){
  if(score > highScore){
    highScore = score;
    localStorage.setItem("browseItNameGameScore", score);
  }
}


// Game logic
var employees = [];

var lives = 15;
var score = 0;
var employeesLeft = [];
var currentName;
var wrongLetters = [];
var correctLetters = [];

var initGame = function() {
  resetGame();
  changePerson();
  renderGameState();
}

var changePerson = function(){
  wrongLetters = [];
  correctLetters = [];
  let person = employeesLeft.splice(Math.floor(Math.random() * employeesLeft.length), 1)[0];
  currentName = person.name;

  // image
  $('#personImage').attr("src", person.img);

  // letters
  let letters = person.name.split('').map(letter => {
    let id;
    let className;
    let hidden;
    if (letter === ' ') {
      className = 'symbol';
    } else if (letter === '-') {
      className = 'symbol';
    } else {
      id = letter.toLowerCase();
      className = 'letterContainer';
      hidden = true;
    };
    return `<div class=${className}><span class="${hidden ? 'hidden' : ''} letter ${id ? id : ''}">${letter.toUpperCase()}</span></div>`;
  });
  $('#nameSection').append(letters);

};

var showWrongLetter = function(letter){
  $('#alphabet').append(`<div class="letterContainer wrong"><span>${letter.toUpperCase()}</span></div>`);
}

var showCorrectLetter = function(letter) {
  $(`.letter.${letter.toLowerCase()}`).css("opacity", 1);
}

var incrementScore = function() {
  score += 1;
};

var decrementLives = function() {
  lives -= 1;
};

var updateGameState = function(){
  if(lives <= 0){
    gameOver();
  }
  else{
    var win = true;
    var nameIter = currentName.toLowerCase().split(" ").join("").split("-").join("");
    for(const c of nameIter){
      if(!correctLetters.includes(c)){
        win = false;
        break;
      }
    }
    if(win){
      incrementScore();
      acceptInput = false;
      setTimeout(() => {
        if(employeesLeft.length === 0){
          gameWin();
        }
        else{
          roundWin();
        }
        acceptInput = true;
      }, 2000);
    }
  }
}

var roundWin = function (){
  resetGameRender();
  changePerson();
}

var gameOver = function (){
  showFinish();
  checkIfNewHighScore();
  isPlaying = false;
  renderFinish();
}

var gameWin = function (){
  showFinish();
  checkIfNewHighScore();
  isPlaying = false;
  renderFinish();
}

var resetGame = function() {
  score = 0;
  lives = 15;
  employeesLeft = employees.slice();
  isPlaying = true;
  resetImageRender();
  resetGameRender();
};

var resetGameRender = function() {
  $("#nameSection").empty();
  $("#alphabet").empty();
}

var resetImageRender = function (){
  $('#personImage').attr("src", "");
}

var renderGameState = function (){
  $("#scoreLabel").html("Score: "+score);
  $("#livesLabel").html("Lives: "+lives);
}

var renderFinish = function (win){
  if(win){
    $("#finishTitle").html("Congratulations, you won!")
  }
  else{
    $("#finishTitle").html("Game over!");
  }
  $("#score").html(score + " out of " + employees.length);
  $("#highScore").html("Your best score: " + highScore);
}


$(document).on("keypress", window, function (e) {
  if(acceptInput){
    const key = e.key.toLowerCase();
    if((key >= "a" && key <= "z") || "æøå".includes(key)){
      checkLetter(key);
      updateGameState();
      renderGameState();
    }
  }
});

var checkLetter = function(letter){
  if(correctLetters.includes(letter) || wrongLetters.includes(letter)){
    return;
  }
  for(const c of currentName.toLowerCase()){
    if(letter === c){
      correctLetters.push(letter);
      showCorrectLetter(letter);
      return;
    }
  }
  wrongLetters.push(letter);
  showWrongLetter(letter);
  decrementLives();
  return;
}



// Navigation

var enterGame = function ()  {
  showMenu();
  getLocalHighScore();
  loadNames();
}
var loadNames = function () {
  $("#loading").show();
  $("#loadingFinished").hide();
  $("#loadingError").hide();
  getEmployees()
  .then((result) => {
    employees = result;
    employeesLeft = result;
    $("#loading").hide();
    $("#loadingFinished").show();
    $("#loadingError").hide();
  }).catch((e) => {
    $("#loading").hide();
    $("#loadingFinished").hide();
    $("#loadingError").show();
    $("#loadingError").html("Feil ved innlasting av spill. Sørg for at du er logget inn på projects.knowit.no, og last inn spillet på nytt.");
  });
}
var exitGame = function (){
  hideAll();
}
var showMenu = function(){
  $('#menu').show();
  $('#play').hide();
  $('#finish').hide();
}
var showPlay = function(){
  $('#menu').hide();
  $('#play').show();
  $('#finish').hide();
  $("#play").focus();
}
var showFinish = function(){
  $('#menu').hide();
  $('#play').hide();
  $('#finish').show();
}
var hideAll = function(){
  $('#menu').hide();
  $('#play').hide();
  $('#finish').hide();
}

