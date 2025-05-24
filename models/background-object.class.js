class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

/**
* Initializes a background object.
* @param {string} imagePath - Image path for the background.
* @param {number} x - X-position of the background.
*/
constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
}

}
