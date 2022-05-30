import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { styleText } from "../utils";
import fullscreen from "../../assets/full screen.svg";
import rules from "../../assets/rules.svg";

import { TITLE_AREA_WIDTH } from "../constants/dimensions";
import { sceneEvents } from "../events/EventCenter";
import { TITLE_AREA_HEIGHT } from "../constants/title";
import i18n from "../../i18n";

export class CornerButtonsScene extends BaseScene {
  constructor() {
    super({ key: "cornerButtonsScene" });
  }

  preload() {
    this.load.svg("fullscreen", fullscreen, { width: 50, height: 50 });
    this.load.svg("rules", rules, { width: 50, height: 50 });
  }

  handleFullscreen() {
    this.scene.setVisible(false);

    sceneEvents.emit("pause-up");
    let pauseScene = this.scene.get("pauseScene");
    if (pauseScene.scene.isSleeping()) {
      this.scene.wake("titleBackgroundScene");

      pauseScene.scene.wake();
    } else {
      this.scene.launch("pauseScene");
    }
  }

  create(data) {
    super.create();

    this.aboutClicked = false;

    this.rulesX = TITLE_AREA_WIDTH - 125;
    this.rulesY = 50;
    let fullscreen = this.add.image(TITLE_AREA_WIDTH - 50, 50, "fullscreen");
    let rules = this.add.image(this.rulesX, this.rulesY, "rules");

    fullscreen.setInteractive();
    fullscreen.on("pointerdown", () => {
      this.scale.stopFullscreen();
      this.scene.sendToBack();
    });

    this.scale.on("leavefullscreen", this.handleFullscreen, this);

    let styleT;

    if (i18n.language === "ka") {
      styleT = { ...styleText };
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2,
        useAdvancedWrap: true,
      };
      styleT.fontSize = "25px";
    }

    this.aboutRec = this.add
      .rectangle(
        this.rulesX,
        2 * this.rulesY,
        TITLE_AREA_WIDTH / 2 + 100,
        TITLE_AREA_HEIGHT / 2,
        "0x000000"
      )
      .setOrigin(1, 0);
    this.aboutRec.setStrokeStyle(-1, "0xFFFFFF");
    this.aboutRec.setVisible(false);

    this.instr = this.add
      .text(
        this.rulesX - 50,
        2 * this.rulesY + TITLE_AREA_HEIGHT / 4,
        i18n.t("instruction text"),
        styleT
      )
      .setOrigin(1, 0.5);
    this.instr.setVisible(false);

    rules.setInteractive();
    rules.on("pointerdown", () => {
      if (!this.aboutClicked) {
        this.instr.setVisible(true);
        this.aboutRec.setVisible(true);
      } else {
        this.instr.setVisible(false);
        this.aboutRec.setVisible(false);
      }
      this.aboutClicked = !this.aboutClicked;
    });
  }
}
