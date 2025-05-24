class ThrowableObject extends MovableObject {

/** Rotation animation images */
IMAGES = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
];

/** Splash animation images */
IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
];

/**
 * Initializes the throwable object.
 * @param {number} x - X-position.
 * @param {number} y - Y-position.
 */
constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 70;
    this.throw();
    this.animate();
    this.hasCollided = false;
}

/**
 * Starts the throw action with speed and gravity.
 */
throw() {
    this.speedY = 30;
    this.speedX = 20;
    this.applyGravity();
}

/**
 * Plays the selected animation.
 * @param {Array<string>} images - Animation frames.
 */
playAnimation(images) {
    super.playAnimation(images);
}

/**
 * Animates the object (rotation or splash).
 */
animate() {
    setInterval(() => {
        if (this.isActive && this.isAboveGround()) {
            this.x += 10;
            this.playAnimation(this.IMAGES);
        } else if (!this.isActive) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            if (this.currentImage >= this.IMAGES_BOTTLE_SPLASH.length) {
                this.isActive = null;
            }
        }
    }, 50);
}

}