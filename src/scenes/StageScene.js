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

import { sceneEvents } from "../events/EventCenter";
// import yesFood from "../../assets/yes fruit.svg";
// import noFood from "../../assets/no fruit.svg";

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

  preload() {
    // this.load.svg("yes_food_big", yesFood, {
    //   width: CELL_WIDTH,
    //   height: CELL_HEIGHT,
    // });
    // this.load.svg("no_food_big", noFood, {
    //   width: CELL_WIDTH,
    //   height: CELL_HEIGHT,
    // });
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    // this.backgroundScene.updateCamera();
  }

  create(data) {
    super.create();

    console.log("is visible " + this.scene.isVisible("rotateScene"));

    let startX = TITLE_AREA_WIDTH / 2;
    let startY;
    if (data.stage === 1) {
      startY = TITLE_AREA_HEIGHT / 3 - 25;
    } else {
      startY = TITLE_AREA_HEIGHT / 3;
    }

    this.bg = this.add.image(0, 0, data.bgImage).setOrigin(0, 0);
    this.bg.setDisplaySize(TITLE_AREA_WIDTH, TITLE_AREA_HEIGHT);

    this.scene.bringToTop();
    this.scene.bringToTop("cornerButtonsScene");

    let styleT, styleH;
    styleT = { ...styleText };
    styleH = { ...styleHeader };
    styleT.fontSize = "25px";
    styleT.wordWrap = {
      width: TITLE_AREA_WIDTH / 2 + 50,
      useAdvancedWrap: true,
    };
    styleH.color = data.color;
    styleH.fontSize = "40px";

    this.title = this.add.text(startX, startY, data.title, styleH);
    this.title.setOrigin(0.5);
    let offset;
    if (data.stage === 1) {
      offset = startY + 50;
    } else {
      offset = startY + 75;
    }

    this.instr = this.add.text(startX, offset, data.text, styleT);
    this.instr.setOrigin(0.5, 0);
    if (data.stage === 1) {
      offset += 75 + this.instr.height;
    } else {
      offset += 100 + this.instr.height;
    }

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
      if (data.stage === 0 && data.curStage != 0) {
        this.scene.start("gameScene");
      } else if (data.stage === -1) {
        let gameScene = this.scene.get("gameScene");
        gameScene.scene.restart();
        this.scene.stop();
      } else {
        this.scene.wake("gameBackgroundScene");
        this.scene.wake("uiScene");

        this.scene.wake("gameScene");
        this.scene.stop();
      }
    });

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
  }

  onPause() {
    this.scene.sleep();
  }

  onWake() {
    this.scene.wake();
  }

  onRotate() {
    console.log("onRotate");
    this.scene.setVisible(false);
    this.scene.setVisible(true, "rotateScene");
  }

  unRotate() {
    console.log("unrotate");
    this.scene.setVisible(true);
    this.scene.setVisible(false, "rotateScene");
  }
}

export default StageScene;
