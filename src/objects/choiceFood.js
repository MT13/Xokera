import Phaser from "phaser";


export default class ChoiceFood extends Phaser.GameObjects.Image{
 
    constructor(scene, x, y, origX, origY, cellWidth, cellHeight, texture_key) {
        super(scene, x * cellWidth, y * cellHeight, texture_key).setOrigin(0);

        this.setPosition(origX + x*cellWidth, origY + y*cellHeight)
        this.displayWidth = cellWidth
        this.displayHeight = cellHeight
        this.setOrigin(0)
        scene.children.add(this)
    }
  
  }