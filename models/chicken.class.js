class Chicken extends MovableObject {
y = 360;
height = 60;
width = 60;

offset = {
top:5,
left: 5,
right: 7,
bottom: 15,
};

IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];

imgDead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

/**
 * Creates an instance of Chicken.
 */
constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = this.setOtherPosition();
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    this.onCollisionCourse = true;
}

/**
 * Generates a new random position for the chicken within a range.
 * 
 * @returns {number} The new position for the chicken.
 */
setOtherPosition() {
    let position = 500 + Math.random() * 3500;
    return this.ensureValidPosition(position);
}

/**
 * Ensures the position is valid by re-generating if necessary.
 * @param {number} position - The generated position.
 * @returns {number} A valid position.
 */
ensureValidPosition(position) {
    return position > 300 ? position : this.ensureValidPosition(500 + Math.random() * 3500);
}

/**
 * Starts the animation for the chicken, including movement and state changes.
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