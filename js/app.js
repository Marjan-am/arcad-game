var score = document.querySelector(".score");
var clapSound = document.querySelector("#clapping");
var jump = document.querySelector("#jump");
var gameOver = document.querySelector("#game-over");
var resetButton = document.querySelector("#reset");
var winnigCount = 0;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    // Multiplying any movement by the dt parameter 
    // which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    if (this.x > 560) {
        this.x = -70;
    };

    // Check for collision from:
    //"https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection".

    if (player.x < this.x + 60 &&
        player.x + 40 > this.x &&
        player.y < this.y + 60 &&
        player.y + 40 > this.y) {
            player.x = 200;
            player.y = 370;
            gameOver.play();
    };

 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class 
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Objects instantiate your.
var allEnemies = [];
var enemy;
var player = new Player(200, 370, 50);
var enemyPosition = [60, 140, 220];

// Creating enemy every time with new speed
enemyPosition.forEach (function (y){
    enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 200));
    allEnemies.push(enemy);
})


// Player key control
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        jump.play();
        this.x -= 110;
        
    }; 
    if (keyPress == 'right' && this.x < 400) {
        this.x += 110;
        jump.play();
    };
    if (keyPress == 'up' && this.y > 0) {
        jump.play();
        this.y -= 75;
        
    };
    if (keyPress == 'down' && this.y < 400) {
        this.y += 75;
        jump.play();
    };

    // To send the player to the bottom of canvas after winning
    if (this.y < 0) {
        setTimeout ( function () {
            player.x = 200;
            player.y = 370;
        }, 3000);
        winnigCount++;
        this.y = 0;
        score.innerHTML = winnigCount;
        clapSound.play();
    };
};
//Sound effects
function reset () {
    player.x = 200;
    player.y = 370;
    winnigCount = 0;
    score.innerHTML = 0;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
resetButton.addEventListener('click', reset)