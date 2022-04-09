import Phaser from "phaser";
import { SIZE } from "../constants/game.js";


export default class ChoiceFood extends Phaser.GameObjects.Image{
 
    constructor(scene, x, y, texture_key) {
        super(scene, x * SIZE, y * SIZE, texture_key).setOrigin(0);

        this.setPosition(x*SIZE, y*SIZE)
        this.displayWidth = SIZE
        this.displayHeight = SIZE
        this.setOrigin(0)
        scene.children.add(this)
    }
  
  }