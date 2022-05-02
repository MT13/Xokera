import Phaser from "phaser";
import BaseScene from "./BaseScene";
import bg from "../../assets/bg_board.png";
import heart from "../../assets/lives.png";
import { styleText } from "../utils";

import {TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT} from '../constants/dimensions';

import { sceneEvents } from "../events/EventCenter";

export default class B extends BaseScene {
  constructor() {
    super({ key: "uiScene" });
  }

  preload() {

  }

  create(data) {
    super.create()

    this.bg = this.add.image(TITLE_AREA_WIDTH / 2, TITLE_AREA_HEIGHT / 2, "bg");
    this.bg.setDisplaySize(TITLE_AREA_WIDTH, TITLE_AREA_HEIGHT);

    let {playAreaStartX, playAreaStartY, questionText} = data;
    
    let playArea = this.add.rectangle(playAreaStartX, playAreaStartY, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT, "0x000000").setOrigin(0);
    playArea.setStrokeStyle(-1, "0xFFFFFF");


    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    })

    let healthY = (TITLE_AREA_HEIGHT + PLAY_AREA_HEIGHT)/2
    let healthX = (TITLE_AREA_WIDTH + PLAY_AREA_WIDTH)/2
    
  }

}
