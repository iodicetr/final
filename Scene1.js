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
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
        frameWidth: 16,
        frameHeight: 16
      });

    this.load.json('shapes', 'assets/map_physics.json');
    }

    
    create() {
        this.add.text(350, 20, "Race Tycoon", {font: "36px Arial", fill: "#66d0f2", align: "center" });
        this.add.text(80, 100, "- Use ARROW KEYS to drive", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 140, "- Press SPACE to activate DRS", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 180, "- Press R to restart", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(390, 250, "Objective", {font: "30px Arial", fill: "#66d0f2", align: "center" });
        this.add.text(80, 320, "- You have three laps to complete the fastest lap", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 360, "- The fastest of the three laps will be saved to the leader board", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 400, "- Collisions with the wall will result in an explosion and restart", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 440, "- Driving in the dirt will slow you down", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 500, "- Press SPACE to enter the game", {font: "25px Arial", fill: "#eb4034", align: "left" });
        
        //explosion sprite
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
            });


        //Needed to leave scene 1 and go to scene 2
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(spaceKey.isDown)
        {
            this.scene.start("playGame");
        }
    }
}
