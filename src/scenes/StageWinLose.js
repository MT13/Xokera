import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import bgBoard from "../../assets/bg_board.png";
import RedButton from "../objects/redButton";
import GreenButton from "../objects/greenButton";
import bgFinalLose from "../../assets/bg lose.png";

import { styleText, styleHeader } from "../utils";

import {
  STAGE_END_INFO_HEIGHT,
  STAGE_END_INFO_WIDTH,
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
  BUTTON_WIDTH,
} from "../constants/dimensions";

import { sceneEvents } from "../events/EventCenter";
import i18n from "../../i18n";

export class StageBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "stageBackgroundScene" });
  }

  preload() {}

  create() {
    this.bg = this.add.image(0, 0, "bgBoard").setOrigin(0, 0).setAlpha(0.5);
    // this.scene.sendToBack();
    this.updateCamera();
  }
}
export class StageWinLoseScene extends BaseScene {
  constructor() {
    super({ key: "stageWinLoseScene" });
  }

  preload() {
    this.load.image("bgFinalLose", bgFinalLose);
  }

  create(data) {
    super.create();

    let infoAreaStartY = (this.origY =
      (TITLE_AREA_HEIGHT - STAGE_END_INFO_HEIGHT) / 2);
    let infoAreaStartX = (this.origX =
      (TITLE_AREA_WIDTH - STAGE_END_INFO_WIDTH) / 2);

    this.backgroundScene = this.scene.add(
      "stageBackgroundScene",
      StageBackgroundScene,
      true
    );

    this.scene.bringToTop();
    let styleT, styleH;
    if (i18n.language === "ka") {
      styleT = styleText;
      styleH = styleHeader;
      styleT.fontSize = "25px";
      styleH.fontSize = "40px";
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2 + 50,
        useAdvancedWrap: true,
      };
      styleT.color = "#FFFFFF";
    }

    styleH.color = data.color;

    let infoArea = this.add
      .rectangle(
        infoAreaStartX,
        infoAreaStartY,
        STAGE_END_INFO_WIDTH,
        STAGE_END_INFO_HEIGHT,
        "0x000000"
      )
      .setOrigin(0);
    infoArea.setStrokeStyle(-2, "0xFFFFFF");

    let offset = infoAreaStartY + 100;

    let xokeraHead = this.add
      .image(TITLE_AREA_WIDTH / 2, offset, data.xokeraHead)
      .setOrigin(0.5);
    offset += 100;

    let title = this.add
      .text(TITLE_AREA_WIDTH / 2, offset, data.title, styleH)
      .setOrigin(0.5);
    offset += title.height + 50;
    let text = this.add
      .text(TITLE_AREA_WIDTH / 2, offset, data.text, styleT)
      .setOrigin(0.5);
    offset += text.height + 50;

    let padding = 25;

    let gbutton = new GreenButton(
      this,
      TITLE_AREA_WIDTH / 2 - BUTTON_WIDTH / 2 - padding,
      offset,
      i18n.t("continue")
    );

    let rbutton = new RedButton(
      this,
      TITLE_AREA_WIDTH / 2 + padding + BUTTON_WIDTH / 2,
      offset,
      i18n.t("give_up")
    );

    this.add.existing(gbutton);
    this.add.existing(rbutton);
    gbutton.setInteractive();
    gbutton.on("pointerdown", () => {
      this.scene.remove("stageBackgroundScene");
      this.scale.removeListener("resize", this.resize);
      this.scene.start("stageScene", {
        bgImage: "bgStageBoard",
        title: i18n.t("first_xokera"),
        text: i18n.t("first_instr"),
        color: "#6F56D8",
      });
    });
    rbutton.setInteractive();
    rbutton.on("pointerdown", () => {
      this.scene.remove("stageBackgroundScene");
      this.scale.removeListener("resize", this.resize);
      this.scene.start("finalWinLose", {
        bgImage: "bgFinalLose",
        title: i18n.t("you_lost"),
        text: i18n.t("give_up_text"),
        color: "#E5541C",
      });
    });
  }
}
