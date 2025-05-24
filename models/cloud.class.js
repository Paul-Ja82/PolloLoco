/**
 * Represents a moving cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

/**
 * Initializes the cloud object.
 * @param {number} startX - Initial x-position.
 */
constructor(startX) {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = startX;
    this.animate();
}

/**
 * Animates the cloud moving left.
 */
animate() {
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);
}

/**
 * Moves the cloud left and resets its position if off-screen.
 */
moveLeft() {
    this.x -= this.speed;
    
    if (this.x + this.width < 0) {
        this.x = 5000;
    }
}

}
