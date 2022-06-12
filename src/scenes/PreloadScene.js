import yesFood from "../../assets/yes fruit.svg";
import noFood from "../../assets/no fruit.svg";
import headline from "../../assets/headline.svg";
import headlineEng from "../../assets/cyber snake.svg";

import bg1 from "../../assets/bg_title_1.png";
import bg2 from "../../assets/bg_title_2.png";
import bg4 from "../../assets/bg_title_4.png";
import bg8 from "../../assets/bg_title_8.png";

import bgStage1_1 from "../../assets/bg_first_xokera_1.png";
import bgStage1_2 from "../../assets/bg_first_xokera_2.png";
import bgStage1_4 from "../../assets/bg_first_xokera_4.png";
import bgStage1_8 from "../../assets/bg_first_xokera_8.png";

import bgStage2_1 from "../../assets/bg_second_xokera_1.png";
import bgStage2_2 from "../../assets/bg_second_xokera_2.png";
import bgStage2_4 from "../../assets/bg_second_xokera_4.png";
import bgStage2_8 from "../../assets/bg_second_xokera_8.png";

import bgStage3_1 from "../../assets/bg_third_xokera_1.png";
import bgStage3_2 from "../../assets/bg_third_xokera_2.png";
import bgStage3_4 from "../../assets/bg_third_xokera_4.png";
import bgStage3_8 from "../../assets/bg_third_xokera_8.png";

import bgBoard1 from "../../assets/bg_board_1.png";
import bgBoard2 from "../../assets/bg_board_2.png";
import bgBoard4 from "../../assets/bg_board_4.png";
import bgBoard8 from "../../assets/bg_board_8.png";
import bgInstr1 from "../../assets/bg_instructions_1.png";
import bgInstr2 from "../../assets/bg_instructions_2.png";
import bgInstr4 from "../../assets/bg_instructions_4.png";
import bgInstr8 from "../../assets/bg_instructions_8.png";

import bgFinalWin1 from "../../assets/bg_win_1.png";
import bgFinalWin2 from "../../assets/bg_win_2.png";
import bgFinalWin4 from "../../assets/bg_win_4.png";
import bgFinalWin8 from "../../assets/bg_win_8.png";

import bgFinalLose1 from "../../assets/bg_lose_1.png";
import bgFinalLose2 from "../../assets/bg_lose_2.png";
import bgFinalLose4 from "../../assets/bg_lose_4.png";
import bgFinalLose8 from "../../assets/bg_lose_8.png";

import head1 from "../../assets/1st head.svg";
import body1 from "../../assets/1st body.svg";
import fullscreen from "../../assets/full screen.svg";
import rules from "../../assets/rules.svg";

import firstXokeraLose from "../../assets/1st lose.svg";
import secondXokeraWin from "../../assets/2nd win.svg";
import secondXokeraLose from "../../assets/2nd lose.svg";
import thirdXokeraWin from "../../assets/3rd win.svg";
import thirdXokeraLose from "../../assets/3rd lose.svg";

import head2 from "../../assets/2nd head.svg";
import body2 from "../../assets/2nd body.svg";
import head3 from "../../assets/3rd head.svg";
import body3 from "../../assets/3rd body.svg";
import heart from "../../assets/heart.svg";

import arrows from "../../assets/arrows.svg";

// import upArrow from "../../assets/"

import audioCorrect from "../../assets/sounds/snek up.mp3";
import audioWrong from "../../assets/sounds/snek down.mp3";
import loseMusic from "../../assets/sounds/snek lost.mp3";
import winMusic from "../../assets/sounds/snek won.mp3";
import backgroundMusic from "../../assets/sounds/snek.mp3";
import bodyHit from "../../assets/sounds/bodyhit.mp3";

import { sceneEvents } from "../events/EventCenter";

