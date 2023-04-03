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
                { "type": "sawblade", "x": 600, "y": groundY -110 },
                { "type": "sawblade", "x": 1200, "y": groundY -110},
                { "type": "sawblade", "x": 1500, "y": groundY -20 },
                { "type": "reward", "x": 700, "y": groundY -80 },
                { "type": "enemy", "x": 400, "y": groundY -50 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        //fucntion creates a sawblade at any given X and Y
        function  createsawBlade(x, y){
            var hitZoneSize = 25;// the size of the hitzone assighned to the var
            var damageFromObstacle = 10;// sets the damage amound and asisghns to a var
            var sawBladesHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle and assighnes it to the var
            sawBladesHitZone.x = x;// assignes the x value using thge argument passed as the y parameter.
            sawBladesHitZone.y = y;// assignes the y value using thge argument passed as the y parameter.
            game.addGameItem(sawBladesHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");// draws  the image of the sawblade.
            sawBladesHitZone.addChild(obstacleImage);// adds the obstaceImage as a child of the sawBLadeHit Zone
            obstacleImage.x = -25; //modify the X value of the image to line up with the git zone
            obstacleImage.y = -25//modify the y value of the image to line up with the git zone 
        }


        function createEnemy (x, y){
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1.5;
            enemy.onPlayerCollision = function () {
                console.log("hit");
                game.changeIntegrity(-20);
        };        
            enemy.onProjectileCollision = function ( ){
            game.changeIntegrity(10);
            game.increaseScore(100);
            enemy.fadeOut();
        }
    }
        
        
        function createReward(x,y){
            var reward = game.createGameItem("reward",25);
            var blueSquare = draw.rect(50,50,"blue");
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1.25;
            reward.onPlayerCollision = function (){
                game.increaseScore(50);
                game.changeIntegrity(50);
                reward.fadeOut();
            }
        }

        for(var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
            if(gameItem.type === "sawblade"){
                createsawBlade(gameItem.x, gameItem.y);
            } else if (gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            } else if (gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
        }
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
