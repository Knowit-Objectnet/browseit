
var exit = false;

window.onload = function ()  {
// Wait for the page to finish loading

        document.addEventListener('enterGame', function(e){
            // Init script when the game is opened
            exit = false;
            var lastRender = 0;
            window.requestAnimationFrame(loop);
        });

        document.addEventListener('exitGame', function(e){
            // When the game is closed
            exit = true;
        });

        function update(progress) {
            // Update the state of the world for the elapsed time since last render
          }
          
          function draw() {
            // Draw the state of the world
          }
          
          function loop(timestamp) {
            var progress = timestamp - lastRender
          
            update(progress)
            draw()
          
            lastRender = timestamp
            window.requestAnimationFrame(loop)
          }
}
