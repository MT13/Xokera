import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import i18n from "../../i18n";
import bgBoard from "../../assets/bg_instructions.png";
import bgStage from "../../assets/bg_first_xokera.png";
import headline from "../../assets/headline.png";
import RedButton from "../objects/redButton";
import { styleText } from "../utils";
import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/dimensions";

export class InstructionsBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "instructionsBackgroundScene" });
  }

  preload() {}

  create() {
    this.bg = this.add.image(0, 0, "bgBoard").setOrigin(0, 0);
    // this.scene.sendToBack();
    this.updateCamera();
  }
}

class InstructionsScene extends BaseScene {
  constructor() {
    super({ key: "instructionsScene" });
  }

  preload() {
    this.load.image("bgBoard", bgBoard);
    this.load.image("headline", headline);
    this.load.image("bgStageBoard", bgStage);
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    // this.backgroundScene.updateCamera();
  }

  create() {
    super.create();

    let startX = TITLE_AREA_WIDTH / 2;
    let startY = TITLE_AREA_HEIGHT / 3;

    this.backgroundScene = this.scene.add(
      "instructionsBackgroundScene",
      InstructionsBackgroundScene,
      true
    );
    this.scene.bringToTop();
    let styleT;
    if (i18n.language === "ka") {
      styleT = styleText;
      styleT.fontSize = "25px";
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2 + 50,
        useAdvancedWrap: true,
      };
    }

    this.headline = this.add.image(startX, startY, "headline");
    this.headline.scale = 0.2;
    let offset = startY + 150;
    this.instr = this.add.text(startX, offset, i18n.t("rules"), styleT);
    this.instr.setOrigin(0.5);
    offset += 50 + this.instr.height;

    let button = new RedButton(
      this,
      TITLE_AREA_WIDTH / 2,
      offset,
      i18n.t("next")
    );

    this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.remove("instructionsBackgroundScene");
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

export default InstructionsScene;
