class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create()
    {
        this.matter.world.setBounds(5, 5, 790, 790);

        map = this.add.image(0, 0, 'map').setOrigin(0,0);
        map.displayWidth = 800;
        map.displayHeight = 800;

        /*
        center_wall = this.matter.add.image(390,423, 'center_wall').setStatic(true);
        center_wall.setScale(1.17);
        center_wall.setVisible(false);
        */

        /*
        finish_line = this.matter.add.image(62,335, 'finish_line').setStatic(true);
        finish_line.setScale(0.9);
        */

        car = this.matter.add.image(74, 367, 'car');
        
        car.setScale(0.01);
        car.setAngle(-90);
        car.setFrictionAir(0.1);
        car.setMass(300);

        //Side Bar Text
        this.drs_label = this.add.text(807, 100, "DRS:", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.drs_value = this.add.text(852, 100, "[NO]", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.reset = this.add.text(807, 700, "[R] to reset", { font: "16px Arial", fill: "#ffffff", align: "center" });
        
        //START TEXT
        this.start_text = this.add.text(80, 100, "The clock will start once you press UP ARROW Key", {font: "30px Arial", fill: "#302b2b", align: "center"}).setBackgroundColor('#ffffff');

        this.initialTime = 0;
        //Lap Time text
        this.add.text(807, 10, "Current Lap: "+ this.formatTime(this.initialTime), { font: "16px Arial", fill: "#ffffff", align: "center" });
        lap_time = this.add.text(807, 40, ''+this.formatTime(this.initialTime), { font: "16px Arial", fill: "#ffffff", align: "center" });
        timedEvent = this.time.addEvent({ delay: 10, callback: this.onEvent, callbackScope: this, loop: true });


        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.r_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    cross_finish_line() {
        car.kill();
    }

    game_start(){
        
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/6000);
        // Seconds
        var partInSeconds = seconds%6000;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(4,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent () //Called my Lap time TIMER
    {
    this.initialTime += 1; // One second
    lap_time.setText(''+this.formatTime(this.initialTime));
    }

    update() {
        if (this.cursors.up.isDown)
        {
            car.thrust(0.1);
            
            //Remove start text
            this.start_text.setVisible(false);

            if (this.cursors.left.isDown)
            {
                car.angle -= 1.35;
            }
            else if (this.cursors.right.isDown)
            {
                car.angle += 1.35;
            }
        }
        else if (this.cursors.down.isDown)
        {
            car.thrustBack(0.1);
        
            if (this.cursors.left.isDown)
            {
                car.angle -= 1.35;
            }
            else if (this.cursors.right.isDown)
            {
                car.angle += 1.35;
            }
        }

        if(this.spaceKey.isDown)
        {
            car.thrust(0.15);
            this.drs_value.text = "[YES]";
            if (this.cursors.left.isDown)
            {
                car.angle -= 1.35;
            }
            else if (this.cursors.right.isDown)
            {
                car.angle += 1.35;
            }
        }
        else
        {
            this.drs_value.text = "[NO]"
        }

        if(this.r_key.isDown)
        {
            this.reset_game();
        }
    }

    reset_game() {
        car.setX(74);
        car.setY(367);
        car.setAngle(-90);
    }
}