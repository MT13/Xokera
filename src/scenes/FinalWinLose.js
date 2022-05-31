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
import { sceneEvents } from "../events/EventCenter";

export class FinalBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "finalBackgroundScene" });
  }

  preload() {}

  create(data) {
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

    // STOP GAME MUSIC IF RUNNING
    this.game.sound.stopAll();

    if (data.won) {
      this.music = this.sound.add("winMusic");
    } else {
      this.music = this.sound.add("loseMusic");
    }
    

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

    this.backgroundScene = this.scene.add(
      "finalBackgroundScene",
      FinalBackgroundScene,
      true,
      { bgImage: data.bgImage }
    );

    this.scene.bringToTop();

    this.scene.bringToTop("cornerButtonsScene");
    sceneEvents.on("pause-up", this.onPause, this);
    sceneEvents.on("wake-up", this.onWake, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("pause-up", this.onPause);
      sceneEvents.off("wake-up", this.onWake);
      this.music.stop();
    });

    let styleH, styleT;

    let offsetY = TITLE_AREA_HEIGHT / 3;
    let offsetX = 50;
    let currentOffset = offsetY;

    // if (i18n.language === "ka") {
      styleH = { ...styleHeader };
      styleT = { ...styleText };
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2 - 100,
        useAdvancedWrap: true,
      };
    // }

    styleH.color = data.color;
    styleH.fontSize = "50px";
    this.title = this.add.text(offsetX, offsetY, data.title, styleH);

    currentOffset += this.title.height + 50;
    this.text = this.add.text(offsetX, currentOffset, data.text, styleT);
    currentOffset += this.text.height + 100;
    let button = new RedButton(
      this,
      BUTTON_WIDTH / 2 + offsetX,
      currentOffset,
      i18n.t("try_again")
    );

    this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.remove("finalBackgroundScene");
      this.scene.remove("gameBackgroundScene");
      this.scene.remove("uiScene");
      this.scale.removeListener("resize", this.resize);
      // this.scene.remove("gameScene");
      this.music.stop();

      let gameMusic = this.sound.add("gameMusic");

      let musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      }

      gameMusic.play(musicConfig)
      
      this.scene.start("stageScene", {
        bgImage: "bgStageBoard1",
        title: i18n.t("first_xokera"),
        text: i18n.t("first_instr"),
        color: "#6F56D8",
        stage: -1,
      });
    });
  }

  onPause() {
    this.backgroundScene.scene.sleep();
    this.scene.sleep();
  }

  onWake() {
    this.scene.wake();
    this.backgroundScene.scene.wake();
  }
}
