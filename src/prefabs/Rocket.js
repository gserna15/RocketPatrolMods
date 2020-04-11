//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add an object to the existing scene
        scene.add.existing(this);

        this.isFiring = false;  //track rocket's firing status
    }

    update(){
        //left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= 59){
                this.x -= 2;
            }else if(keyRIGHT.isDown && this.x <= 575){
                this.x += 2;
            }
        }
        //fire button, not the spacebar
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
        }

        //if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        
        //rest on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }
    }
}