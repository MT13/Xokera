import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import heart from "../../assets/lives.png";
import { styleText } from "../utils";

import {TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT} from '../constants/dimensions';

import { sceneEvents } from "../events/EventCenter";

export class UIScene extends BaseScene {
  constructor() {
    super({ key: "uiScene" });
  }

  preload() {
    this.load.image("heart", heart);
  }

  create(data) {
    super.create()
    
    let {playAreaStartX, playAreaStartY, questionText} = data;

    this.textBox = this.add.rectangle(
      TITLE_AREA_WIDTH / 2,
      100,
      TITLE_AREA_WIDTH * 3/4,
      80,
      "0xFFFFFF"
    );

    let styleT = styleText;

    styleT.color = "0x000000";

    // Style dis
    this.question = this.add.text(0, 0, questionText, styleT);
    Phaser.Display.Align.In.Center(this.question, this.textBox);

    
    let playArea = this.add.rectangle(playAreaStartX, playAreaStartY, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT, "0x000000").setOrigin(0);
    playArea.setStrokeStyle(-1, "0xFFFFFF");


    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    })

    let healthY = (TITLE_AREA_HEIGHT + PLAY_AREA_HEIGHT)/2
    let healthX = (TITLE_AREA_WIDTH + PLAY_AREA_WIDTH)/2

    this.questionNum = this.add.text(playAreaStartX, healthY + 10, "1/10").setOrigin(0)

    this.hearts.createMultiple({
      key: "heart",
      setOrigin: {x: 1, y: 0},
      setXY: {
        x: healthX,
        y: healthY + 10,
        stepX: -40,
      },
      setScale: {
        x: 0.007,
        y: 0.007,
      },
      quantity: 3,
    })

    sceneEvents.on('question-changed', this.handleQuestionUpdate, this);
    sceneEvents.on('health-changed', this.handlePlayerHealth, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off('health-changed', this.handlePlayerHealth)
      sceneEvents.off('question-changed', this.handleQuestionUpdate)
    })
    
  }

  handleQuestionUpdate(data) {
    this.question.setText(data.text)
    this.questionNum.setText(`${data.idx + 1}/10`)
  }

  handlePlayerHealth(health) {
    this.hearts.children.each((heart, i) => {
      if (i >= health) {
        heart.setActive(false).setVisible(false)
      } else {
        heart.setActive(true).setVisible(true)
      }
    })
  }
}
