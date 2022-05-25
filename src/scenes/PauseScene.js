import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import i18n from "../../i18n";
import { TitleBackgroundScene } from "./TitleBackgroundScene";
import GreenButton from "../objects/greenButton";
import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/title";
import { sceneEvents } from "../events/EventCenter";

export class PauseScene extends BaseScene {
  constructor() {
    super({ key: "pauseScene" });
  }

  preload() {}

  create(data) {
    super.create();
    this.backgroundScene = this.scene.add(
      "titleBackgroundScene",
      TitleBackgroundScene,
      true
    );

    this.scene.bringToTop();

    let gbutton = new GreenButton(
      this,
      TITLE_AREA_WIDTH / 2,
      TITLE_AREA_HEIGHT / 2,
      i18n.t("continue")
    );
    this.add.existing(gbutton);

    // console.log(data.sceneKey + " " + data.bgKey);
    gbutton.on("pointerdown", () => {
      this.scale.startFullscreen();
      sceneEvents.emit("wake");
      // this.scene.wake(data.sceneKey);
      // this.scene.wake(data.bgKey);
      // this.scene.wake("cornerButtonScene");
      this.backgroundScene.scene.sleep();
      this.scene.bringToTop("cornerButtonsScene");
      this.scene.remove("titleBackgroundScene");
      this.scene.sleep();
    });
  }
}
