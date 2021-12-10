class Scene3 extends Phaser.Scene {
    constructor() {
        super("endGame");
    }
    
    create() {
        //Check if they crashed
        if (crash == true){
            this.showNotification();
            this.add.text(80, 100, "END OF GAME BECAUSE OF CRASH", {font: "25px Arial", fill: "#c9140e", align: "left" });
            this.add.text(80, 180, "- Lap 1: "+ time1, {font: "20px Arial", fill: "#c9140e", align: "left" });
            this.add.text(80, 220, "- Lap 2: "+ time2, {font: "20px Arial", fill: "#c9140e", align: "left" });
            this.add.text(80, 260, "- Lap 3: "+ time3, {font: "20px Arial", fill: "#c9140e", align: "left" });
        }
        else {
            this.add.text(80, 180, "- Lap 1: "+ time1, {font: "20px Arial", fill: "#ffffff", align: "left" });
            this.add.text(80, 220, "- Lap 2: "+ time2, {font: "20px Arial", fill: "#ffffff", align: "left" });
            this.add.text(80, 260, "- Lap 3: "+ time3, {font: "20px Arial", fill: "#ffffff", align: "left" });
            this.add.text(80, 100, "END OF GAME", {font: "25px Arial", fill: "#ffffff", align: "left" });     
        }
        this.add.text(350, 20, "Race Tycoon", {font: "36px Arial", fill: "#66d0f2", align: "center" });
        this.add.text(80, 140, "Lap Times:", {font: "20px Arial", fill: "#ffffff", align: "left" });
        
        this.add.text(80, 700, "- Press [R] to RESTART the game", {font: "25px Arial", fill: "#66d0f2", align: "left" });
        
       
        //Needed to leave scene 3 and go to scene 1
        this.r_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update() {
        if(this.r_key.isDown)
        {
            this.scene.start("bootGame");
        }
    }

    showNotification() {
        const notification = new Notification("OH NO! You Crashed!", {
            body: "If we really feared the crash, most of us would be unable to look at a car, let alone drive one!",
            icon: "assets/icon.png"
        });

        notification.onclick = (e) => {
            window.location.href = "";
        }

    }
}
