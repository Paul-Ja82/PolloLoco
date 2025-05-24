class salsabottle extends CollectableObject {
height = 70;
width = 70;
y = 360;
IMAGES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];

/**
 * Initializes the salsa bottle with a random position and starts animation.
 */
constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES);
    this.x = Math.random() * 2000 + Math.random() * 800;
    this.animate();
}

/**
 * Plays the salsa bottle animation in intervals.
 */
animate() {
    setInterval(() => {
        this.playAnimation(this.IMAGES);
    }, 350);
}

}