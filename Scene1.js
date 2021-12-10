class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload ()
    {
    this.load.image('map', 'assets/map.png');
    this.load.image('car', 'assets/car.png');
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
        this.add.text(80, 360, "- Collisions with the wall will result in a crash", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 400, "- You must complete an entire lap before your time is counted", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 700, "- Press SPACE to enter the game", {font: "25px Arial", fill: "#66d0f2", align: "left" });
        
        //explosion sprite
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
            });


        //Request permissions for a notification
        if(Notification.permission !== "denied") {
            Notification.requestPermission();
        }

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
