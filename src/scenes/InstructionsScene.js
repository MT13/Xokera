import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import i18n from "../../i18n";
import bgStage from "../../assets/bg_first_xokera.png";
import RedButton from "../objects/redButton";
import { styleText } from "../utils";
import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/dimensions";
import { sceneEvents } from "../events/EventCenter";

export class InstructionsBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "instructionsBackgroundScene" });
  }

  preload() {}

  create() {
    this.bg = this.add.image(0, 0, "bgInstr").setOrigin(0, 0);
    // this.scene.sendToBack();
    this.updateCamera();
  }
}

class InstructionsScene extends BaseScene {
  constructor() {
    super({ key: "instructionsScene" });
  }

  preload() {
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
    // this.scene.add("cornerButtonsScene", CornerButtonsScene, true, {
    //   sceneKey: this.scene.key,
    //   bgKey: this.backgroundScene.scene.key,
    // });
    this.scene.setVisible(true, "cornerButtonsScene");
    this.scene.bringToTop("cornerButtonsScene");

    sceneEvents.on("pause", this.onPause, this);
    sceneEvents.on("wake", this.onWake, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("pause", this.onPause);
      sceneEvents.off("wake", this.onWake);
    });

    this.headline = this.add.image(startX, startY, "headline");
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
        bgImage: "bgStageBoard",
        title: i18n.t("first_xokera"),
        text: i18n.t("first_instr"),
        color: "#6F56D8",
      });
    });
  }

  onPause() {
    this.scene.launch("pauseScene");
    this.backgroundScene.scene.sleep();
    this.scene.sleep();
  }

  onWake() {
    this.scene.wake();
    this.backgroundScene.scene.wake();
  }
}

export default InstructionsScene;
