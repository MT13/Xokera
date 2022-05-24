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
    super.create();

    console.log("in create corner");
    let fullscreen = this.add.image(TITLE_AREA_WIDTH - 50, 50, "fullscreen");
    let rules = this.add.image(TITLE_AREA_WIDTH - 125, 50, "rules");

    fullscreen.setInteractive();
    fullscreen.on("pointerdown", () => {
      console.log("clicking: stopFullscreen");

      this.scale.stopFullscreen();
      console.log("clicked: stopFullscreen");
      sceneEvents.emit("pause");
      this.scene.sleep(data.sceneKey);
      // if (data.bgKey != null) {
      //   this.scene.sleep(data.bgKey);
      // }
      // this.scene.sleep();
      // this.scene.launch("pauseScene", data);
    });
  }
}
