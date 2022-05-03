import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import bg from "../../assets/bg_board.png";
import firstXokeraWin from "../../assets/first xokera win.png";
import { styleText } from "../utils";

import {STAGE_END_INFO_HEIGHT, STAGE_END_INFO_WIDTH, TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH} from '../constants/dimensions';

import { sceneEvents } from "../events/EventCenter";

// export class B extends BaseScene {
//   constructor() {
//     super({ key: "uiScene" });
//   }

//   preload() {

//   }

//   create(data) {
//     super.create()

  
//     let {playAreaStartX, playAreaStartY, questionText} = data;
    
//     let playArea = this.add.rectangle(playAreaStartX, playAreaStartY, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT, "0x000000").setOrigin(0);
//     playArea.setStrokeStyle(-1, "0xFFFFFF");
    
//   }

// }


export class WinStage extends BaseScene {

  preload() {
    this.load.image("firstXokeraWin", firstXokeraWin);
  }

  create() {
    super.create()

    let infoAreaStartY = this.origY = (TITLE_AREA_HEIGHT - STAGE_END_INFO_HEIGHT)/2
    let infoAreaStartX = this.origX = (TITLE_AREA_WIDTH - STAGE_END_INFO_WIDTH)/2
    
    let infoArea = this.add.rectangle(infoAreaStartX, infoAreaStartY,
       STAGE_END_INFO_WIDTH, STAGE_END_INFO_HEIGHT, "0x000000").setOrigin(0);
    infoArea.setStrokeStyle(-1, "0xFFFFFF");
  }
}


// export class LoseStage extends B {
//   create(data) {
//     super.create()
//     let {playAreaStartX, playAreaStartY, questionText} = data;
    
//     let playArea = this.add.rectangle(playAreaStartX, playAreaStartY, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT, "0x000000").setOrigin(0);
//     playArea.setStrokeStyle(-1, "0xFFFFFF");
    
//   }
// }
