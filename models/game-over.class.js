class GameOver extends DrawableObject {
height = 480;
width = 720;
x = 0;
y = 0;

/**
 * Loads the game over image.
 * @param {string} path - Image path.
 */
constructor(path) {
    super().loadImage(path);
}

}