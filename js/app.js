const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('button');
const stats = document.querySelector('.stats');
const congrats = document.querySelector('.congrats');

// create enemy class
class Enemy {
    constructor() {
        const enemyPosY = [63, 146, 229];
        this.sprite = 'images/enemy-bug.png';
        this.x = -101;
        this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
        this.speed = Math.floor(Math.random() * 3) + 1;
    }
    update(dt) {
        if (this.x > -102) {
            this.x += 101 * (dt * this.speed);
        }
        // check for collision
        if (player.x < this.x + 80 && this.x < player.x + 80 && player.y-10 < this.y + 80 && this.y < player.y-10 + 80) {
            player.x = 202;
            player.y = 405;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// create player class
class Player {
    constructor() {
        const playerPosX = [0, 101, 202, 303, 404];
        this.sprite = 'images/char-boy.png';
        this.x = playerPosX[Math.floor(Math.random() * playerPosX.length)];
        this.y = 405;
    }
    update() {
        if (player.y < 0) {
            allEnemies.forEach(function(i) {
                i.speed = 0;
            });
            showModal();
        }
    }
    handleInput(keys) {
        if (keys === 'up' && this.y > -10)
            this.y -= 83;
        else if (keys === 'down' && this.y < 405)
            this.y += 83;
        else if (keys === 'left')
            this.x -= 101;
        else if (keys === 'right')
            this.x += 101;

        // if you go offscreen to the left and right you pop up on other side
        if (this.x < 0)
            this.x = 404;
        else if (this.x > 404)
            this.x = 0;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


function spawn() {
    allEnemies.push(new Enemy());
}

function showModal() {
    congrats.textContent = 'Congratulations!';
    stats.textContent = 'You win!';
    playAgainBtn.textContent = 'Play Again';
    modal.classList.add('show-modal');
}

// instantiate objects
const allEnemies = [];
const player = new Player();
// function to release a bug every 1.5 secs
const bugsGalore = setInterval(function() {
    spawn();
    // after the bugs are off screen, remove from array
    allEnemies.forEach(function(item) {
        if (item.x > 500) {
            allEnemies.splice(allEnemies.indexOf(item), 1);
        }
    });
}, 1500);


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

playAgainBtn.addEventListener('click', function() {
    document.location.reload();
});
