/**
 * Saves the initial state of a character to localStorage.
 * @param {Object} character - The character object.
 */
function saveInitialCharacterState(character) {
    const state = getCharacterState(character);
    localStorage.setItem('initialCharacterState', JSON.stringify(state));
}

/**
 * Extracts the state of a character.
 * @param {Object} character - The character object.
 * @returns {Object} The state of the character.
 */
function getCharacterState(character) {
    return {
        x: character.x,
        y: character.y,
        speed: character.speed,
        speedY: character.speedY,
        height: character.height,
        width: character.width,
        movement: character.movement,
        isHurt: character.isHurt ? character.isHurt() : false,
        isDead: character.isDead ? character.isDead() : false,
        isMoving: character.isMoving ? character.isMoving() : false,
        isAboveGround: character.isAboveGround ? character.isAboveGround() : false,
    };
}

/**
 * Saves the initial state of a drawable object to localStorage.
 * @param {Object} drawable - The drawable object.
 */
function saveInitialDrawableState(drawable) {
    const state = getDrawableState(drawable);
    localStorage.setItem('initialDrawableState', JSON.stringify(state));
}

/**
 * Extracts the state of a drawable object.
 * @param {Object} drawable - The drawable object.
 * @returns {Object} The state of the drawable object.
 */
function getDrawableState(drawable) {
    return {
        x: drawable.x,
        y: drawable.y,
        width: drawable.width,
        height: drawable.height,
        percentage: drawable.percentage,
        offset: drawable.offset,
        currentImage: drawable.currentImage,
    };
}

/**
 * Saves the initial state of the world to localStorage.
 * @param {Object} world - The world object.
 */
function saveInitialWorldState(world) {
    const state = getWorldState(world);
    localStorage.setItem('initialWorldState', JSON.stringify(state));
}

/**
 * Extracts the state of the world.
 * @param {Object} world - The world object.
 * @returns {Object} The state of the world.
 */
function getWorldState(world) {
    return {
        cameraX: world.cameraX,
        bottles: world.bottles,
        coins: world.coins,
        isGameOver: world.isGameOver,
        isGameWon: world.isGameWon,
        isMuted: world.isMuted,
        character: getCharacterState(world.character),
        endboss: getEndbossState(world.endboss),
        level: getLevelState(world.level),
    };
}

/**
 * Extracts the state of the endboss.
 * @param {Object} endboss - The endboss object.
 * @returns {Object} The state of the endboss.
 */
function getEndbossState(endboss) {
    return {
        x: endboss.x,
        y: endboss.y,
        energy: endboss.energy,
        height: endboss.height,
        width: endboss.width,
        speed: endboss.speed,
    };
}

/**
 * Saves the initial state of the endboss to localStorage.
 * @param {Object} endboss - The endboss object.
 */
function saveInitialEndbossState(endboss) {
    const state = getEndbossState(endboss);
    localStorage.setItem('initialEndbossState', JSON.stringify(state));
}

/**
 * Extracts the state of the level.
 * @param {Object} level - The level object.
 * @returns {Object} The state of the level.
 */
function getLevelState(level) {
    return {
        enemies: level.enemies.map(getEnemyState),
        coins: level.coins.map(getCollectableState),
        salsabottles: level.salsabottles.map(getCollectableState),
    };
}

/**
 * Extracts the state of an enemy.
 * @param {Object} enemy - The enemy object.
 * @returns {Object} The state of the enemy.
 */
function getEnemyState(enemy) {
    return { x: enemy.x, y: enemy.y, energy: enemy.energy };
}

function getCollectableState(object) {
    return { x: object.x, y: object.y };
}

/**
 * Saves the initial state of a movable object to localStorage.
 * @param {Object} movable - The movable object.
 */
function saveInitialMovableState(movable) {
    const state = getMovableState(movable);
    localStorage.setItem('initialMovableState', JSON.stringify(state));
}

/**
 * Extracts the state of a movable object.
 * @param {Object} movable - The movable object.
 * @returns {Object} The state of the movable object.
 */
function getMovableState(movable) {
    return {
        x: movable.x,
        y: movable.y,
        speed: movable.speed,
        speedY: movable.speedY,
        acceleration: movable.acceleration,
        energy: movable.energy,
        enemyEnergy: movable.enemyEnergy,
        isActive: movable.isActive,
        onCollisionCourse: movable.onCollisionCourse,
        offsetX: movable.offsetX,
        offsetY: movable.offsetY,
    };
}

/**
 * Saves the initial state of a collectable object to localStorage.
 * @param {Object} object - The collectable object.
 */
function saveInitialCollectableObjectState(object) {
    const state = getCollectableObjectState(object);
    localStorage.setItem('initialCollectableObjectState', JSON.stringify(state));
}

/**
 * Extracts the state of a collectable object.
 * @param {Object} object - The collectable object.
 * @returns {Object} The state of the collectable object.
 */
function getCollectableObjectState(object) {
    return {
        x: object.x,
        y: object.y,
        speedY: object.speedY,
        acceleration: object.acceleration,
        height: object.height,
        width: object.width,
        onCollisionCourse: object.onCollisionCourse,
    };
}

/**
 * Saves the initial state of a chicken to localStorage.
 * @param {Object} chicken - The chicken object.
 */
function saveInitialChickenState(chicken) {
    const state = getChickenState(chicken);
    localStorage.setItem('initialChickenState', JSON.stringify(state));
}

