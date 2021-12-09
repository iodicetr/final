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
        this.drs_label = this.add.text(807, 10, "DRS:", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.drs_value = this.add.text(852, 10, "[NO]", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.reset = this.add.text(807, 700, "[R] to reset", { font: "16px Arial", fill: "#ffffff", align: "center" });
        

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.r_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    cross_finish_line() {
        car.kill();
    }

    update() {
        

        
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

        if(this.r_key.isDown)
        {
            reset_game();
        }
    }

    reset_game() {
        car.setX(74);
        car.setY(367);
        car.setAngle(-90);
    }
}