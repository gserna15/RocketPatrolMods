class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    create(){
        console.log(this);
        //displays menu text
        this.add.text(20,20,"Rocket Patrol Menu");

        //launches the next scene
        this.scene.start("playScene");
    }
}