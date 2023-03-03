var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
            var circle; //varibel circles1
            var circles = []; // array that will have circles in it

        // TODO 2 : Create a function that draws a circle 

        function drawCircle(){
            // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2); //draws cirle dimentions
            physikz.addRandomVelocity(circle, canvas, 10, 10); //velocity at which the circles move
            circles.push(circle); //pushes the function
            view.addChild(circle); //makes the circles visable?
        }

        // TODO 3 / 7 : Call the drawCircle() function 
          for(var i =0; i <= 100; i++){ // created a loof to draw circles with a max of 100
                drawCircle(); // calls the drawCircle function
          }
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
             //changes the first circles position
           
             
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
           
            for(var i =0; i < circles.length; i++){ //making a loop so i can call up to 100 circles all with different dimentions
                var eachCircle = circles[i]; // creates a variable that takes the array of circles
                physikz.updatePosition(eachCircle);// calls this argument 
                game.checkCirclePosition(eachCircle);//calls another argument
            }
            // TODO 9 : Iterate over the array
           
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) { 
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if (circle.x < 0){ //iff statemnet that makes the circle.x less than 0
                circle.x = canvas.width; // makes the circles come back on the right side 
            }
            if (circle.y < 0){ // if statement that makes circle.y less than 0
                circle.y = canvas.height; // makes the circles come back down from the top
            }
            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
