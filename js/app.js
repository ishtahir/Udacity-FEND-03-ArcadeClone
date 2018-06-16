const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('.play-again-btn');
const startBtn = document.querySelector('.start-btn');
const stats = document.querySelector('.stats');
const congrats = document.querySelector('.congrats');
const movesCell = document.querySelector('.moves');
const timeCell = document.querySelector('.time');
const scoreCell = document.querySelector('.score');
let moves = 0;
let score = 0;
let time = 0;
let timer;

// create enemy class
class Enemy {
    constructor() {
        const enemyPosY = [63, 229, 395];
        const leftEnemyPosY = [146, 312];
        this.sprite = 'images/enemy-bug.png';
        this.spriteLeft = 'images/enemy-bug-left.png';
        this.x = -101;
        this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
        this.leftX = 505;
        this.leftY = leftEnemyPosY[Math.floor(Math.random() * leftEnemyPosY.length)];
        this.speed = Math.floor(Math.random() * 2) + 1;
    }
    update(dt) {
        if (this.x > -102 && this.leftX < 506) {
            this.x += 101 * (dt * this.speed);
            this.leftX -= 101 * (dt * this.speed);
        }
        // check for collision
        if (player.x < this.x + 80 && this.x < player.x + 80 && player.y-10 < this.y + 80 && this.y < player.y-10 + 80) {
            player.x = 202;
            player.y = 488;
        }
        if (player.x < this.leftX + 80 && this.leftX < player.x + 80 && player.y-10 < this.leftY + 80 && this.leftY < player.y-10 + 80) {
            player.x = 202;
            player.y = 488;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.drawImage(Resources.get(this.spriteLeft), this.leftX, this.leftY);
    }
}

// create player class
class Player {
    constructor() {
        const playerPosX = [0, 101, 202, 303, 404];
        this.sprite = 'images/char-boy.png';
        this.x = playerPosX[Math.floor(Math.random() * playerPosX.length)];
        this.y = 488;
    }
    update() {
        if (score === 5) {
            allEnemies.forEach(function(i) {
                i.speed = 0;
            });
            endModal();
        }
    }
    handleInput(keys) {
        if (!modal.classList.contains('show-modal')) {
            if (keys === 'up' && this.y > -10) {
                this.y -= 83;
                moves++;
                movesCell.textContent = moves;
            }
            else if (keys === 'down' && this.y < 488) {
                this.y += 83;
                moves++;
                movesCell.textContent = moves;
            }
            else if (keys === 'left') {
                this.x -= 101;
                moves++;
                movesCell.textContent = moves;
            }
            else if (keys === 'right') {
                this.x += 101;
                moves++;
                movesCell.textContent = moves;
            }

            // if you go offscreen to the left and right you pop up on other side
            if (this.x < 0)
                this.x = 404;
            else if (this.x > 404)
                this.x = 0;

            if (moves > 0 && !timer) {
                timer = setInterval(function() {
                    time++;
                    timeCell.textContent = `${time} secs`;
                }, 1000);
            }
        }

        // if player reaches the water increment score and reset player position
        if (this.y < 0) {
            score++;
            scoreCell.textContent = score;
            this.x = 202;
            this.y = 488;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

function spawn() {
    allEnemies.push(new Enemy(), new Enemy());
}

function startModal() {
    modal.classList.add('show-modal');
    congrats.textContent = 'Rules';
    stats.style.textAlign = 'left';
    stats.style.paddingLeft = '20px';
    playAgainBtn.style.display = 'none';
    startBtn.style.display = 'block';
    stats.innerHTML = `
    <p>1. Use arrow keys to control player</p>
    <p>2. Score a point by reaching the water</p>
    <p>3. If you hit a bug you start at the bottom</p>
    <p>4. Score 5 points to end the game</p>
    <p>5. Good Luck!</p>`;
    startBtn.textContent = 'Start Game';
}

function endModal() {
    congrats.textContent = 'Game Over!';
    stats.style.textAlign = 'center';
    stats.innerHTML = `<p>Moves: ${moves}</p><p>Time: ${time} seconds</p>`;
    playAgainBtn.style.display = 'block';
    startBtn.style.display = 'none';
    playAgainBtn.textContent = 'Play Again';
    modal.classList.add('show-modal');
    if (timer) {
        clearInterval(timer);
        timer = undefined;
    }
}

// instantiate objects
const allEnemies = [];
const player = new Player();

function gameStart() {
    // function to release a bug every 1.5 secs
    spawn();
    const bugsGalore = setInterval(function() {
        spawn();
        // after the bugs are off screen, remove from array
        allEnemies.forEach(function(item) {
            if (item.x > 500) {
                allEnemies.splice(allEnemies.indexOf(item), 1);
            }
        });
    }, 1500);
}

window.onload = function() {
    startModal();
}

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

startBtn.addEventListener('click', function() {
    modal.classList.remove('show-modal');
    gameStart();
});

playAgainBtn.addEventListener('click', function() {
    document.location.reload();
});
