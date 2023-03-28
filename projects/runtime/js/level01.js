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
                { "type": "enemy", "x": 400, "y": groundY -50 },
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
            var spikesHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle and assighnes it to the var
            spikesHitZone.x = x;// assignes the x value using thge argument passed as the y parameter.
            spikesHitZone.y = y;// assignes the y value using thge argument passed as the y parameter.
            game.addGameItem(spikesHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");// draws  the image of the sawblade.
            spikesHitZone.addChild(obstacleImage);// adds the obstaceImage as a child of the sawBLadeHit Zone
            obstacleImage.x = -25; //modify the X value of the image to line up with the git zone
            obstacleImage.y = -25//modify the y value of the image to line up with the git zone 
        }

        createSpikes(400, groundY -100);
        createSpikes(600, groundY -100);
        createSpikes(800, groundY);

        function createEnemy (){
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 400;
            enemy.y = groundY - 50;
            game.addGameItem(enemy);
            enemy.velocityX = -1.5;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(damage);
        };        
            enemy.onProjectileCollision = function ( ){
            game.changeIntegrity(10);
            game.increaseScore(100);
            enemy.fadeOut();
        }
    }
        createEnemy(600, groundY-50,-1.5,"Red");
        createEnemy(600, groundY-50,-1,"Organge");
        
        function createReward(x,y){
            var reward = game.createGameItem("reward",25);
            var blueSquare = draw.rect(50,50,"blue");
            blueSquare.x = -25;
            blueSquare.Y = -25;
            reward.addChild(blueSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1.25;
            reward.omPlayerCollision = function (){
                game.increaseScore(50);
                game.changeIntegrity(50);
                reward.fadeOut();
            }
        }

        createReward(700, groundY - 60);
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
