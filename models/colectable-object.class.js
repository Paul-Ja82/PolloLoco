class CollectableObject extends MovableObject {

constructor() {
    super();
    this.onCollisionCourse = false;
}

/**
 * Handles the collection of the object, which typically involves applying gravity to it.
 */
collect() {
    this.applyGravity();
}

/**
 * Applies gravity to the object, making it fall down if it is above ground.
 */
applyGravity() {
    setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }, 1000 / 60);
}

}