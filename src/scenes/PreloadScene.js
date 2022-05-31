import yesFood from "../../assets/yes fruit.svg";
import noFood from "../../assets/no fruit.svg";
import bgInstr from "../../assets/bg_instructions.png";
import headline from "../../assets/headline.svg";
import headlineEng from "../../assets/cyber snake.svg";

import bgStage1 from "../../assets/bg_first_xokera.png";
import bgStage2 from "../../assets/bg second xokera.png";
import bgStage3 from "../../assets/bg third xokera.png";
import head1 from "../../assets/1st head.svg";
import body1 from "../../assets/1st body.svg";
import fullscreen from "../../assets/full screen.svg";
import rules from "../../assets/rules.svg";
import bgBoard from "../../assets/bg_board.png";
import firstXokeraWin from "../../assets/1st win.svg";
import firstXokeraLose from "../../assets/1st lose.svg";
import secondXokeraWin from "../../assets/2nd win.svg";
import secondXokeraLose from "../../assets/2nd lose.svg";
import thirdXokeraWin from "../../assets/3rd win.svg";
import thirdXokeraLose from "../../assets/3rd lose.svg";
import bgFinalWin from "../../assets/bg win.png";

import head2 from "../../assets/2nd head.svg";
import body2 from "../../assets/2nd body.svg";
import head3 from "../../assets/3rd head.svg";
import body3 from "../../assets/3rd body.svg";
import heart from "../../assets/heart.svg";
import bgFinalLose from "../../assets/bg lose.png";

import audioCorrect from "../../assets/sounds/snek up.mp3";
import audioWrong from "../../assets/sounds/snek down.mp3";
import loseMusic from "../../assets/sounds/snek lost.mp3";
import winMusic from "../../assets/sounds/snek won.mp3";
import backgroundMusic from "../../assets/sounds/snek.mp3";
import bodyHit from "../../assets/sounds/bodyhit.mp3";

import { CELL_HEIGHT, CELL_WIDTH } from "../constants/dimensions";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preload" });
  }

  preload() {
    this.add
      .image(this.centerX(), this.centerY() - 100, "logo")
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
    this.load.image("bgInstr", bgInstr);
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

    this.load.image("bgStageBoard1", bgStage1);
    this.load.image("bgStageBoard2", bgStage2);
    this.load.image("bgStageBoard3", bgStage3);
    this.load.svg("head1", head1);

    this.load.svg("body1", body1);
    this.load.audio("gameMusic", backgroundMusic);

    this.load.svg("fullscreen", fullscreen, { width: 50, height: 50 });
    this.load.svg("rules", rules, { width: 50, height: 50 });

    this.load.image("bgBoard", bgBoard);

    this.load.svg("firstXokeraWin", firstXokeraWin, { width: 75, height: 75 });
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
    this.load.svg("head2", head2);
    this.load.svg("body2", body2);
    this.load.svg("head3", head3);
    this.load.svg("body3", body3);

    this.load.image("bgFinalWin", bgFinalWin);
    this.load.audio("audioCorrect", audioCorrect);
    this.load.audio("audioWrong", audioWrong);

    this.load.audio("loseMusic", loseMusic);
    this.load.audio("winMusic", winMusic);
    this.load.audio("bodyHit", bodyHit);

    this.load.image("bgFinalLose", bgFinalLose);
    this.load.svg("heart", heart, {
      width: CELL_WIDTH,
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

    let progressbar = this.add.graphics();

    /**
     * Updates the progress bar.
     *
     * @param {number} percentage
     */
    let updateProgressbar = function (percentage) {
      progressbar.clear();
      progressbar.fillStyle(0xffc627, 1);
      progressbar.fillRect(xStart, yStart, percentage * width, height);
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
    this.scene.start("instructionsScene");
  }
}
