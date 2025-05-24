class World {
canvas;
ctx;
keyboard;
cameraX = 0;
statusbar = new Statusbar();
statusbarCoins = new StatusbarCoins();
statusbarBottles = new StatusbarBottles();
statusbarEndboss = new StatusbarEndboss();
throwableObjects = [];
bottles = 3;
coins = 0;
soundtrack = new Audio('audio/el_pollo_loco.mp3');
bottleSound = new Audio('audio/broken-bottle.mp3');
collectSound = new Audio('audio/coin-win.mp3');
gameWin = new Audio('audio/win.mp3');
gameoverSound = new Audio('audio/game-over.mp3');
hurtPepeSound = new Audio('audio/hurt-sound.mp3');
isGameOver = false;
isGameWon = false;
isMuted = false;
character = new Character();
endboss = new Endboss();
level = level1;
endbossStatusbarVisible = false;

/**
 * Initializes the game world with canvas, keyboard, and sounds.
 * @param {HTMLCanvasElement} canvas - Game canvas.
 * @param {Keyboard} keyboard - Keyboard input handler.
 */
constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundtrack.volume = 0.6;
    this.bottleSound.volume = 1;
    this.collectSound.volume = 0.5;
    this.draw();
    this.setWorld();
    this.run();
}

/**
 * Connects character and end boss to the world.
 */
setWorld() {
    this.character.world = this;
    this.endboss.world = this;
}

/**
 * Stops all active intervals.
 */
clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Starts game loops for sound and gameplay checks.
 */
run() {
    setInterval(() => {
        this.soundtrack.play();
    }, 150);

    setInterval(() => {
        this.detectStomp();
        this.checkCollisions();
        this.grabCoins();
        this.grabBottles();
        this.throwObjects();
        this.enemyIsHit();
    }, 50);
}

/**
 * Checks if the character jumps on an enemy.
 */
detectStomp() {
    this.level.enemies.forEach((enemy) => {
        const jumpedOn = this.character.jumpOnEnemy(enemy);
        }
    );
}

/**
 * Checks and handles coin collection.
 */
grabCoins() {
    this.level.coins = this.level.coins.filter(coin => {
        if (this.character.isCollecting(coin)) {
            this.collectSound.currentTime = 0;
            this.collectSound.play();
            coin.collect();
            this.coins++;
            this.statusbarCoins.setCoins(this.coins);
            return false;
        }
        return true;
    });
}

/**
 * Checks and handles bottle collection.
 */
grabBottles() {
    this.level.salsabottles = this.level.salsabottles.filter(bottle => {
        if (this.character.isColliding(bottle)) {
            this.collectSound.currentTime = 0;
            this.collectSound.play();
            bottle.collect();
            this.bottles++;
            this.statusbarBottles.setBottles(this.bottles);
            return false;
        }
        return true;
    });
}

/**
 * Handles throwing of bottles.
 */
throwObjects(){
    if (this.keyboard.D && this.bottles > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.bottles--;
        this.statusbarBottles.setBottles(this.bottles);
    }
}

/**
 * Checks collisions between the character and enemies/end boss.
 * Reduces health on collision.
 */
checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
            this.character.hit(15);
            this.statusbar.setPercentage(this.character.energy);
            this.character.pushBackOnCollision(enemy); 
        }
    });
    if (this.character.isColliding(this.endboss)) {
        this.character.hit(20);
        this.statusbar.setPercentage(this.character.energy);
        this.character.pushBackOnCollision(this.endboss); 
    }
}

/**
 * Checks if throwable objects hit any enemy or the end boss.
 */
enemyIsHit() {
    this.throwableObjects.forEach((bottle) => {
        this.isBottleHitEnemies(bottle);
        this.isBottleHitEndboss(bottle);
    });
}

/**
 * Checks if a bottle hits any regular enemy and applies damage.
 * @param {ThrowableObject} bottle - The thrown bottle.
 */
isBottleHitEnemies(bottle) {
    this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
            this.hurtEnemy(enemy, bottle);
        }
    });
}

/**
 * Checks if a bottle hits the end boss and applies damage.
 * @param {ThrowableObject} bottle - The thrown bottle.
 */
isBottleHitEndboss(bottle) {
    if (bottle.isColliding(this.endboss) && !bottle.hasCollided) {
        this.hurtEndboss(bottle);
    }
}

/**
 * Applies damage to a regular enemy and plays sounds.
 * @param {Enemy} enemy - The enemy being hit.
 * @param {ThrowableObject} bottle - The bottle hitting the enemy.
 */
