import Phaser from "phaser";
import BaseScene from "./BaseScene";
import bg from "../../assets/bg_board.png";
import { questions } from "../questions";
import { styleText } from "../utils";
import GameScene from "./GameScene";

import {TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT} from '../constants/dimensions';

export default class UIScene extends BaseScene {
  constructor() {
    super({ key: "uiScene" });
    console.log("in constr");
  }

  preload() {
    this.load.image("bg", bg);
  }

  create() {
    super.create()

    this.bg = this.add.image(TITLE_AREA_WIDTH / 2, TITLE_AREA_HEIGHT / 2, "bg");
    this.bg.setDisplaySize(TITLE_AREA_WIDTH, TITLE_AREA_HEIGHT);

    console.log("in create");
    this.textBox = this.add.rectangle(
      TITLE_AREA_WIDTH / 2,
      50,
      TITLE_AREA_WIDTH - 400,
      50,
      "0xFFFFFF"
    );

    let styleT = styleText;

    styleT.color = "0x000000";
    let q = questions.history.gutenberg[1].question;
    this.question = this.add.text(0, 0, q, styleT);
    Phaser.Display.Align.In.Center(this.question, this.textBox);


    let playAreaStartY = (TITLE_AREA_HEIGHT - PLAY_AREA_HEIGHT)/2
    let playAreaStartX = (TITLE_AREA_WIDTH - PLAY_AREA_WIDTH)/2

    let playArea = this.add.rectangle(playAreaStartX, playAreaStartY, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT, "0x000000").setOrigin(0);
    playArea.setStrokeStyle(-1, "0xFFFFFF");

    let scene = this.scene.add("gameScene", GameScene, true, 
    { origX: playAreaStartX, origY: playAreaStartY,
       width: PLAY_AREA_WIDTH, height: PLAY_AREA_HEIGHT });
  }
}