import {
  CELL_HEIGHT,
  CELL_WIDTH,
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
} from "../constants/dimensions";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preload" });
  }

  init() {
    sceneEvents.on("rotate", this.onRotate, this);
    sceneEvents.on("unRotate", this.unRotate, this);
    this.scale.on("resize", this.resize, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("rotate", this.onRotate);
      sceneEvents.off("unRotate", this.unRotate);
    });
  }

  preload() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    if (width <= height) {
      this.scene.setVisible(true, "rotateScene");
      this.scene.setVisible(false);
    } else {
      this.scene.setVisible(false, "rotateScene");
      this.scene.setVisible(true);
    }

    this.logo = this.add
      .image(this.centerX(), this.centerY() - 100, "firstXokeraWin")
      .setOrigin(0.5, 0.5);
    this.createProgressbar(this.centerX(), this.centerY());



    this.loadAssets();
  }

  centerX() {
    return this.cameras.main.worldView.x + this.cameras.main.width / 2;
  }
  centerY() {
    return this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  loadAssets() {
    let maxTextureSize = this.game.renderer.getMaxTextureSize();

    if (maxTextureSize === 1024) {
      this.load.image("bg", bg1);
      this.load.image("bgStageBoard1", bgStage1_1);
      this.load.image("bgStageBoard2", bgStage2_1);
      this.load.image("bgStageBoard3", bgStage3_1);
      this.load.image("bgBoard", bgBoard1);
      this.load.image("bgInstr", bgInstr1);
      this.load.image("bgFinalWin", bgFinalWin1);
      this.load.image("bgFinalLose", bgFinalLose1);
    } else if (maxTextureSize === 2048) {
      this.load.image("bg", bg2);
      this.load.image("bgStageBoard1", bgStage1_2);
      this.load.image("bgStageBoard2", bgStage2_2);
      this.load.image("bgStageBoard3", bgStage3_2);
      this.load.image("bgBoard", bgBoard2);
      this.load.image("bgInstr", bgInstr2);
      this.load.image("bgFinalWin", bgFinalWin2);
      this.load.image("bgFinalLose", bgFinalLose2);
    } else if (maxTextureSize === 4096) {
      this.load.image("bg", bg4);
      this.load.image("bgStageBoard1", bgStage1_4);
      this.load.image("bgStageBoard2", bgStage2_4);
      this.load.image("bgStageBoard3", bgStage3_4);
      this.load.image("bgBoard", bgBoard4);
      this.load.image("bgInstr", bgInstr4);
      this.load.image("bgFinalWin", bgFinalWin4);
      this.load.image("bgFinalLose", bgFinalLose4);
    } else {
      this.load.image("bg", bg8);
      this.load.image("bgStageBoard1", bgStage1_8);
      this.load.image("bgStageBoard2", bgStage2_8);
      this.load.image("bgStageBoard3", bgStage3_8);
      this.load.image("bgBoard", bgBoard8);
      this.load.image("bgInstr", bgInstr8);
      this.load.image("bgFinalWin", bgFinalWin8);
      this.load.image("bgFinalLose", bgFinalLose8);
    }

    this.load.svg("headline", headline, { width: 500, height: 100 });
    this.load.svg("headlineEng", headlineEng, { width: 500, height: 100 });

    this.load.svg("yes_food", yesFood, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.svg("no_food", noFood, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });

    this.load.svg("yes_food_small", yesFood, {
      width: (CELL_WIDTH * 2) / 3,
      height: (CELL_HEIGHT * 2) / 3,
    });
    this.load.svg("no_food_small", noFood, {
      width: (CELL_WIDTH * 2) / 3,
      height: (CELL_HEIGHT * 2) / 3,
    });

    this.load.svg("head1", head1, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });

    this.load.svg("body1", body1, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.audio("gameMusic", backgroundMusic);

    this.load.svg("fullscreen", fullscreen, { width: 50, height: 50 });
    this.load.svg("rules", rules, { width: 50, height: 50 });

    this.load.svg("firstXokeraLose", firstXokeraLose, {
      width: 75,
      height: 75,
    });
    this.load.svg("secondXokeraWin", secondXokeraWin, {
      width: 75,
      height: 75,
    });
    this.load.svg("secondXokeraLose", secondXokeraLose, {
      width: 75,
      height: 75,
    });
    this.load.svg("thirdXokeraWin", thirdXokeraWin, { width: 75, height: 75 });
    this.load.svg("thirdXokeraLose", thirdXokeraLose, {
      width: 75,
      height: 75,
    });
    this.load.svg("head2", head2, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.svg("body2", body2, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.svg("head3", head3, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });
    this.load.svg("body3", body3, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });

    this.load.audio("audioCorrect", audioCorrect);
    this.load.audio("audioWrong", audioWrong);

    this.load.audio("loseMusic", loseMusic);
    this.load.audio("winMusic", winMusic);
    this.load.audio("bodyHit", bodyHit);

    this.load.svg("heart", heart, {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
    });

    this.load.svg("arrowsBig", arrows, {
      width: CELL_WIDTH * 3,
      height: (CELL_HEIGHT * 3) / 2,
    });

    this.load.svg("arrows", arrows, {
      width: CELL_WIDTH * 2,
      height: CELL_HEIGHT,
    });
  }

  createProgressbar(x, y) {
    // size & position
    let width = 400;
    let height = 20;
    let xStart = x - width / 2;
    let yStart = y - height / 2;

    // border size
    let borderOffset = 2;

    let borderRect = new Phaser.Geom.Rectangle(
      xStart - borderOffset,
      yStart - borderOffset,
      width + borderOffset * 2,
      height + borderOffset * 2
    );

    let border = this.add.graphics({
      lineStyle: {
        width: 5,
        color: 0x6f56d8,
      },
    });
    border.strokeRectShape(borderRect);

    this.progressbar = this.add.graphics();

    /**
     * Updates the progress bar.
     *
     * @param {number} percentage
     */
    let updateProgressbar = function (percentage) {
      // this.progressbar.clear();
      // this.progressbar.fillStyle(0xffc627, 1);
      // this.progressbar.fillRect(xStart, yStart, percentage * width, height);
    };

    this.load.on("progress", updateProgressbar);

    this.load.once(
      "complete",
      function () {
        this.load.off("progress", updateProgressbar);
        this.scene.start("title");
      },
      this
    );
  }

  create() {
    this.scene.start("titleScreen");
  }

  onRotate() {
    this.scene.setVisible(false);
    this.scene.setVisible(true, "rotateScene");
  }

  unRotate() {

    this.scene.setVisible(true);
    this.scene.setVisible(false, "rotateScene");
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    // var width = gameSize.width;
    // var height = gameSize.height;

    // this.cameras.resize(width, height);

    // if (this.logo) this.logo.setPosition(this.centerX(), this.centerY() - 100);
    // if (this.progressbar)
      // this.progressbar.setPosition(this.centerX(), this.centerY());
  }
}
