import Phaser from "phaser";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import styleHeader from "../utils";

export default class RedButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene, x, y);

    this.rectUp = new RoundRectangle(scene, x, y, 200, 20, 25, "0xE46E05");
    this.rectOver = new RoundRectangle(scene, x, y, 200, 20, 25, "0x9ADA5A");
    this.text = scene.add.text(x, y, text, styleHeader).setOrigin(0.5);
    console.log(text);

    scene.add.existing(this.rectUp);
    scene.add.existing(this.rectOver);

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
