var isPlaying = false;

$('#playButton').click(function(e){
    showPlay();
    isPlaying = true;
    initGame();
});
$('#endButton').click(function(e){
    showFinish();
    isPlaying = false;
});
$('#retryButton').click(function(e){
    showPlay();
    isPlaying = true;
});
$('#quitButton').click(function(e){
    showMenu();
    isPlaying = false;
});


// Game logic
var employees = [];

var lives = 10;
var score = 0;
var employeesLeft = [];
var currentName;
var wrongLetters = [];
var correctLetters = [];

var getNames = function() {
    getEmployees()
    .then((result) => {
        employees = result;
        employeesLeft = result;
    })
}

var initGame = function() {
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
        if (letter === ' ') {
            className = 'space';
        } else {
            id = letter.toLowerCase();
            className = 'letter';
        };
        return `<div class=${className}><span class="hidden" ${id ? 'id='+id : ''}>${letter.toUpperCase()}</span></div>`;
    });
    $('#nameSection').append(letters);

};

var showWrongLetter = function(letter){
    $('#alphabet').append(`<div class="letter"><span>${letter.toUpperCase()}</span></div>`);
}

var showCorrectLetter = function(letter) {
    $(`#${letter.toLowerCase()}`).css("opacity", 1);
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
        for(const c of currentName){
            if(!correctLetters.includes(c)){
                win = false;
                break;
            }
        }
        if(win){
            if(employeesLeft.length === 0){
                gameWin();
            }
            else{
                roundWin();
                incrementScore();
            }
        }
    }
}

var roundWin = function (){
    changePerson();
}

var gameOver = function (){
    showFinish();
    isPlaying = false;
    renderFinish();
}

var gameWin = function (){
    showFinish();
    isPlaying = false;
    renderFinish();
}

var resetGame = function() {
    score = 0;
    lives = 10;
    employeesLeft = employees.slice();
    showPlay();
    isPlaying = true;
    initGame();
};

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
}


$(document).on("keypress", "#game", function (e) {
    const key = e.key.toLowerCase();
    if((key >= "a" && key <= "z") || key in "æøå"){
        checkLetter(key);
        updateGameState();
        renderGameState();
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
    getNames()
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

