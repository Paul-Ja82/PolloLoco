class Keyboard {
LEFT = false;
RIGHT = false;
UP = false;
DOWN = false;
J = false;
D = false;

/**
 * Initializes touch event listeners.
 */
constructor() {
    document.addEventListener('DOMContentLoaded', () => {
        this.btnPressEvents();
    });
}

/**
 * Sets up touch events for control buttons.
 */
btnPressEvents() {
    this.setTouch('btn-left', 'LEFT');
    this.setTouch('btn-right', 'RIGHT');
    this.setTouch('btn-jump', 'UP');
    this.setTouch('btn-throw', 'D');
}

/**
 * Binds touch events to button actions.
 * @param {string} buttonId - Button ID.
 * @param {string} action - Action to trigger.
 */
setTouch(buttonId, action) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener('touchstart', () => {
            this[action] = true;
        }, { passive: true });
        btn.addEventListener('touchend', () => {
            this[action] = false;
        }, { passive: true });
    }
}

}
