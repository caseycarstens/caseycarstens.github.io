var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree; // declares the variable tree
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY, 'lightBlue');
            background.addChild(backgroundFill);
            
            
            
            // TODO: 3 - Add a moon and starfield
            for (var i = 0; i < 100; i++){
                var circle = draw.circle(3, "white", "LightGray", 2);//draws a circle adn stores it in the circle varisable
                circle.x = canvasWidth * Math.random();// takes the width of the canvas and multiplies times a random decimal 
                circle.y = groundY * Math.random(); // takes groundY and miltiplies i times a random decimal. 
                background.addChild(circle);// adds that circle to the backround as a child
            }
            var moon = draw.bitmap("img/moon.png");//draws moon using.gitmaap
            moon.x = canvasWidth -300;//adds a x value to the moon of 300 pixels
            moon.y = groundY -400;// adds an y value to the moon of 200 pixels
            moon.scaleX = 0.50;//sclaes the moon's x value 
            moon.scaleY = 0.50;//scales the moon's y value
            background.addChild(moon);// adds the moon as a child of backround
            


            
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeights = [500, 350, 475, 600, 575];
            var buildingColors = ["Grey","Grey", "Gsey", "Grey","blue"];
            var building;
            for (var i = 0; i < 5; ++i) {
                var building = draw.rect(75, buildingHeights[i], buildingColors[i], "Grey", 1);//draws a rectangele
                building.x = 500 * i;//multiplies the current iteration of the loop so that the buildings are 200
                building.y = groundY - buildingHeights[i];//subtracts buildingHeight from ground Y
                background.addChild(building);//add the building as a child to the backround
                buildings.push(building);//adds the buildings to the building array
              }
            /*
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = 300;// creates buildings using buildingHeight
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1);//draws a rectangele
                building.x = 200 * i;//multiplies the current iteration of the loop so that the buildings are 200
                building.y = groundY - buildingHeight;//subtracts buildingHeight from ground Y
                background.addChild(building);//add the building as a child to the backround
                buildings.push(building);//adds the buildings to the building array
              }
            */
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");// uses bitmap to draw the image 
            tree.x = canvasWidth -200;//assighnes an X value to the tree
            tree.y = groundY -230;// assighnes a y value to the tree 
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 3;

            if (tree.x < -200) {
            tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){
                var building = buildings[i];
                building.x = building.x -0.3;
            }
            if (building.x < -300){
                building.x = canvasWidth;
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
