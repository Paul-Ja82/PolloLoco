class DrawableObject {
x = 120;
y = 280;
img;
height = 150;
width = 100;
imageCache = {};
currentImage = 0;
percentage = 0;

offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

/**
 * Loads an image and assigns it to the object.
 * @param {string} path - Image path.
 */
loadImage(path) {
    this.img = new Image();
    this.img.src = path;
}

/**
 * Loads multiple images into the cache.
 * @param {string[]} arr - Array of image paths.
 */
loadImages(arr) {
    arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}

/**
 * Draws the object on the canvas.
 * @param {CanvasRenderingContext2D} ctx - Canvas context.
 */
draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

/**
 * Draws a debug frame around the object.
 * @param {CanvasRenderingContext2D} ctx - Canvas context.
 */
drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof smallChicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
        ctx.strokeStyle = 'red';
        /*ctx.stroke();*/
    }
}

/**
 * Sets percentage and updates the image.
 * @param {number} percentage - New percentage value.
 */
setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.getImgIdx()];
    this.img = this.imageCache[path];
}

/**
 * Gets the image index based on percentage.
 * @returns {number} Image index.
 */
getImgIdx() {
    throw new Error("getImgIdx() must be implemented please.");
}

}