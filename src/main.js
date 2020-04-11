let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

//just reservin some keyboard variables
let keyF, keyLEFT, keyRIGHT;