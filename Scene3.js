class Scene3 extends Phaser.Scene {
    constructor() {
        super("endGame");
    }
    
    create() {
        this.add.text(350, 20, "Race Tycoon", {font: "36px Arial", fill: "#66d0f2", align: "center" });
        this.add.text(80, 100, "END OF GAME", {font: "25px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 140, "- Lap Times:", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 180, "- Lap 1: "+ time1, {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 220, "- Lap 2: "+ time1, {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 260, "- Lap 3: "+ time1, {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(390, 350, "Leader Board", {font: "30px Arial", fill: "#66d0f2", align: "center" });
        this.add.text(80, 320, "- 1. " + , {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 360, "---- 2. The fastest of the three laps will be saved to the leader board", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 400, "-------- 3. Collisions with the wall will result in an explosion and restart", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 440, "-------------4. Driving in the dirt will slow you down", {font: "20px Arial", fill: "#ffffff", align: "left" });
        this.add.text(80, 700, "- Press SPACE to RESTART the game", {font: "25px Arial", fill: "#66d0f2", align: "left" });
        
       
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
