import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import i18n from "../../i18n";

import RedButton from "../objects/redButton";
import { styleText } from "../utils";
import {
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
  CELL_HEIGHT,
  CELL_WIDTH,
} from "../constants/dimensions";
import { sceneEvents } from "../events/EventCenter";

export class InstructionsBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "instructionsBackgroundScene" });
  }

  preload() {}

  create() {
    super.create();
    this.bg = this.add.image(0, 0, "bgInstr").setOrigin(0, 0);
    // this.scene.sendToBack();
    this.updateCamera();
  }
}

class InstructionsScene extends BaseScene {
  constructor() {
    super({ key: "instructionsScene" });
  }

  resize(gameSize, baseSize, displaySize) {
    super.resize(gameSize, baseSize, displaySize);
    this.backgroundScene.updateCamera();
  }

  create() {
    super.create();

    let startX = TITLE_AREA_WIDTH / 2;
    let startY = TITLE_AREA_HEIGHT / 4;

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
      delay: 0,
    };

    this.music.play(musicConfig);

    this.scene.bringToTop();
    let styleT;

    styleT = { ...styleText };
    styleT.fontSize = "25px";
    styleT.wordWrap = {
      width: TITLE_AREA_WIDTH / 2 + 50,
      useAdvancedWrap: true,
    };

    // this.scene.add("cornerButtonsScene", CornerButtonsScene, true, {
    //   sceneKey: this.scene.key,
    //   bgKey: this.backgroundScene.scene.key,
    // });
    this.scene.launch("cornerButtonsScene");
    this.scene.setVisible(true, "cornerButtonsScene");
    this.scene.bringToTop("cornerButtonsScene");

    sceneEvents.on("pause-up", this.onPause, this);
    sceneEvents.on("wake-up", this.onWake, this);

    sceneEvents.on("rotate", this.onRotate, this);
    sceneEvents.on("unRotate", this.unRotate, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("pause-up", this.onPause);
      sceneEvents.off("wake-up", this.onWake);
      sceneEvents.off("rotate", this.onRotate);
      sceneEvents.off("unRotate", this.unRotate);
    });

    if (i18n.language === "ka")
      this.headline = this.add.image(startX, startY, "headline");
    else {
      this.headline = this.add.image(startX, startY, "headlineEng");
    }
    let offset = startY + 150;
    this.instr = this.add.text(startX, offset, i18n.t("rules"), styleT);
    this.instr.setOrigin(0.5);
    offset += this.instr.height / 2 + 25;

    this.yesFruit = this.add
      .image(startX - this.instr.width / 2, offset, "yes_food_small")
      .setOrigin(0, 0.5);
    this.foodOffset = this.yesFruit.x + this.yesFruit.width;

    this.yesText = this.add
      .text(this.foodOffset, offset, i18n.t("yes"), styleT)
      .setOrigin(0, 0.5);
    this.foodOffset += this.yesText.width + 15;
    this.noFruit = this.add
      .image(this.foodOffset, offset, "no_food_small")
      .setOrigin(0, 0.5);
    this.foodOffset += this.noFruit.width;

    this.noText = this.add
      .text(this.foodOffset, offset, i18n.t("no"), styleT)
      .setOrigin(0, 0.5);

      this.foodOffset += this.noText.width + 15;
      this.arrows = this.add
        .image(this.foodOffset, offset, "arrows")
        .setOrigin(0, 0.5);
      this.foodOffset += this.arrows.width;
      this.arrowsText = this.add
        .text(this.foodOffset, offset, i18n.t("movement"), styleT)
        .setOrigin(0, 0.5);

    offset += 100;

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

  onRotate() {
    this.backgroundScene.scene.setVisible(false);
    this.scene.setVisible(false);
    

    this.scene.setVisible(true, "rotateScene");
  }

  unRotate() {


    this.backgroundScene.scene.setVisible(true);
    this.scene.setVisible(true);
    this.scene.setVisible(false, "rotateScene");
  }
}

export default InstructionsScene;
