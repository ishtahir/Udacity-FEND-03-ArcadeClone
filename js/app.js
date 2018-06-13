// create Enemy class
class Enemy {
    constructor() {
        let enemyPosY = [63, 146, 229];
        this.sprite = 'images/enemy-bug.png';
        this.x = -101;
        this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
        this.speed = Math.floor(Math.random() * 3) + 1;
    }
    // create enemy prototype function update with dt param
    update(dt) {
        if (this.x > -102) {
            this.x += 101 * (dt * this.speed);
        }

        // // check for collisions
        if (player.x < this.x + 80 && this.x < player.x + 80 && player.y-10 < this.y + 80 && this.y < player.y-10 + 80) {
            player.x = 202;
            player.y = 405;
        }
    }
    // create enemy prototype function render
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
