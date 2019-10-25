
var exit = false;
var isPlaying = false;

var enterGame = function ()  {
// Wait for the page to finish loading
console.log("enter game")

        $('button#playButton').click(function(e){
            console.log("Playbutton");
        });
        $('#retryButton').click(function(e){
            console.log("button");
        });
        $('#quitButton').click(function(e){
            console.log("button");
        });
        
        function update(progress) {
            // Update the state of the world for the elapsed time since last render
          }
          
          function draw() {
            // Draw the state of the world
          }
}

var exitGame = function (){
    console.log("exit game");
}