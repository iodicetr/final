class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create()
    {
        //Set Start Game to FALSE
        start_game = false;
        
        this.matter.world.setBounds(5, 5, 790, 790);

        map = this.add.sprite(0, 0, 'map').setOrigin(0,0);
        map.displayWidth = 800;
        map.displayHeight = 800;

        //Collisions
        var cat1 = this.matter.world.nextCategory();
        var cat2 = this.matter.world.nextCategory();
        
        this.shapes = this.cache.json.get('shapes');

        this.center_wall = this.matter.add.sprite(305, 400, 'center_wall', null, {shape: this.shapes.center_wall});
        this.center_wall.setScale(.78);
        this.center_wall.setVisible(false);

        this.top_wall = this.matter.add.sprite(400, 90, 'top_wall', null, {shape: this.shapes.top_wall});
        this.top_wall.setScale(.78);
        this.top_wall.setVisible(false);

        this.right_wall = this.matter.add.sprite(624, 418, 'right_wall', null, {shape: this.shapes.right_wall});
        this.right_wall.setScale(.78);
        this.right_wall.setVisible(false);

        this.bottom_wall = this.matter.add.sprite(407, 745, 'bottom_wall', null, {shape: this.shapes.bottom_wall});
        this.bottom_wall.setScale(.78);
        this.bottom_wall.setVisible(false);

        this.finish_line = this.matter.add.sprite(62, 334, 'finish_line', null, {shape: this.shapes.finish_line});
        this.finish_line.setScale(.78);
        this.finish_line.setVisible(false);

        this.can_finish_line = this.matter.add.sprite(62, 500, 'can_finish_line', null, {shape: this.shapes.can_finish_line});
        this.can_finish_line.setScale(1.2);
        this.can_finish_line.setVisible(false);
        

        
        
        //This is called every time a collision starts
        this.matter.world.on("collisionstart", (start_event) => {
            start_event.pairs.forEach((pair) => {
                const { bodyA, bodyB } = pair;

                //If you hit the wall
                if(bodyA.label == "Rectangle Body" || bodyA.label == "center_wall" || bodyA.label == "bottom_wall" 
                || bodyA.label == "top_wall" || bodyA.label == "right_wall" ) {
                    this.crash();
                }

                //Crossing the finish_line
                if(bodyA.label == "finish_line") {
                    this.finished_lap();
                }

                //Must pass the can_finish_line before a lap time counts
                if(bodyA.label == "can_finish_line") {
                    this.can_finish = true;
                }
            });
        });


        car = this.matter.add.sprite(74, 367, 'car');
        car.setVisible(true);
        car.setScale(0.01);
        car.setAngle(-90);
        car.setFrictionAir(0.1);
        car.setMass(300);

        //Default car variables
        offtrack = false; //car starts on the tack
        crash = false;
        this.count = 0;
        this.can_finish = false;

        //Side Bar Text
        this.drs_label = this.add.text(807, 500, "DRS:", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.drs_value = this.add.text(852, 500, "[NO]", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.reset = this.add.text(807, 700, "[R] to reset", { font: "16px Arial", fill: "#ffffff", align: "center" });
        
        //START TEXT
        this.start_text = this.add.text(60, 100, "The clock will start once you press UP ARROW Key", {font: "30px Arial", fill: "#302b2b", align: "center"}).setBackgroundColor('#ffffff');

        //Lap Time text
        this.initialTime = 0;
        this.add.text(807, 10, "Current Lap: ", { font: "16px Arial", fill: "#ffffff", align: "center" });
        lap_time = this.add.text(807, 40, ''+this.formatTime(this.initialTime), { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.add.text(803, 170, "Lap Times: ", { font: "16px Arial", fill: "#ffffff", align: "center" });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.r_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        
    }

    crash() {
        crash = true;
        this.boom = this.add.sprite(car.x, car.y, 'explosion');
        this.boom.setScale(2);
        this.boom.play("explode");
        car.setVisible(false);
        this.boom.once('animationcomplete', ()=>{ 
            this.scene.start("endGame");
        });
        //this.time.delayedCall(2000, this.scene.start("endGame"), [], this);
        //this.scene.start("endGame");
    }

    game_start(){
        //Remove start text
        this.start_text.setVisible(false);
        
        //Start lap timer
        this.start_lap();

        //Make global variable true so other functions can know the game has started
        start_game = true;
    }

    finished_lap() {
        
        if(this.can_finish == true){
            if(this.count == 0){
                const temp1 = this.formatTime(this.initialTime);
                time1 = temp1;
                this.add.text(803, 200, "Lap 1: "+ time1, { font: "15px Arial", fill: "#ffffff", align: "center" });
            }
            if(this.count == 1){
                const temp2 = this.formatTime(this.initialTime);
                time2 = temp2;
                this.add.text(803, 230, "Lap 2: "+ time2, { font: "15px Arial", fill: "#ffffff", align: "center" });
            }
            if(this.count == 2){
                const temp3 = this.formatTime(this.initialTime);
                time3 = temp3;
                this.add.text(803, 260, "Lap 3: "+ time3, { font: "15px Arial", fill: "#ffffff", align: "center" });
                
                
                this.scene.start("endGame");
            }

            //Reset the count and lap 
            this.initialTime = 0;
            this.count++;
            this.can_finish = false;
        }
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

    onEvent() //Called my Lap time TIMER
    {
        this.initialTime += 1; // One second
        lap_time.setText(''+this.formatTime(this.initialTime));
    }

    start_lap() {
        this.initialTime = 0;
        timedEvent = this.time.addEvent({ delay: 10, callback: this.onEvent, callbackScope: this, loop: true });
    }

    update() {
        //The game has to start before the car can move
        if (start_game == false && this.cursors.up.isDown) {
            this.game_start();
        }

        if(start_game == true) {
            if (this.cursors.up.isDown)
            {
                if(offtrack == false) {
                    car.thrust(0.1);
                }
                else {
                    car.thrust(0.025);
                }

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
                if(offtrack == false) {
                    car.thrustBack(0.1);
                }
                else {
                    car.thrustBack(0.025);
                }
            
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
                if(offtrack == false) {
                    car.thrust(0.15);
                }
                else {
                    car.thrust(0.025);
                }

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
        }
        //You can restart the game without the game starting
        if(this.r_key.isDown)
        {
            this.reset_game();
        }
    }

    reset_game() {
        this.scene.start('playGame')
    }
}