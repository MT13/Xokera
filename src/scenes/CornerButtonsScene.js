import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { styleText } from "../utils";
import fullscreen from "../../assets/full screen.svg";
import rules from "../../assets/rules.svg";

import { TITLE_AREA_WIDTH } from "../constants/dimensions";
import { sceneEvents } from "../events/EventCenter";

export class CornerButtonsScene extends BaseScene {
  constructor() {
    super({ key: "cornerButtonsScene" });
  }

  preload() {
    this.load.svg("fullscreen", fullscreen, { width: 50, height: 50 });
    this.load.svg("rules", rules, { width: 50, height: 50 });
  }

  create(data) {
    super.create();sceneEvents.on

    let fullscreen = this.add.image(TITLE_AREA_WIDTH - 50, 50, "fullscreen");
    let rules = this.add.image(TITLE_AREA_WIDTH - 125, 50, "rules");

    fullscreen.setInteractive();
    fullscreen.on("pointerdown", () => {

      this.scale.stopFullscreen();
      sceneEvents.emit("pause");
      this.scene.sendToBack();
    });
  }
}
