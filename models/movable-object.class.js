class MovableObject extends DrawableObject {
speed = 0.15;
otherDirection = false;
speedY = 0;
acceleration = 2.5;
energy = 100;
enemyEnergy = 100;
lastHit = 0;
isActive = true;
offsetX = 0;
offsetY = 0;
onCollisionCourse = false;

/**
* Applies gravity to the object.
*/
applyGravity() {
    setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            return false;
        }
    }, 1000 / 25);
}

/**
 * Checks if the object is above the ground.
 * @returns {boolean} True if above ground.
 */
isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof CollectableObject || this instanceof Chicken || this instanceof smallChicken) {
        return true;
    } else if (this.y > 180) {
        this.y = 180;
        this.speedY = 0;
        return false;
    } else {
        return this.y < 180;
    }
}

/**
 * Reduces energy by damage value.
 * @param {number} damage - Damage amount.
 */
hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }
}

/**
 * Kills the enemy and disables its actions.
 */
hitEnemy() {
    this.enemyEnergy = 0;
    this.isActive = false;
    this.onCollisionCourse = false;
}

/**
 * Checks if the object was recently hit.
 * @returns {boolean} True if recently hit.
 */
isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return (timePassed / 1000) < 1;
    
}

/**
 * Checks if the object is dead.
 * @returns {boolean} True if dead.
 */
isDead() {
    return this.energy === 0;
}

/**
 * Checks if the enemy is dead.
 * @returns {boolean} True if enemy is dead.
 */
isEnemyDead() {
    return this.enemyEnergy === 0;
}

/**
 * Checks for collision with another object.
 * @param {DrawableObject} obj - Target object.
 * @returns {boolean} True if colliding.
 */
isColliding(obj) {
    return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
           this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
           this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
           this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;

}

/**
 * Checks if the object is collecting another object.
 * @param {CollectableObject} obj - Collectible object.
 * @returns {boolean} True if collecting.
 */
isCollecting(obj) {
    let adjustedY = this.y + this.height - 100;
    return (this.x + this.width) >= obj.x &&
           this.x <= (obj.x + obj.width) &&
           (this.y + this.offsetY + this.height) >= obj.y &&
           adjustedY <= (obj.y + obj.height);
}

/**
 * Plays the given animation.
 * @param {Array<string>} images - Animation frames.
 */
playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImage++;
}

/**
 * Initiates the push-back animation upon collision.
 * @param {DrawableObject} obj - The object with which the character collided.
 */
pushBackOnCollision(obj) {
    const totalFrames = 20;
    const initialX = this.x;
    const initialY = this.y;
    const { pushDistanceX, pushDistanceY } = this.calculatePushDistances(obj);
    this.animatePushBack(initialX, initialY, pushDistanceX, pushDistanceY, totalFrames);
}

/**
 * Calculates the horizontal and vertical push distances based on the collision object's position.
 */
calculatePushDistances(obj) {
    const pushDistanceX = this.x < obj.x ? -100 : 100;
    const pushDistanceY = -100;
    return { pushDistanceX, pushDistanceY };
}

/**
 * Animates the push-back movement over a specified number of frames.
 */
animatePushBack(initialX, initialY, pushDistanceX, pushDistanceY, totalFrames) {
    let currentFrame = 0;

    const animate = () => {
        if (currentFrame < totalFrames) {
            this.x = initialX + (pushDistanceX * (currentFrame / totalFrames));
            this.y = initialY + (pushDistanceY * (currentFrame / totalFrames));
            currentFrame++;
            this.world.hurtPepeSound.play();
            requestAnimationFrame(animate);
        } else {
            this.x = initialX + pushDistanceX;
            this.y = initialY + pushDistanceY;
        }
    };

    animate();
}

/**
 * Moves the object right.
 */
moveRight() {
    this.x += this.speed;
}

/**
 * Moves the object left.
 */
moveLeft() {
    this.x -= this.speed;
}

/**
 * Makes the object jump.
 */
jump() {
    this.speedY = 30;
}

}
