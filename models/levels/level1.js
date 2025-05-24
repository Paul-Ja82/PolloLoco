/**
 * Initializes level 1 of the game by setting up all game elements such as enemies, clouds, background objects, coins, and salsa bottles.
 */
function initLevel() {
    document.getElementById('start-screen').classList.add('d-none');


/**
 * Creates a new level with specified game elements.
 * @type {Level}
 */
level1 = new Level(
[
new Chicken(),
new Chicken(),
new Chicken(),
new Chicken(),
new Chicken(),
new smallChicken(),
new smallChicken(),
new smallChicken(),
new smallChicken()
],

[
  new Cloud(0),
new Cloud(500),
new Cloud(1000),
new Cloud(1500),
new Cloud(2000),
new Cloud(2500),
new Cloud(3000),
new Cloud(3500),
new Cloud(4000),
new Cloud(4500),
new Cloud(5000),
],

[
new BackgroundObject('img/5_background/layers/air.png', -719),
new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

new BackgroundObject('img/5_background/layers/air.png', 0),
new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
new BackgroundObject('img/5_background/layers/air.png', 719),
new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7)
],

/**
 * Generates an array of coin objects placed in linear and circular patterns.
 * @returns {Coin[]} Array of coin objects.
 */
(function () {
    let coins = [];

    for (let i = 0; i < 10; i++) {
        let x = 350 + i * 350;
        let y = 100 + Math.random() * 150;
        coins.push(new Coin(x, y));
    }

    let angleIncrement = Math.PI / 10;
    for (let i = 0; i < 10; i++) {
        const x = 2400 + 200 * Math.cos(i * angleIncrement);
        const y = 250 - 200 * Math.sin(i * angleIncrement);
        coins.push(new Coin(x, y));
    }

    return coins;
})(),

/**
 * Creates an array of salsa bottle objects.
 * @returns {salsabottle[]} Array of salsa bottle objects.
 */
[
    new salsabottle(),
    new salsabottle(),
    new salsabottle()
],

    );
}