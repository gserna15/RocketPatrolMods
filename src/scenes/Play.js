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

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket');

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);

        //defining the keyboard keys here
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //scroll starBackground
        this.starBackground.tilePositionX -= 4;

        //update the rocket
        this.p1Rocket.update();

        //update spaceships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //checking for collisions and reseting if true
        if(this.checkCollision(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.ship01.reset();
        }
    }

    checkCollision(rocket,ship){
        //checking if player hits a ship
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            console.log('true');
            return true;
        }else{
            console.log('false');
            return false;
        }
    }
}