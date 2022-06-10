import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { styleText } from "../utils";

import { TITLE_AREA_WIDTH } from "../constants/dimensions";
import { sceneEvents } from "../events/EventCenter";
import { TITLE_AREA_HEIGHT } from "../constants/title";
import i18n from "../../i18n";

export class CornerButtonsScene extends BaseScene {
  constructor() {
    super({ key: "cornerButtonsScene" });
  }

  preload() {}

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

    styleT = { ...styleText };
    styleT.wordWrap = {
      width: TITLE_AREA_WIDTH / 2,
      useAdvancedWrap: true,
    };
    styleT.fontSize = "25px";

    this.aboutRec = this.add
      .rectangle(
        this.rulesX,
        2 * this.rulesY,
        TITLE_AREA_WIDTH / 2 + 100,
        TITLE_AREA_HEIGHT / 2 + 100,
        "0x000000"
      )
      .setOrigin(1, 0);
    this.aboutRec.setStrokeStyle(-1, "0xFFFFFF");
    this.aboutRec.setVisible(false);

    this.instr = this.add
      .text(
        this.rulesX - 50,
        2 * this.rulesY + TITLE_AREA_HEIGHT / 4,
        i18n.t("about"),
        styleT
      )
      .setOrigin(1, 0.5);
    this.instr.setVisible(false);

    this.currentOffset = this.instr.y + this.instr.height / 2 + 50;
    this.foodOffset = this.instr.x - this.instr.width;
    this.yesFruit = this.add
      .image(this.foodOffset, this.currentOffset, "yes_food")
      .setOrigin(0, 0.5);
    this.foodOffset += this.yesFruit.width;

    this.yesText = this.add
      .text(this.foodOffset, this.currentOffset, i18n.t("yes"), styleT)
      .setOrigin(0, 0.5);
    this.foodOffset += this.yesText.width + 25;
    this.noFruit = this.add
      .image(this.foodOffset, this.currentOffset, "no_food")
      .setOrigin(0, 0.5);
    this.foodOffset += this.noFruit.width;

    this.noText = this.add
      .text(this.foodOffset, this.currentOffset, i18n.t("no"), styleT)
      .setOrigin(0, 0.5);

    this.foodOffset += this.noText.width + 25;
    this.arrows = this.add
      .image(this.foodOffset, this.currentOffset, "arrowsBig")
      .setOrigin(0, 0.5);
    this.foodOffset += this.arrows.width;
    this.arrowsText = this.add
      .text(this.foodOffset, this.currentOffset, i18n.t("movement"), styleT)
      .setOrigin(0, 0.5);

    this.yesFruit.setVisible(false);
    this.noFruit.setVisible(false);
    this.yesText.setVisible(false);
    this.noText.setVisible(false);
    this.arrows.setVisible(false);
    this.arrowsText.setVisible(false);

    rules.setInteractive();
    rules.on("pointerdown", () => {
      if (!this.aboutClicked) {
        this.instr.setVisible(true);
        this.aboutRec.setVisible(true);
        this.yesFruit.setVisible(true);
        this.noFruit.setVisible(true);
        this.yesText.setVisible(true);
        this.noText.setVisible(true);
        this.arrows.setVisible(true);
        this.arrowsText.setVisible(true);
      } else {
        this.instr.setVisible(false);
        this.aboutRec.setVisible(false);
        this.yesFruit.setVisible(false);
        this.noFruit.setVisible(false);
        this.yesText.setVisible(false);
        this.noText.setVisible(false);
        this.arrows.setVisible(false);
        this.arrowsText.setVisible(false);
      }
      this.aboutClicked = !this.aboutClicked;
    });
  }
}
