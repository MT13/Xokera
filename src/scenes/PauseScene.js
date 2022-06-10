import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import i18n from "../../i18n";
import GreenButton from "../objects/greenButton";
import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/title";
import { sceneEvents } from "../events/EventCenter";

export class PauseScene extends BaseScene {
  constructor() {
    super({ key: "pauseScene" });
  }

  preload() {}

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    this.backgroundScene.updateCamera();
  }

  create(data) {
    super.create();

    this.events.on(Phaser.Scenes.Events.WAKE, () => {
      this.scene.bringToTop();
    });
    this.backgroundScene = this.scene.get("titleBackgroundScene");
    this.backgroundScene.scene.restart();
    this.scene.bringToTop();

    sceneEvents.on("rotate", this.onRotate, this);
    sceneEvents.on("unRotate", this.unRotate, this);
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("rotate", this.onRotate);
      sceneEvents.off("unRotate", this.unRotate);
    });

    let gbutton = new GreenButton(
      this,
      TITLE_AREA_WIDTH / 2,
      TITLE_AREA_HEIGHT / 2,
      i18n.t("continue")
    );
    this.add.existing(gbutton);

    gbutton.on("pointerdown", () => {
      this.scale.startFullscreen();
      sceneEvents.emit("wake-up");

      this.backgroundScene.scene.sleep();
      this.scene.setVisible(true, "cornerButtonsScene");
      this.scene.bringToTop("cornerButtonsScene");

      this.scene.sleep();
    });
  }

  onRotate() {
    this.backgroundScene.scene.setVisible(false);
    this.scene.setVisible(false);
    this.scene.setVisible(true, "rotateScene");
  }

  unRotate() {
    this.backgroundScene.scene.setVisible(true);
    this.scene.setVisible(true);
    this.scene.setVisible(false, "rotateScene");
  }
}
