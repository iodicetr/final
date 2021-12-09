class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload ()
    {
    this.load.image('map', 'assets/map.png');
    this.load.image('car', 'assets/car.png');
    this.load.image('finish_line', 'assets/finish_line.png');
    this.load.image('center_wall', 'assets/center_wall.png');

    this.load.json('map_physics', 'assets/map_physics.json');
    }

    
    create() {
        this.add.text(20, 20, "Loading game...");
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
    }
    update() {
        if(spaceKey.isDown)
        {
            this.scene.start("playGame");
        }
    }
}
