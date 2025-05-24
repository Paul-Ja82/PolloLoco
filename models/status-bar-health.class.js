class Statusbar extends DrawableObject {
x = 220;
y = 280;
height = 150;
width = 100;

/** Health status images */
IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
];

percentage = 100;

/**
 * Initializes the health status bar.
 */
constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
}

/**
 * Gets the image index based on health.
 * @returns {number} Image index.
 */
getImgIdx() {
    if (this.percentage == 100) {
        return 5;
    } else if (this.percentage > 80) {
        return 4;
    } else if (this.percentage > 60) {
        return 3;
    } else if (this.percentage > 40) {
        return 2;
    } else if (this.percentage > 20) {
        return 1;
    } else {
        return 0;
    }
}

}