class StatusbarEndboss extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;
    
    /** Health status images */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
        
    ];
    
    percentage = 100;
    
    /**
     * Initializes the health status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 45;
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
        } else if (this.percentage > 50) {
            return 3;
        } else if (this.percentage > 0 && this.percentage < 50) { 
            return 2;
        } else {
            return 0;
        }
    }
    
    }