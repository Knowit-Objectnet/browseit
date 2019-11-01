var isPlaying = false;

$('#playButton').click(function(e){
    showPlay();
    initGame();
});
$('#endButton').click(function(e){
    showFinish();
});
$('#retryButton').click(function(e){
    showPlay();
});
$('#quitButton').click(function(e){
    showMenu();
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
        return `<div class=${className} ${id ? 'id='+id : ''}>${letter}</div>`;
    });
    $('#nameSection').append(letters);

};

var incrementScore = function() {

};

var decrementLives = function() {

};

var resetGame = function() {

};


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
    isPlaying = false;
}
var showPlay = function(){
    $('#menu').hide();
    $('#play').show();
    $('#finish').hide();
    isPlaying = true;
}
var showFinish = function(){
    $('#menu').hide();
    $('#play').hide();
    $('#finish').show();
    isPlaying = false;
}
var hideAll = function(){
    $('#menu').hide();
    $('#play').hide();
    $('#finish').hide();
    isPlaying = false;
}

