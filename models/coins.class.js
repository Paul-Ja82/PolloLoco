class Coin extends CollectableObject {
    height = 100;
    width = 100;

/** Coin animation images */
IMAGES = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
];

/**
 * Initializes a coin at the given position.
 * @param {number} x - X-position of the coin.
 * @param {number} y - Y-position of the coin.
 */
constructor(x, y) {
    super();
    this.loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
}

/**
 * Starts the coin's animation.
 */
animate() {
    setInterval(() => {
        this.playAnimation(this.IMAGES);
    }, 200);
}

}
