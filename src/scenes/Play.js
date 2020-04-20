class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images and title sprite
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starBackground','./assets/starBackground.png');
        this.load.image('starBackground2','./assets/starBackground2.png');
        this.load.image('starBackground3','./assets/starBackground3.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        //place layered tile sprites for parallax scrolling
        this.starBackground = this.add.tileSprite(0,0,640,480,'starBackground').setOrigin(0,0);
        this.starBackground2 = this.add.tileSprite(0,0,640,480,'starBackground2').setOrigin(0,0);
        this.starBackground3 = this.add.tileSprite(0,0,640,480,'starBackground3').setOrigin(0,0);

        //facade rectangle borders
        this.add.rectangle(5,5,630,32, 0xFACADE).setOrigin(0,0);
        this.add.rectangle(5,443,630,32, 0xFACADE).setOrigin(0,0);
        this.add.rectangle(5,5,32,455, 0xFACADE).setOrigin(0,0);
        this.add.rectangle(603,5,32,455, 0xFACADE).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket');

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 288, 72, 'spaceship', 0, 40).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);


        //defining the keyboard keys here
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        //boom boom animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //bind score property to scene
        this.p1Score = 0;

        //display the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
    
        //game over flag
        this.gameOver = false;

        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //left and right movement with the mouse! move your mouse and the rocket will follow
        if(!this.isFiring){
            if(this.p1Rocket.x >= this.input.mousePointer.x){
                this.p1Rocket.x -= 2;
            }else if(this.p1Rocket.x <= this.input.mousePointer.x){
                this.p1Rocket.x += 2;
            }
        }

        //check key input to restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }

        //return to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scroll starBackgrounds for parallax scrolling!
        this.starBackground.tilePositionX -= 1;
        this.starBackground2.tilePositionX -= 2;
        this.starBackground3.tilePositionX -= 3;

        if(!this.gameOver){
            //update the rocket
            this.p1Rocket.update();
            //update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        //checking for collisions and reseting if true
        if(this.checkCollision(this.p1Rocket,this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
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

    //calls boom boom animation
    shipExplode(ship) {
        //initially hides ship
        ship.alpha = 0;
        //creates explosion sprite where ship is
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');     // plays boom boom animation
        boom.on('animationcomplete', () => {    // callsback after animation finishes
            ship.reset();       //resets ship 
            ship.alpha = 1;     //makes ship visible again
            boom.destroy();     //removes explosion sprite
        });   
        
        //score increase and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 

        //make ship explosion boom boom
        this.sound.play('sfx_explosion');
    }
}