//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add an object to the existing scene
        scene.add.existing(this);

        this.isFiring = false;  //track rocket's firing status
    
        //adds rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){

        //fire button, not the spacebar
       if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            //plays the sfx
            this.sfxRocket.play();
        }

        //if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        
        //reset on miss
        if(this.y <= 108){
            this.reset();
        }
    }
    //resets rocket to ground level
    reset(){
        this.isFiring = false;
        this.y = 431;
    }
}