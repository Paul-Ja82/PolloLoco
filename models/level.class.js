class Level {
enemies;
clouds;
backgroundObjects;
coins;
salsabottles;
level_end_x = 5000;

/**
 * Initializes the game level with enemies, clouds, background objects, coins, and salsa bottles.
 */
constructor(enemies, clouds, backgroundObjects, coins, salsabottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.salsabottles = salsabottles;
}


}