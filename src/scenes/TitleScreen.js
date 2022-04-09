import Phaser from "phaser";
import BaseScene from "./BaseScene";
import i18n from "../../i18n";

class TitleScreen extends BaseScene {
  constructor() {
    super({ key: "titleScreen" });
  }
  preload() {
    this.objects = {};
    this.load.image("bg", "../../assets/bg_instructions.png");
  }

  create() {
    this.game.state.start('Preloader');
    console.log("in create titleScreen1");

    console.log("In titleScreen");

    this.add.image(400, 300, "bg");
  }
}

export default TitleScreen;
