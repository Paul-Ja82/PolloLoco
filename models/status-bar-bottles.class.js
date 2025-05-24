class StatusbarBottles extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;

/** Bottle status images */
IMAGES = [
'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
];

bottles = 3;

/**
 * Initializes the status bar.
 */
constructor() {
super();
this.loadImages(this.IMAGES);
this.x = 40;
this.y = 100;
this.width = 200;
this.height = 60;
this.setBottles(3);
}

/**
 * Updates the bottle count and image.
 */
setBottles(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES[this.getImgIdx()];
    this.img = this.imageCache[path];
}

/**
 * Returns the image index for the current bottle count.
 */
getImgIdx(){
    if (this.bottles >= 5) {
        return 5;
    } else if (this.bottles === 4) {
        return 4;
    } else if (this.bottles === 3) {
        return 3;
    } else if (this.bottles === 2) {
        return 2;
    } else if (this.bottles === 1) {
        return 1;
    } else {
        return 0;
    }
}

}
