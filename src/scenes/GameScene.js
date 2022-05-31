import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import Snake from "../objects/snake";
import ChoiceFood from "../objects/choiceFood";
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
  CELL_HEIGHT,
  CELL_WIDTH,
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

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    this.backgroundScene.updateCamera();
  }

  initAudio() {
    this.correctSound = this.sound.add("audioCorrect");
    this.wrongSound = this.sound.add("audioWrong");

    this.bodyHit = this.sound.add("bodyHit");
    console.log("gameScene: bodyhit is " + this.bodyHit);
  }

  create() {
    super.create();

    let playAreaStartY = (this.origY =
      (TITLE_AREA_HEIGHT - PLAY_AREA_HEIGHT) / 2);
    let playAreaStartX = (this.origX =
      (TITLE_AREA_WIDTH - PLAY_AREA_WIDTH) / 2);

    this.stage = 0;
    this.initAudio();

    this.initStage();

    this.cursors = this.input.keyboard.createCursorKeys();

    // Run UI Scene
    this.backgroundScene = this.scene.add(
      "gameBackgroundScene",
      GameBackgroundScene,
      true
    );
    this.uiScene = this.scene.add("uiScene", UIScene, true, {
      playAreaStartX,
      playAreaStartY,
      questionText: this.currentQuestions[this.curQuestion].question,
    });

    this.scene.bringToTop();

    this.scene.bringToTop("cornerButtonsScene");
    sceneEvents.on("pause-up", this.onPause, this);
    sceneEvents.on("wake-up", this.onWake, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.stage = 0;
      this.YesFood.destroy();
      this.NoFood.destroy();
      sceneEvents.off("pause-up", this.onPause);
      sceneEvents.off("wake-up", this.onWake);
      this.events.off(Phaser.Scenes.Events.WAKE);
    });

    this.events.on(Phaser.Scenes.Events.WAKE, () => {
      this.setSleepFlag(false);

      this.initStage();
    });
  }

  generateChoices(snake) {
    let yesX = Math.floor(Math.random() * (GRID_WIDTH - 1));
    let yesY = Math.floor(Math.random() * (GRID_HEIGHT - 1));
    let noX = Math.floor(Math.random() * (GRID_WIDTH - 1));
    let noY = Math.floor(Math.random() * (GRID_HEIGHT - 1));

    while (yesX === snake.headPosition.x) {
      yesX = Math.floor(Math.random() * (GRID_WIDTH - 1));
    }
    while (yesY === snake.headPosition.y) {
      yesY = Math.floor(Math.random() * (GRID_HEIGHT - 1));
    }
    while (noX === snake.headPosition.x) {
      noX = Math.floor(Math.random() * (GRID_WIDTH - 1));
    }
    while (noY === snake.headPosition.y || (noX === yesX && noY === yesY)) {
      noY = Math.floor(Math.random() * (GRID_HEIGHT - 1));
    }

    this.YesFood = new ChoiceFood(
      this,
      yesX,
      yesY,
      this.origX,
      this.origY,
      CELL_WIDTH,
      CELL_HEIGHT,
      "yes_food"
    );
    this.NoFood = new ChoiceFood(
      this,
      noX,
      noY,
      this.origX,
      this.origY,
      CELL_WIDTH,
      CELL_HEIGHT,
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
        if (
          testGrid[y][x] === true &&
          this.snake.headPosition.x != x &&
          this.snake.headPosition.y != y
        ) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 1) {
      Phaser.Actions.Shuffle(validLocations);

      let YesPosition = validLocations[0];
      let NoPosition = validLocations[1];

      this.YesFood.setPosition(
        this.origX + YesPosition.x * CELL_WIDTH,
        this.origY + YesPosition.y * CELL_HEIGHT
      );
      this.NoFood.setPosition(
        this.origX + NoPosition.x * CELL_WIDTH,
        this.origY + NoPosition.y * CELL_HEIGHT
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
      let [yesCollision, noCollision] = this.snake.collideWithFood([
        this.YesFood,
        this.NoFood,
      ]);
      if (!this.snake.isAlive()) {
        this.openLoseScene();
      }
      if (yesCollision || noCollision) {
        if ((yesCollision && this.answer) || (noCollision && !this.answer)) {
          this.correctSound.play();
          if (this.curQuestion === 5) {
            this.nextStage();
          } else {
            this.snake.grow();
            this.repositionChoices(this.snake);
            this.nextQuestion();
          }
        } else {
          this.wrongSound.play();
          this.repositionChoices(this.snake);
          this.health -= 1;
          // check zero health
          if (this.health === 0) {
            this.openLoseScene();
          }
          sceneEvents.emit("health-changed", this.health);
        }
      }
    }
  }

  openLoseScene() {
    var data = {
      title: i18n.t("you_lost"),
      color: "#E5541C",
      buttonText: i18n.t("try_again"),
      stage: -1,
    };

    if (this.snake.isAlive()) {
      data.text = i18n.t("lose");
      data.curStage = -1;
    } else {
      data.text = i18n.t("body_hit");
      data.curStage = this.stage;
      data.bodyHit = true;
    }

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

    if (this.snake.isAlive()) {
      this.scene.remove("gameBackgroundScene");
      this.scene.remove("uiScene");
      this.scale.removeListener("resize", this.resize);
      this.scene.start("stageWinLoseScene", data);
    } else {
      this.snake.destroy();
      this.YesFood.destroy();
      this.NoFood.destroy();
      this.setSleepFlag(true);
      this.scene.launch("stageWinLoseScene", data);
      this.backgroundScene.scene.sleep();
      this.uiScene.scene.sleep();
      this.scene.sleep();
    }
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

    if (this.stage === 0 || this.stage === -1 || !this.snake.isAlive()) {
      this.health = 5;
      sceneEvents.emit("health-changed", this.health);
    }

    this.snake = new Snake(
      this,
      1,
      1,
      this.origX,
      this.origY,
      CELL_WIDTH,
      CELL_HEIGHT,
      this.stage,
      this.bodyHit
    );

    this.generateChoices(this.snake);
  }

  nextStage() {
    this.stage += 1;
    let data = {
      stage: this.stage,
      buttonText: i18n.t("continue"),
    };
    switch (this.stage) {
      case 1:
        data.xokeraHead = "firstXokeraWin";
        data.color = "#6F56D8";
        data.title = i18n.t("win1_title");
        data.text = i18n.t("win1_text");
        break;
      case 2:
        data.xokeraHead = "secondXokeraWin";
        data.color = "#FFC627";
        data.title = i18n.t("win2_title");
        data.text = i18n.t("win2_text");
        break;
      case 3:
        data.bgImage = "bgFinalWin";
        data.color = "#4BC671";
        data.title = i18n.t("win3_title");
        data.text = i18n.t("win3_text");
    }

    if (this.stage === 3) {
      this.scene.remove("gameBackgroundScene");
      this.scene.remove("uiScene");
      this.scale.removeListener("resize", this.resize);
      data.won = true;
      this.scene.start("finalWinLose", data);
    } else {
      this.snake.destroy();
      this.YesFood.destroy();
      this.NoFood.destroy();
      this.setSleepFlag(true);
      this.scene.launch("stageWinLoseScene", data);
      this.backgroundScene.scene.sleep();
      this.uiScene.scene.sleep();
      this.scene.sleep();
    }
  }

  nextQuestion() {
    this.curQuestion += 1;
    this.answer = this.currentQuestions[this.curQuestion].answer;
    sceneEvents.emit("question-changed", {
      text: this.currentQuestions[this.curQuestion].question,
      idx: this.curQuestion,
    });
  }

  onPause() {
    if (!this.getSleepFlag()) {
      this.uiScene.scene.pause();
      this.scene.pause();
      this.backgroundScene.scene.setVisible(false);
      this.uiScene.scene.setVisible(false);
      this.scene.setVisible(false);
    }
  }

  onWake() {
    if (!this.getSleepFlag()) {
      this.scene.resume();
      this.uiScene.scene.resume();
      this.backgroundScene.scene.setVisible(true);
      this.scene.setVisible(true);
      this.uiScene.scene.setVisible(true);
      this.backgroundScene.scene.sendToBack();
    }
  }
}

export default GameScene;
