import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import i18n from "../../i18n";
import RedButton from "../objects/redButton";
import { styleText, styleHeader } from "../utils";
import {
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
  CELL_HEIGHT,
  CELL_WIDTH,
} from "../constants/dimensions";

import bgBoard from "../../assets/bg_board.png";
import yesFood from "../../assets/yes fruit.svg";
import noFood from "../../assets/no fruit.svg";
import { sceneEvents } from "../events/EventCenter";

// export class StageBackgroundScene extends BaseBackgroundScene {
//   constructor() {
//     super({ key: "stageBackgroundScene" });
//   }

//   preload() {}

//   create() {
//     // this.scene.sendToBack();
//     this.updateCamera();
//   }
// }

class StageScene extends BaseScene {
  constructor() {
    super({ key: "stageScene" });
  }

  init(data) {
    this.bgImage = data.bgImage;
  }

  preload() {
    this.load.svg("yes_food", yesFood, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.svg("no_food", noFood, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.image("bgBoard", bgBoard);
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    // this.backgroundScene.updateCamera();
  }

  create(data) {
    super.create();

    let startX = TITLE_AREA_WIDTH / 2;
    let startY = TITLE_AREA_HEIGHT / 3;

    this.bg = this.add.image(0, 0, data.bgImage).setOrigin(0, 0);
    this.bg.setDisplaySize(TITLE_AREA_WIDTH, TITLE_AREA_HEIGHT);

    this.scene.bringToTop();
    this.scene.bringToTop("cornerButtonsScene");

    let styleT, styleH;
    if (i18n.language === "ka") {
      styleT = styleText;
      styleH = styleHeader;
      styleT.fontSize = "25px";
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2 + 50,
        useAdvancedWrap: true,
      };
      styleH.color = data.color;
      styleH.fontSize = "40px";
    }

    this.title = this.add.text(startX, startY, data.title, styleH);
    this.title.setOrigin(0.5);
    let offset = startY + 100;
    this.instr = this.add.text(startX, offset, data.text, styleT);
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
      this.scene.remove("stageBackgroundScene");
      this.scale.removeListener("resize", this.resize);
      if (data.stage === 0) {
        this.scene.start("gameScene");
      }else {
        this.scene.wake("gameScene");
        this.scene.wake("gameBackgroundScene");
        this.scene.wake("uiScene");
      }

    });

    sceneEvents.on("pause", this.onPause, this);
    sceneEvents.on("wake", this.onWake, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("pause", this.onPause);
      sceneEvents.off("wake", this.onWake);
    });
  }

  onPause() {
    this.scene.launch("pauseScene");
    this.scene.sleep();
  }

  onWake() {
    this.scene.wake();
  }
}

export default StageScene;
