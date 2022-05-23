import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import i18n from "../../i18n";
import { styleHeader, styleText } from "../utils";
import RedButton from "../objects/redButton";
import {
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
  BUTTON_WIDTH,
} from "../constants/dimensions";
import bgFinalWin from "../../assets/bg win.png";

export class FinalBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "finalBackgroundScene" });
  }

  preload() {}

  create(data) {
    console.log("in finalWinLoseBg: " + data);
    console.log("in finalWinLoseBg: " + data.bgImage);

    this.bg = this.add.image(0, 0, data.bgImage).setOrigin(0, 0);
    this.updateCamera();
  }
}

export class FinalWinLose extends BaseScene {
  constructor() {
    super({ key: "finalWinLose" });
  }

  preload() {}

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    this.backgroundScene.updateCamera();
  }

  create(data) {
    super.create();

    // let data = {
    //   bgImage: "bgFinal",
    //   title: i18n.t("victory"),
    //   text: i18n.t("final_win_text"),
    //   color: "#4BC671",
    // };

    console.log("in finalWinLose " + data.bgImage);
    this.backgroundScene = this.scene.add(
      "finalBackgroundScene",
      FinalBackgroundScene,
      true,
      {bgImage: data.bgImage}
    );

    this.scene.bringToTop();

    let styleH, styleT;

    let offsetY = TITLE_AREA_HEIGHT / 3;
    let offsetX = 50;
    let currentOffset = offsetY;

    if (i18n.language === "ka") {
      styleH = styleHeader;
      styleT = styleText;
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2 - 100,
        useAdvancedWrap: true,
      };
    }

    styleH.color = data.color;
    styleH.fontSize = "50px";
    this.title = this.add.text(this.offset, offsetY, data.title, styleH);

    currentOffset += this.title.height + 50;
    this.text = this.add.text(this.offsetX, currentOffset, data.text, styleT);
    currentOffset += this.text.height + 100;
    let button = new RedButton(
      this,
      BUTTON_WIDTH / 2,
      currentOffset,
      i18n.t("try_again")
    );

    this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.remove("finalBackgroundScene");
      this.scale.removeListener("resize", this.resize);
      this.scene.start("stageScene", {
        bgImage: bgStage,
        title: i18n.t("first_xokera"),
        text: i18n.t("first_instr"),
        color: "#6F56D8",
      });
    });
  }
}
