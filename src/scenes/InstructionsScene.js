import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import i18n from "../../i18n";
import bg from "../../assets/bg_instructions.png";
import headline from "../../assets/headline.png";
import RedButton from "../objects/redButton";
import { styleText } from "../utils";

class InstructionsScene extends BaseScene {
  constructor() {
    super({ key: "instructionsScene" });
  }

  preload() {
    this.objects = {};
    this.load.image("bg", bg);
  }

  create() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    this.bg = this.add.image(windowWidth / 2, windowHeight / 2, "bg");
    this.bg.setDisplaySize(windowWidth, windowHeight);

    this.headline = this.add.image(headline, 0, 0);
    this.instr = new Text(0, 1, i18n.t("rules"), styleText);

    let button = new RedButton(this, 0, 2, i18n.t("start"));

    // this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.start("gameScene");
    });
  }
}

export default InstructionsScene;