/**
 * Extracts the state of a chicken.
 * @param {Object} chicken - The chicken object.
 * @returns {Object} The state of the chicken.
 */
function getChickenState(chicken) {
    return {
        x: chicken.x,
        y: chicken.y,
        speed: chicken.speed,
        height: chicken.height,
        width: chicken.width,
        offset: chicken.offset,
        onCollisionCourse: chicken.onCollisionCourse,
        isDead: chicken.isEnemyDead ? chicken.isEnemyDead() : false,
    };
}

/**
 * Saves the initial states of all small chickens to localStorage.
 * @param {Array} smallChickens - An array of small chicken objects.
 */
function saveAllSmallChickensState(smallChickens) {
    const states = smallChickens.map(getChickenState);
    localStorage.setItem('allSmallChickensState', JSON.stringify(states));
}

/**
 * Saves the complete initial state of the game to localStorage.
 * @param {Object} world - The world object.
 */
function completeInitialState(world) {
    saveInitialCharacterState(world.character);
    saveInitialWorldState(world);
    saveInitialEndbossState(world.endboss);
    saveAllSmallChickensState(
        world.level.enemies.filter(enemy => enemy instanceof smallChicken)
    );
    saveLevelObjects(world.level);
}

/**
 * Saves the state of level objects (coins, bottles, enemies) to localStorage.
 * @param {Object} level - The level object.
 */
function saveLevelObjects(level) {
    level.coins.forEach(saveInitialCollectableObjectState);
    level.salsabottles.forEach(saveInitialCollectableObjectState);
    level.enemies.forEach(saveInitialDrawableState);
}

/**
 * Restarts the game by restoring initial states and resetting the game world.
 * @param {Object} world - The world object.
 */
function restartGame(world) {
    resetSound(world);
    restoreCharacterState(world);
    restoreWorldState(world);
    restoreEndbossState(world);
    restoreSmallChickensState(world);
    resetUI(world);
}

/**
 * Resets the game sound, pauses all audio, and restores initial volumes.
 * @param {Object} world - The world object.
 */
function resetSound(world) {
    if (world.soundtrack) {
        world.soundtrack.pause();
        world.soundtrack.currentTime = 0;
        world.soundtrack.volume = world.isMuted ? 0 : 0.8;
        pauseCharacterSounds(world.character);
        world.endboss.endbosSound.pause();
    }
}

/**
 * Pauses all character-specific sounds.
 * @param {Object} character - The character object.
 */
function pauseCharacterSounds(character) {
    character.running.pause();
    character.pepeSnore.pause();
    character.chickenSound.pause();
}

/**
 * Restores the character's state from localStorage.
 * @param {Object} world - The world object.
 */
function restoreCharacterState(world) {
    const state = JSON.parse(localStorage.getItem('initialCharacterState'));
    if (state) Object.assign(world.character, state);
}

/**
 * Restores the world's state from localStorage and resets level data.
 * @param {Object} world - The world object.
 */
function restoreWorldState(world) {
    const state = JSON.parse(localStorage.getItem('initialWorldState'));
    if (state) {
        Object.assign(world, {
            cameraX: state.cameraX,
            bottles: state.bottles,
            coins: state.coins,
            isGameOver: false,
            isGameWon: false,
            isMuted: state.isMuted,
        });
        restoreLevelState(world.level, state.level);
    }
}

/**
 * Restores the state of the level from saved data.
 * @param {Object} level - The current level object.
 * @param {Object} savedLevel - The saved state of the level.
 */
function restoreLevelState(level, savedLevel) {
    restoreEnemies(level.enemies, savedLevel.enemies);
    restoreObjects(level.coins, savedLevel.coins);
    restoreObjects(level.salsabottles, savedLevel.salsabottles);
}

/**
 * Restores the state of enemies from saved data.
 * @param {Array} enemies - The current enemies to restore.
 * @param {Array} savedEnemies - The saved state of the enemies.
 */
function restoreEnemies(enemies, savedEnemies) {
    savedEnemies.forEach((state, index) => {
        if (enemies[index]) Object.assign(enemies[index], state);
    });
}

/**
 * Restores the state of a list of objects from saved data.
 * @param {Array} objects - The current objects to restore.
 * @param {Array} savedObjects - The saved state of the objects.
 */
function restoreObjects(objects, savedObjects) {
    savedObjects.forEach((state, index) => {
        if (objects[index]) Object.assign(objects[index], state);
    });
}

/**
 * Restores the endboss state from localStorage.
 * @param {Object} world - The world object.
 */
function restoreEndbossState(world) {
    const state = JSON.parse(localStorage.getItem('initialEndbossState'));
    if (state) Object.assign(world.endboss, state);
}

/**
 * Restores the state of all small chickens from localStorage.
 * @param {Object} world - The world object.
 */
function restoreSmallChickensState(world) {
    const states = JSON.parse(localStorage.getItem('allSmallChickensState'));
    if (states) {
        states.forEach((state, index) => {
            const chicken = world.level.enemies[index];
            if (chicken) Object.assign(chicken, state);
        });
    }
}

/**
 * Resets the game UI and redraws the game world.
 * @param {Object} world - The world object.
 */
function resetUI(world) {
    world.statusbar.setPercentage(world.character.energy);
    world.statusbarCoins.setCoins(world.coins);
    world.statusbarBottles.setBottles(world.bottles);
    world.draw();
}
