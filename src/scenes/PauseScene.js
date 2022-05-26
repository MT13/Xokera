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

    console.log("in puase create");
    // this.backgroundScene = this.scene.add(
    //   "titleBackgroundScene",
    //   TitleBackgroundScene,
    //   true
    // );

    this.events.on(Phaser.Scenes.Events.WAKE, () => {
      this.scene.bringToTop();
    });
    this.backgroundScene = this.scene.get("titleBackgroundScene");
    this.backgroundScene.scene.restart();
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
      sceneEvents.emit("wake-up");
      // this.scene.wake(data.sceneKey);
      // this.scene.wake(data.bgKey);
      // this.scene.wake("cornerButtonScene");
      this.backgroundScene.scene.sleep();
      let cornerButtonScene = this.scene.get("cornerButtonsScene");
      cornerButtonScene.scene.setVisible(true);
      // this.scene.remove("titleBackgroundScene");
      this.scene.sleep();
    });
  }
}
