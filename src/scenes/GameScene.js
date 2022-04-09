import Phaser from "phaser";
import BaseScene from "./BaseScene";

class GameScene extends BaseScene {
  constructor() {
    super({ key: "gameScene" });
  }

  init() {
    var snake;
    var cursors;

    //  Direction consts
    var UP = 0;
    var DOWN = 1;
    var LEFT = 2;
    var RIGHT = 3;
  }

  preload() {
    this.load.image("food", "../../assets/food.png");
    this.load.image("body", "../../assets/body.png");
  }

  create() {
    this.objects.camera.setBackgroundColor("#776AD0");
  }

  update() {}

  end() {}
}

export default GameScene;
