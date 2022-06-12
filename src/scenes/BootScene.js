import firstXokeraWin from "../../assets/1st win.svg";
import rotateEn1 from "../../assets/rotateEn1.png";
import rotateGeo1 from "../../assets/rotateGeo1.png";
import rotateEn2 from "../../assets/rotateEn2.png";
import rotateGeo2 from "../../assets/rotateGeo2.png";
import rotateEn4 from "../../assets/rotateEn4.png";
import rotateGeo4 from "../../assets/rotateGeo4.png";
import rotateEn8 from "../../assets/rotateEn8.png";
import rotateGeo8 from "../../assets/rotateGeo8.png";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
  }

  preload() {
    this.load.svg("firstXokeraWin", firstXokeraWin, {
      width: 75,
      height: 75,
    });

    let maxTextureSize = this.game.renderer.getMaxTextureSize();

    if (maxTextureSize === 1024) {
      this.load.image("rotateEn", rotateEn1);
      this.load.image("rotateGeo", rotateGeo1);
    } else if (maxTextureSize === 2048) {
      this.load.image("rotateEn", rotateEn2);
      this.load.image("rotateGeo", rotateGeo2);
    } else if (maxTextureSize === 4096) {
      this.load.image("rotateEn", rotateEn4);
      this.load.image("rotateGeo", rotateGeo4);
    } else {
      this.load.image("rotateEn", rotateEn8);
      this.load.image("rotateGeo", rotateGeo8);
    }
  }

  create() {
    this.scene.launch("rotateScene");

    this.scene.start("preload");
  }
}
