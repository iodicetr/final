var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 800,
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Scene1, Scene2, Scene3]
};

var car;
var map;
var tracker1;
var tracker2;
var cursors;
var spaceKey;
var start_game;
var lap_time;
var timedEvent;
var offtrack;
var time1 = 0, time2 = 0, time3 = 0, bestLap = 0;
var crash;


var game = new Phaser.Game(config);
