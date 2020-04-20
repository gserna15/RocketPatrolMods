/*
Gabrielle Serna 
April 19, 2020

Points Breakdown:
1. Create a scrolling tile sprite for the background (10)
2. Allow player to control the rocket after it's fired (10)
3. Create a new title screen (15)
4. Implement Parallax Scrolling (15)
5. Create artwork for all in-game assets (25)
6. Implement mouse control for player movement (20)      
      *not 25 because you still use (F) to fire
5. Add a fourth spaceship worth more points (5)      
      * I tried to add the additional fourth and smaller spaceships that was worth more points, 
      but only got so far as being able to add the spaceship and make it worth the most points...

  Total: 100
*/

class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        //preload game audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        //preload menu background
        this.load.image('menuBackground','./assets/menuBackground.png');
    }

    create(){

       //place menu tile sprite
       this.menuBackground = this.add.tileSprite(0,0,640,480,'menuBackground').setOrigin(0,0);
       
       //display the menu
        let menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '25px',
            //backgroundColor: '#F3B141',
            //color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //console.log(this);
        //displays menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'Rocket Patrol!', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use your mouse to move & (F) to Fire',menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        this.add.text(centerX, centerY + textSpacer, 'Press <- for Easy Mode or -> for Hard Mode', menuConfig).setOrigin(0.5);

        //launches the next scene
        //this.scene.start("playScene");
    
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        //scroll starBackground
        this.menuBackground.tilePositionX -= 2;
        this.menuBackground.tilePositionY -= 2;

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          //easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          //hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}