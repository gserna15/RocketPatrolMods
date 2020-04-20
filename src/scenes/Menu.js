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