hurtEnemy(enemy, bottle) {
    enemy.hitEnemy();
    bottle.hitEnemy();
    this.playSounds();
}

/**
 * Applies damage to the end boss and plays sounds.
 * @param {ThrowableObject} bottle - The bottle hitting the end boss.
 */
hurtEndboss(bottle) {
    this.endboss.hit(18);
    this.statusbarEndboss.setPercentage(this.endboss.energy);
    bottle.hitEnemy();
    this.playSounds();
    bottle.hasCollided = true;
}

/**
 * Plays the hit sound effects.
 */
playSounds() {
    this.bottleSound.play();
}

/**
 * Draws the entire game world.
 */
draw() {
    this.clearCanvas();
    this.ctx.translate(this.cameraX, 0);
    this.drawBackground();
    this.drawUI();
    this.drawGameObjects();
    this.ctx.translate(-this.cameraX, 0);
    this.drawFinal();
    this.requestNextFrame();
}

/**
 * Clears the game canvas.
 */
clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

/**
 * Draws background elements.
 */
drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
}

/**
 * Draws UI elements like status bars.
 */
drawUI() {
    this.ctx.translate(-this.cameraX, 0); 
    this.addToMap(this.statusbar); 
    this.addToMap(this.statusbarCoins); 
    this.addToMap(this.statusbarBottles); 
    if (this.character.x >= 4000 || this.endbossStatusbarVisible) {
        this.endbossStatusbarVisible = true; 
        this.addToMap(this.statusbarEndboss);
    }

    this.ctx.translate(this.cameraX, 0);
}


/**
 * Draws all game objects (character, enemies, items).
 */
drawGameObjects() {
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsabottles);
}

/**
 * Draws the game over or win screen.
 */
drawFinal() {
    if (this.isGameOver || this.isGameWon) {
        this.addToMap(new GameOver(this.isGameOver ? 
            'img/9_intro_outro_screens/game_over/game over.png' : 
            'img/9_intro_outro_screens/win/won_2.png'));
        this.stopSounds();
        if (this.isGameOver && !this.gameOverSoundPlayed) {
            this.gameoverSound.play();
            this.gameOverSoundPlayed = true;
        }
        if (this.isGameWon && !this.gameWinSoundPlayed) {
            this.gameWin.play();
            this.gameWinSoundPlayed = true;
        }
        document.getElementById('play-again-button').classList.remove('d-none');
    }
}

/**
 * Requests the next animation frame.
 */
requestNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
        self.draw();
    });
}

/**
 * Draws multiple objects on the map.
 * @param {DrawableObject[]} objects - Objects to draw.
 */
addObjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    });
}

/**
 * Draws a single object on the map.
 * @param {DrawableObject} mo - Object to draw.
 */
addToMap(mo) {
    if (mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
}

/**
 * Flips an object horizontally.
 * @param {DrawableObject} mo - Object to flip.
 */
flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}

/**
 * Restores flipped object's orientation.
 * @param {DrawableObject} mo - Object to restore.
 */
flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
}

/**
 * Pauses the game soundtrack.
 */
pauseSoundtrack() {
    if (this.soundtrack && !this.soundtrack.paused) {
        this.soundtrack.pause();
    }
}

/**
 * Pauses the endboss sound.
 */
pauseEndbossSound() {
    if (this.endboss.endbosSound && !this.endboss.endbosSound.paused) {
        this.endboss.endbosSound.pause();
    }
}

/**
 * Pauses the chicken sound.
 */
pauseChickenSound() {
    if (this.character.chickenSound && !this.character.chickenSound.paused) {
        this.character.chickenSound.pause();
    }
}

/**
 * Pauses all active audio elements in the game.
 */
stopSounds() {
    try {
        this.pauseSoundtrack();
        this.pauseEndbossSound();
        this.pauseChickenSound();
    } catch (error) {
        console.error('Error pausing sounds:', error);
    }
}

/**
 * Handles game over state.
 */
gameOver() {
    this.isGameOver = true;
    this.draw();
    document.getElementById('play-again-button').classList.remove('d-none');
}

/**
 * Restarts the game.
 */
replay() {
    this.isGameOver = false;
    this.isGameWon = false;
    this.draw();
    document.getElementById('play-again-button').classList.add('d-none');
}

/**
 * Handles game won state.
 */
gameWon() {
    this.isGameWon = true;
    this.draw();
    document.getElementById('play-again-button').classList.add('d-none');
}

}