import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import i18n from "../../i18n";
import bgStage1 from "../../assets/bg_first_xokera.png";
import bgStage2 from "../../assets/bg second xokera.png";
import bgStage3 from "../../assets/bg third xokera.png";
import RedButton from "../objects/redButton";
import { styleText } from "../utils";
import {
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
  CELL_HEIGHT,
  CELL_WIDTH,
} from "../constants/dimensions";
import { sceneEvents } from "../events/EventCenter";
import head1 from "../../assets/1st head.svg";
import body1 from "../../assets/1st body.svg";
import backgroundMusic from "../../assets/snek_background.wav";

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
    this.load.image("bgStageBoard1", bgStage1);
    this.load.image("bgStageBoard2", bgStage2);
    this.load.image("bgStageBoard3", bgStage3);
    this.load.svg("head1", head1);

    this.load.svg("body1", body1);
    this.load.audio("gameMusic", backgroundMusic);
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

    this.music = this.sound.add("gameMusic");

    let musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.music.play(musicConfig)

    this.scene.bringToTop();
    let styleT;
    if (i18n.language === "ka") {
      styleT = { ...styleText };
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

    sceneEvents.on("pause-up", this.onPause, this);
    sceneEvents.on("wake-up", this.onWake, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("pause-up", this.onPause);
      sceneEvents.off("wake-up", this.onWake);
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
        bgImage: "bgStageBoard1",
        title: i18n.t("first_xokera"),
        text: i18n.t("first_instr"),
        color: "#6F56D8",
        stage: 0,
      });
    });
  }

  onPause() {
    this.backgroundScene.scene.sleep();
    this.scene.sleep();
  }

  onWake() {
    this.backgroundScene.scene.wake();
    this.scene.wake();
    this.scene.bringToTop();
  }
}

export default InstructionsScene;
