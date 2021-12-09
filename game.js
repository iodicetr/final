var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 800,
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Scene1, Scene2]
};

var car;
var map;
var tracker1;
var tracker2;
var cursors;
var spaceKey;

var game = new Phaser.Game(config);
