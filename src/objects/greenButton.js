import Phaser from "phaser";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";

export default class RedButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene, x, y);

    this.rectUp = new RoundRectangle(scene, x, y, 200, 20, 25, "0x4BC671");
    this.rectOver = new RoundRectangle(scene, x, y, 200, 20, 25, "0x5093FF");

    scene.add.existing(this.rectUp);
    scene.add.existing(this.rectOver);

    this.text = scene.add
      .text(x, y, text, {
        fontFamily: "Roboto",
        padding: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5,
        },
        fontSize: "3vh",
      })
      .setOrigin(0.5);

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
