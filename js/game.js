let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game.
 */
function init() {
    initLevel();
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.add('d-block');
    gameContainer.onkeydown = keyboard;
    gameContainer.onkeyup = keyboard;

    canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error("Canvas-Element nicht gefunden!");
        return;
    }
    canvas.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    world = new World(canvas, keyboard);
    completeInitialState(world);
}

/**
 * Toggles sound on/off.
 */
function noSoundGame() {
    world.isMuted = !world.isMuted;
    const muteIcon = document.getElementById('btn-mute');
    if (world.isMuted) {
        setVolume(0);
        muteIcon.innerHTML = mutedSVG();
    } else {
        setVolume(1);
        muteIcon.innerHTML = unmutedSVG();
    }
}

/**
 * Sets game sound volume.
 * @param {number} level - Volume level (0 or 1).
 */
function setVolume(level) {
    world.soundtrack.volume = level ? 0.8 : 0;
    world.bottleSound.volume = level;
    world.collectSound.volume = level;
    world.hurtPepeSound.volume = level ? 0.7 : 0;
    world.gameoverSound.volume = level ? 0.8 : 0;
    world.gameWin.volume = level ? 0.4 : 0;
    world.character.running.volume = level;
    world.character.jumping.volume = level;
    world.character.throwing.volume = level;
    world.character.pepeSnore.volume = level;
    world.character.squashSound.volume = level ? 0.6 : 0;
    world.character.chickenSound.volume = level ? 0.4 : 0;
    world.endboss.endbosSound.volume = level ? 0.8 : 0;
    world.endboss.bossDeadSound.volume = level ? 6 : 0;
}

/**
 * Sets the correct mute icon (muted or unmuted) when the page loads.
 */
document.addEventListener('DOMContentLoaded', () => {
    const muteIcon = document.getElementById('btn-mute');
    if (world && world.isMuted) {
        muteIcon.innerHTML = mutedSVG(); 
    } else {
        muteIcon.innerHTML = unmutedSVG();
    }
});

/**
 * Returns unmuted icon SVG.
 * @returns {string} Unmuted icon SVG.
 */
function unmutedSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="whitesmoke"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>';
}

/**
 * Returns muted icon SVG.
 * @returns {string} Muted icon SVG.
 */
function mutedSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="whitesmoke"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>';
}

/**
 * Shows the game menu and restarts the game.
 */
function gameMenu() {
    if (world) {
        world.clearAllIntervals();
    }
    document.getElementById('game-container').classList.remove('d-block');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('play-again-button').classList.add('d-none');
    restartGame(world); 
}

document.addEventListener('DOMContentLoaded', () => {
    const playAgainButton = document.getElementById('play-again-button');
    if (playAgainButton) {
        playAgainButton.onclick = function () {
            gameMenu();
            playAgainButton.classList.add('d-none');
        };
    }
});

/**
 * Listens for keydown events.
 */
window.addEventListener('keydown', (e) => {
    handleKeyPress(e, true);
});

/**
 * Listens for keyup events.
 */
window.addEventListener('keyup', (e) => {
    handleKeyPress(e, false);
});

/**
 * Updates key states.
 * @param {KeyboardEvent} e - Key event.
 * @param {boolean} isPressed - Key pressed or released.
 */
function handleKeyPress(e, isPressed) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = isPressed; break;
        case 37: keyboard.LEFT = isPressed; break;
        case 38: keyboard.UP = isPressed; break;
        case 40: keyboard.DOWN = isPressed; break;
        case 74: keyboard.J = isPressed; break;
        case 68: keyboard.D = isPressed; break;
        case 93: break;
    }
}
