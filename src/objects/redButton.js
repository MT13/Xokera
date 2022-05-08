import Phaser from "phaser";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";

import { BUTTON_HEIGHT,BUTTON_RADIUS,BUTTON_WIDTH } from "../constants/dimensions";

export default class RedButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene, x, y);

    this.rectUp = new RoundRectangle(scene, x, y, BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_RADIUS, "0xE5541C");
    this.rectOver = new RoundRectangle(scene, x, y, BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_RADIUS, "0x5093FF");

    scene.add.existing(this.rectUp);
    scene.add.existing(this.rectOver);

    this.text = scene.add.text(x, y, text, {fontFamily: "Roboto",
    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
    fontSize: "35px",}).setOrigin(0.5);

    this.rectOver.setVisible(false);
    this.setSize(this.rectUp.width, this.rectUp.height);

    this.setInteractive();
    this.on("pointerover", () => {
      this.rectUp.setVisible(false);
      this.rectOver.setVisible(true);
    });

    this.on("pointerout", () => {
      this.rectUp.setVisible(true);
      this.rectOver.setVisible(false);
    });
  }
}
