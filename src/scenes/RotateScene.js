import i18n from "../../i18n";
import { BaseBackgroundScene } from "./BaseScene";

export class RotateScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "rotateScene" });
  }

  preload() {}
  updateCamera() {
    if (this.bgRotate) {
      const width = this.scale.gameSize.width;
      const height = this.scale.gameSize.height;

      const camera = this.cameras.main;

      const scaleX = width / this.bgRotate.width;
      const scaleY = height / this.bgRotate.height;
      camera.setSize(width, height);
      camera.setZoom(Math.max(scaleX, scaleY));
      camera.centerOn(this.bgRotate.width / 2, this.bgRotate.height / 2);
    }
  }

  create() {
    const scaleWidth = this.scale.gameSize.width;
    const scaleHeight = this.scale.gameSize.height;

    this.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
    this.sizer = new Phaser.Structs.Size(
      scaleWidth,
      scaleHeight,
      Phaser.Structs.Size.HEIGHT_CONTROLS_WIDTH,
      this.parent
    );

    this.parent.setSize(scaleWidth, scaleHeight);
    this.sizer.setSize(scaleWidth, scaleHeight);

    if (i18n.language === "en")
      this.bgRotate = this.add.image(0, 0, "rotateEn").setOrigin(0, 0);
    else this.bgRotate = this.add.image(0, 0, "rotateGeo").setOrigin(0, 0);

    this.updateCamera();
  }
}
