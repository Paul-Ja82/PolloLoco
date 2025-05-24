class smallChicken extends MovableObject {
y = 380;
height = 40;
width = 40;

IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
];

imgDead = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

offset = {
    top: 5,
    left: 2,
    right: 3,
    bottom: 15,
};

/**
 * Initializes the small chicken enemy with a random position and animation.
 */
constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = this.setOtherPosition();
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    this.onCollisionCourse = true;
}

/**
 * Generates a random spawn position for the enemy.
 * @returns {number} Random x-position.
 */
setOtherPosition() {
    const numberOfAreas = 5;
    const areaWidth = 3500 / numberOfAreas;
    const areaStart = Math.floor(Math.random() * numberOfAreas) * areaWidth;
    let position = areaStart + Math.random() * areaWidth;

    return this.ensureValidPosition(position);
}

/**
 * Ensures the position is valid by re-generating if necessary.
 * @param {number} position - The generated position.
 * @returns {number} A valid position.
 */
ensureValidPosition(position) {
    return position > 300 ? position : this.ensureValidPosition(600 + Math.random() * 6000);
}

/**
 * Starts movement and animation for the enemy.
 */
animate() {
    setInterval(() => {
        if (!this.isEnemyDead()) {
            this.moveLeft();
        }
    }, 1000 / 60);

    setInterval(() => {
        if (this.isEnemyDead()) {
            this.loadImage(this.imgDead);
            this.applyGravity();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 200);
}

}