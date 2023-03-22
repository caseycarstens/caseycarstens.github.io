var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        //fucntion creates a sawblade at any given X and Y
        function  createSpikes(x, y){
            var hitZoneSize = 25;// the size of the hitzone assighned to the var
            var damageFromObstacle = 10;// sets the damage amound and asisghns to a var
            var spikeBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle and assighnes it to the var
            spikeBladeHitZone.x = x;// assignes the x value using thge argument passed as the y parameter.
            spikeBladeHitZone.y = y;// assignes the y value using thge argument passed as the y parameter.
            var obstacleImage = draw.bitmap("img/sawblade.png");// draws  the image of the sawblade.
            sawBladeHitZone.addChild(obstacleImage);// adds the obstaceImage as a child of the sawBLadeHit Zone
            obstacleImage.x = -25; //modify the X value of the image to line up with the git zone
            obstacleImage.y = -25//modify the y value of the image to line up with the git zone 
        }

        createSpikeBlade(400, groundY -100);
        createSpikeBlade(600, groundY -100);
        createSpikeBlade(800, groundY);
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
