class StatusbarCoins extends DrawableObject {
x = 220;
y = 280;
height = 150;
width = 100;

/** Coin status images */
IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
];

coins = 0;

/**
 * Initializes the coin status bar.
 */
constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setCoins(0);
}

/**
 * Updates coin count and image.
 * @param {number} coins - Collected coins.
 */
setCoins(coins) {
    this.coins = coins;
    let path = this.IMAGES[this.getImgIdx()];
    this.img = this.imageCache[path];
}

/**
 * Returns the image index for the coin count.
 * @returns {number} Image index.
 */
getImgIdx(){
    if (this.coins >= 5) {
        return 5;
    } else if (this.coins === 4) {
        return 4;
    } else if (this.coins === 3) {
        return 3;
    } else if (this.coins === 2) {
        return 2;
    } else if (this.coins === 1) {
        return 1;
    } else {
        return 0;
    }
}

}