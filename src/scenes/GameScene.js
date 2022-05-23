import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import Snake from "../objects/snake";
import ChoiceFood from "../objects/choiceFood";
import firstXokeraWin from "../../assets/1st win.svg";
import firstXokeraLose from "../../assets/1st lose.svg";
import secondXokeraWin from "../../assets/2nd win.svg";
import secondXokeraLose from "../../assets/2nd lose.svg";
import thirdXokeraWin from "../../assets/3rd win.svg";
import thirdXokeraLose from "../../assets/3rd lose.svg";

import { questions } from "../questions";

import { getRandom, shuffle } from "../helpers/scripts";
import { sceneEvents } from "../events/EventCenter";

import {
  GRID_HEIGHT,
  GRID_WIDTH,
  PLAY_AREA_HEIGHT,
  PLAY_AREA_WIDTH,
  TITLE_AREA_HEIGHT,
  TITLE_AREA_WIDTH,
} from "../constants/dimensions";
import { UIScene } from "./UIScene";
import i18n from "../../i18n";

export class GameBackgroundScene extends BaseBackgroundScene {
  constructor() {
    super({ key: "gameBackgroundScene" });
  }

  preload() {}

  create() {
    this.bg = this.add.image(0, 0, "bgBoard").setOrigin(0, 0);
    // this.scene.sendToBack();
    this.updateCamera();
  }
}

class GameScene extends BaseScene {
  constructor() {
    super({ key: "gameScene" });
  }

  init() {
    this.cellWidth = PLAY_AREA_WIDTH / GRID_WIDTH;
    this.cellHeight = PLAY_AREA_HEIGHT / GRID_HEIGHT;
  }
  preload() {
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
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    this.backgroundScene.updateCamera();
  }

  create() {
    super.create();

    let playAreaStartY = (this.origY =
      (TITLE_AREA_HEIGHT - PLAY_AREA_HEIGHT) / 2);
    let playAreaStartX = (this.origX =
      (TITLE_AREA_WIDTH - PLAY_AREA_WIDTH) / 2);

    this.stage = 0;
    this.initStage();

    this.cursors = this.input.keyboard.createCursorKeys();

    // Run UI Scene
    this.backgroundScene = this.scene.add(
      "gameBackgroundScene",
      GameBackgroundScene,
      true
    );
    this.scene.add("uiScene", UIScene, true, {
      playAreaStartX,
      playAreaStartY,
      questionText: this.currentQuestions[this.curQuestion].question,
    });
    this.scene.bringToTop();
  }

  generateChoices(snake) {
    this.YesFood = new ChoiceFood(
      this,
      13,
      11,
      this.origX,
      this.origY,
      this.cellWidth,
      this.cellHeight,
      "yes_food"
    );
    this.NoFood = new ChoiceFood(
      this,
      0,
      0,
      this.origX,
      this.origY,
      this.cellWidth,
      this.cellHeight,
      "no_food"
    );
  }

  repositionChoices(snake) {
    const testGrid = Array.from({ length: GRID_HEIGHT }, () =>
      Array.from({ length: GRID_WIDTH }, () => true)
    );

    snake.updateGrid(testGrid);

    const validLocations = [];

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 1) {
      Phaser.Actions.Shuffle(validLocations);

      let YesPosition = validLocations[0];
      let NoPosition = validLocations[1];

      this.YesFood.setPosition(
        this.origX + YesPosition.x * this.cellWidth,
        this.origY + YesPosition.y * this.cellHeight
      );
      this.NoFood.setPosition(
        this.origX + NoPosition.x * this.cellWidth,
        this.origY + NoPosition.y * this.cellHeight
      );

      return true;
    }

    // ???
  }

  update(time) {
    if (this.cursors.left.isDown) {
      this.snake.faceLeft();
    } else if (this.cursors.right.isDown) {
      this.snake.faceRight();
    } else if (this.cursors.up.isDown) {
      this.snake.faceUp();
    } else if (this.cursors.down.isDown) {
      this.snake.faceDown();
    }

    if (this.snake.update(time)) {
      if (this.snake.collideWithFood(this.YesFood)) {
        // Check Answer    this.scene.bringToTop();

        if (this.answer) {
          this.snake.grow();
          this.repositionChoices(this.snake);
          this.nextQuestion();
        } else {
          this.repositionChoices(this.snake);
          this.health -= 1;
          // check zero health

          if (this.health == 0) {
            this.openLoseScene();
          }
          sceneEvents.emit("health-changed", this.health);
        }

        this.repositionChoices(this.snake);
      } else if (this.snake.collideWithFood(this.NoFood)) {
        // Check Answer
        if (!this.answer) {
          this.snake.grow();
          this.repositionChoices(this.snake);
          this.nextQuestion();
        } else {
          this.repositionChoices(this.snake);
          this.health -= 1;

          if (this.health == 0) {
            this.openLoseScene();
          }
          // check zero health
          sceneEvents.emit("health-changed", this.health);
        }
      }
    }
  }

  openLoseScene() {
    this.scene.remove("gameBackgroundScene");
    this.scene.remove("uiScene");
    this.scale.removeListener("resize", this.resize);
    var data = {
      title: i18n.t("you_lost"),
      text: i18n.t("lose"),
      color: "#E5541C",
    };
    switch (this.stage) {
      case 0:
        data.xokeraHead = "firstXokeraLose";
        break;
      case 1:
        data.xokeraHead = "secondXokeraLose";
        break;
      case 2:
        data.xokeraHead = "thirdXokeraLose";
        break;
    }
    this.scene.start("stageWinLoseScene", data);
  }

  STAGES = ["gutenberg", "broadcasting", "digital"];

  randomizeQuestions() {
    let stageKey = this.STAGES[this.stage];

    let randHistory = getRandom(questions["history"][stageKey], 5);
    let randContent = getRandom(questions["content"][stageKey], 5);
    return shuffle(randHistory.concat(randContent));
  }

  initStage() {
    this.currentQuestions = this.randomizeQuestions();

    this.curQuestion = 0;
    this.answer = this.currentQuestions[this.curQuestion].answer;
    sceneEvents.emit("question-changed", {
      text: this.currentQuestions[this.curQuestion].question,
      idx: this.curQuestion,
    });

    this.health = 3;
    sceneEvents.emit("health-changed", this.health);

    this.snake = new Snake(
      this,
      1,
      1,
      this.origX,
      this.origY,
      this.cellWidth,
      this.cellHeight
    );
    this.generateChoices(this.snake);
  }

  nextStage() {
    this.stage += 1;
    this.initStage();
  }

  nextQuestion() {
    this.curQuestion += 1;
    this.answer = this.currentQuestions[this.curQuestion].answer;
    sceneEvents.emit("question-changed", {
      text: this.currentQuestions[this.curQuestion].question,
      idx: this.curQuestion,
    });
  }
}

export default GameScene;
