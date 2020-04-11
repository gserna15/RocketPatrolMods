class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images and title sprite
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starBackground','./assets/starBackground.png');
    }

    create(){

        //place tile sprite
        this.starBackground = this.add.tileSprite(0,0,640,480,'starBackground').setOrigin(0,0);

        //white rectangle borders
        this.add.rectangle(5,5,630,32, 0xFACADE).setOrigin(0,0);
        this.add.rectangle(5,443,630,32, 0xFACADE).setOrigin(0,0);
        this.add.rectangle(5,5,32,455, 0xFACADE).setOrigin(0,0);
        this.add.rectangle(603,5,32,455, 0xFACADE).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0);
    }

    update(){
        //scroll starBackground
        this.starBackground.tilePositionX -= 4;
    }
}