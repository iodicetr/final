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
        this.shapes = this.cache.json.get('shapes');

        this.center_wall = this.matter.add.sprite(305, 400, 'center_wall', null, {shape: this.shapes.center_wall});
        this.center_wall.setScale(.78);

        this.top_wall = this.matter.add.sprite(400, 90, 'top_wall', null, {shape: this.shapes.top_wall});
        this.top_wall.setScale(.78);

        this.right_wall = this.matter.add.sprite(624, 418, 'right_wall', null, {shape: this.shapes.right_wall});
        this.right_wall.setScale(.78);

        this.bottom_wall = this.matter.add.sprite(407, 745, 'bottom_wall', null, {shape: this.shapes.bottom_wall});
        this.bottom_wall.setScale(.78);
        
        this.outer_circuit = this.matter.add.sprite(380, 410, 'outer_circuit', null, {shape: this.shapes.outer_circuit});
        this.outer_circuit.setScale(.78);

        this.inner_circuit = this.matter.add.sprite(365, 415, 'inner_circuit', null, {shape: this.shapes.inner_circuit});
        this.inner_circuit.setScale(.78);
        
        

        //This is called every time a collision starts
        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach((pair) => {
              const { bodyA, bodyB } = pair;
              const gameObjectA = bodyA.gameObject;
              const gameObjectB = bodyB.gameObject;
              //console.log(pair); console.log(gameObjectA); console.log(gameObjectB);
              
              const aIsEmoji = gameObjectA instanceof Phaser.Physics.Matter.Sprite;
              const bIsEmoji = gameObjectB instanceof Phaser.Physics.Matter.Sprite;
              console.log(gameObjectA);
              console.log(gameObjectB);
              
              if(gameObjectA == null) {
                  this.reset_game();
              }

            });
        });

        //This is called every time a collision ends
        this.matter.world.on("collisionend", (event) => {
            event.pairs.forEach((pair) => {
              const { bodyA, bodyB } = pair;
              const gameObjectA = bodyA.gameObject;
              const gameObjectB = bodyB.gameObject;

              console.log(gameObjectA);
              console.log(gameObjectB);
              
            //Check to see if the car has left the circuit
            if (gameObjectA.body.label == 'outer_circuit') {
                console.log("Left the Track");
            }


            });
        });
        


        /*
        finish_line = this.matter.add.image(62,335, 'finish_line').setStatic(true);
        finish_line.setScale(0.9);
        */

        car = this.matter.add.sprite(74, 367, 'car');
        //car.setCollisionGroup(1);
        car.setScale(0.01);
        car.setAngle(-90);
        car.setFrictionAir(0.1);
        car.setMass(300);

        //Side Bar Text
        this.drs_label = this.add.text(807, 100, "DRS:", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.drs_value = this.add.text(852, 100, "[NO]", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.reset = this.add.text(807, 700, "[R] to reset", { font: "16px Arial", fill: "#ffffff", align: "center" });
        
        //START TEXT
        this.start_text = this.add.text(60, 100, "The clock will start once you press UP ARROW Key", {font: "30px Arial", fill: "#302b2b", align: "center"}).setBackgroundColor('#ffffff');

        //Lap Time text
        this.initialTime = 0;
        this.add.text(807, 10, "Current Lap: "+ this.formatTime(this.initialTime), { font: "16px Arial", fill: "#ffffff", align: "center" });
        lap_time = this.add.text(807, 40, ''+this.formatTime(this.initialTime), { font: "16px Arial", fill: "#ffffff", align: "center" });


        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.r_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        
    }

    cross_finish_line() {
        
    }

    crash(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    game_start(){
        //Remove start text
        this.start_text.setVisible(false);
        
        //Start lap timer
        this.start_lap();

        //Make global variable true so other functions can know the game has started
        start_game = true;
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
                car.thrust(0.1);

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