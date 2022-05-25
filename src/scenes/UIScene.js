import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import heart from "../../assets/heart.svg";
import { styleText } from "../utils";
import i18n from "../../i18n";

import {
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
  PLAY_AREA_WIDTH,
  PLAY_AREA_HEIGHT,
  GRID_HEIGHT,
  GRID_WIDTH,
} from "../constants/dimensions";

import { sceneEvents } from "../events/EventCenter";

export class UIScene extends BaseScene {
  constructor() {
    super({ key: "uiScene" });
  }

  init() {
    this.cellWidth = PLAY_AREA_WIDTH / GRID_WIDTH;
    this.cellHeight = PLAY_AREA_HEIGHT / GRID_HEIGHT;
  }
  preload() {
    this.load.svg("heart", heart, {
      width: this.cellWidth,
      height: this.cellHeight,
    });
  }

  create(data) {
    super.create();

    let { playAreaStartX, playAreaStartY, questionText } = data;

    this.textBox = this.add
      .rectangle(
        TITLE_AREA_WIDTH / 2,
        100,
        (TITLE_AREA_WIDTH * 3) / 4,
        100,
        "0xFFFFFF"
      )
      .setOrigin(0.5);

    let styleT = styleText;
    styleT.align = "center";
    styleT.color = "0x000000";

    // Style dis
    this.question = this.add
      .text(TITLE_AREA_WIDTH / 2, 100, questionText, styleT)
      .setOrigin(0.5);

    let playArea = this.add
      .rectangle(
        playAreaStartX,
        playAreaStartY,
        PLAY_AREA_WIDTH,
        PLAY_AREA_HEIGHT,
        "0x000000"
      )
      .setOrigin(0);
    playArea.setStrokeStyle(-1, "0xFFFFFF");

    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    let healthY = (TITLE_AREA_HEIGHT + PLAY_AREA_HEIGHT) / 2;
    let healthX = (TITLE_AREA_WIDTH + PLAY_AREA_WIDTH) / 2;

    this.questionNum = this.add
      .text(playAreaStartX, healthY + 10, "1/10")
      .setOrigin(0);

    this.hearts.createMultiple({
      key: "heart",
      setOrigin: { x: 1, y: 0 },
      setXY: {
        x: healthX,
        y: healthY + 10,
        stepX: -40,
      },
      quantity: 5,
    });

    sceneEvents.on("question-changed", this.handleQuestionUpdate, this);
    sceneEvents.on("health-changed", this.handlePlayerHealth, this);

    this.events.on(Phaser.Scenes.Events.DESTROY, () => {
      sceneEvents.off("health-changed", this.handlePlayerHealth);
      sceneEvents.off("question-changed", this.handleQuestionUpdate);
      console.log("in destroy if uiscene");
    });

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      console.log("in shutdown if uiscene");
      sceneEvents.off("pause");
      sceneEvents.off("wake");
    });
  }

  handleQuestionUpdate(data) {
    this.question.setText(data.text);
    this.questionNum.setText(`${data.idx + 1}/10`);
  }

  handlePlayerHealth(health) {
    this.hearts.children.each((heart, i) => {
      if (i >= health) {
        heart.setActive(false).setVisible(false);
      } else {
        heart.setActive(true).setVisible(true);
      }
    });
  }
}
