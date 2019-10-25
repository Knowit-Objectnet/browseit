var isPlaying = false;

$('#playButton').click(function(e){
    showPlay();
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

function update(progress) {
    // Update the state of the world for the elapsed time since last render
  }
  
function draw() {
    // Draw the state of the world
}

var enterGame = function ()  {
    showMenu();
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

