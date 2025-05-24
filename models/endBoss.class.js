class Endboss extends MovableObject {
height = 400;
width = 250;
y = 55;
alertTriggered = false;

offset = {
    left: 25,
    right: 40,
    top: 80,
    bottom: 80
};

IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
];

IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
];

IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
];

IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
];

IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G23.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
];

world;
endbosSound = new Audio('audio/endBoss.mp3');
bossDeadSound = new Audio('audio/boss-dead-sound.mp3');


/**
 * Initializes the Endboss object by setting up its images and starting animation.
 */
constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4500;
    this.animate();
}

/**
 * Starts the animation loop for the endboss.
 */
animate() {
    setInterval(() => {
        this.handleState();
    }, 120);
}

/**
 * Plays an animation by cycling through the given images.
 * The animation stops on the last image.
 */
playAnimationBoss(images) {
    if (this.currentImage < images.length) {
        this.img = this.imageCache[images[this.currentImage]];
        this.currentImage++;
    } else {
        this.img = this.imageCache[images[images.length - 1]];
    }
}

/**
 * Checks if the Endboss is visible on the canvas.
 * @returns {boolean} True if the Endboss is in the player's view.
 */
isVisibleOnCanvas() {
    const canvasStart = this.world.camera_x; 
    const canvasEnd = this.world.camera_x + this.world.canvas.width; 
    return this.x + this.width > canvasStart && this.x < canvasEnd;
}

/**
 * Handles the current state of the Endboss and triggers the correct animation.
 */
handleState() {
    if (this.isDead()) {
        this.handleDeath();
    } else if (this.isHurt()) {
        this.handleHurt();
    } else if (!this.alertTriggered && this.world.character.x >= 4000) {
        this.handleAlertState();
    } else if (this.alertTriggered) {
        this.followCharacter();
    }
}

/**
 * Handles alert state when near the end boss area.
 */
handleAlertState() {
    this.playAnimation(this.IMAGES_ALERT);
    this.endbosSound.play();
    this.world.soundtrack.pause();
    setTimeout(() => {
        this.alertTriggered = true; 
    }, 100); 
}

/**
 * Constantly follows the character by moving towards their position or attacking if close.
 */
followCharacter() {
    const distanceToPlayer = Math.abs(this.x - this.world.character.x);

    if (distanceToPlayer <= 200) {
        this.bossJumpAttack();
    } else if (distanceToPlayer < 300) {
        this.handleAttack();
    } else {
        if (this.x > this.world.character.x) {
            this.x -= this.speed * 70;
        }
        this.playAnimation(this.IMAGES_WALKING);
    }
}

/**
 * Handles attack state when in attack range.
 */
handleAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.attackPlayer();
}

/**
 * Plays the hurt animation and triggers the attack on the player.
 */
handleHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.attackPlayer();
}

/**
 * Plays the death animation and ends the game.
 */
handleDeath() {
    this.playAnimationBoss(this.IMAGES_DEAD);
    this.bossDeadSound.play();
    this.endbosSound.pause();
    this.world.clearAllIntervals();
    this.world.gameWon();
}

/**
 * Checks if the character is near the end boss area.
 * @returns {boolean} True if character is near the boss area.
 */
isNearEndBossArea() {
    return this.world.character.x > 3900 && this.world.character.x < 4100;
}

/**
 * Checks if the character is in attack range.
 * @returns {boolean} True if character can attack.
 */
isInAttackRange() {
    return this.world.character.x >= 4200;
}

/**
 * Attacks the player by dynamically adjusting speed based on proximity.
 */
attackPlayer() {
    const distanceToPlayer = Math.abs(this.x - this.world.character.x);

    if (distanceToPlayer > 400) {
        this.x -= this.speed * 35;
    } else {
        this.x -= this.speed * 40;
    }
}

/**
 * Initiates the boss jump attack animation.
 */
bossJumpAttack() {
    const totalFrames = 20;
    const initialX = this.x;
    const initialY = this.y;
    const jumpDistanceX = -150; 
    const jumpDistanceY = -30; 
    
    this.animateBossJump(initialX, initialY, jumpDistanceX, jumpDistanceY, totalFrames);
}

/**
 * Animates the boss jump attack movement over a specified number of frames.
 */
animateBossJump(initialX, initialY, jumpDistanceX, jumpDistanceY, totalFrames) {
    let currentFrame = 0;
    const animate = () => {
        if (currentFrame < totalFrames) {
            this.updateJumpFrame(initialX, initialY, jumpDistanceX, jumpDistanceY, totalFrames, currentFrame);
            currentFrame++;
            requestAnimationFrame(animate);
        } else {
            this.finalizeJump(initialX, initialY, jumpDistanceX, jumpDistanceY);
        }
    };
    animate();
}

/**
 * Updates the boss position during a single frame of the jump.
 */
updateJumpFrame(initialX, initialY, jumpDistanceX, jumpDistanceY, totalFrames, currentFrame) {
    const progress = currentFrame / totalFrames;
    this.x = initialX + (jumpDistanceX * progress);
    this.y = initialY + (jumpDistanceY * progress);
    if (this.y > 55) {
        this.y = 55;
    }
    this.playAnimation(this.IMAGES_ATTACK);
}

/**
 * Finalizes the jump animation and ensures the boss lands correctly.
 */
finalizeJump(initialX, initialY, jumpDistanceX, jumpDistanceY) {
    this.x = initialX + jumpDistanceX;
    this.y = initialY + jumpDistanceY;
    if (this.y > 55) {
        this.applyGravity();
    } else {
        this.y = 55;
    }
    this.x = initialX + jumpDistanceX;
}

}


