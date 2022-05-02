import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import Snake from "../objects/snake";
import ChoiceFood from "../objects/choiceFood";
import head from "../../assets/first xokera head.png";
import body from "../../assets/first xokera body.png";
import { questions } from "../questions";
import yesFood from "../../assets/yes.png";
import noFood from "../../assets/no.png";
import { getRandom, shuffle } from "../helpers/scripts";
import { sceneEvents } from "../events/EventCenter";

import { GRID_HEIGHT, GRID_WIDTH, PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH, TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/dimensions";
import { UIScene } from "./UIScene";

class GameScene extends BaseScene {
  constructor() {
    super({ key: "gameScene" });
  }

  preload() {
    this.load.image("head", head);
    this.load.image("body", body);
    this.load.image("yes_food", yesFood);
    this.load.image("no_food", noFood);
  }

  create() {
    super.create()

    this.cellWidth = PLAY_AREA_WIDTH/GRID_WIDTH
    this.cellHeight = PLAY_AREA_HEIGHT/GRID_HEIGHT

    let playAreaStartY = this.origY = (TITLE_AREA_HEIGHT - PLAY_AREA_HEIGHT)/2
    let playAreaStartX = this.origX = (TITLE_AREA_WIDTH - PLAY_AREA_WIDTH)/2

    this.stage = 0
    this.initStage()

    this.snake = new Snake(this, 1, 1, this.origX, this.origY, this.cellWidth, this.cellHeight);
    this.generateChoices(this.snake);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Run UI Scene
    this.scene.add("uiScene", UIScene, true, 
    { playAreaStartX, playAreaStartY, questionText: this.currentQuestions[this.curQuestion].question});
    console.log("here")
    this.scene.bringToTop();
  }

  generateChoices(snake) {
    this.YesFood = new ChoiceFood(this, 13, 11, this.origX, this.origY, this.cellWidth, this.cellHeight, "yes_food");
    this.NoFood = new ChoiceFood(this, 0, 0, this.origX, this.origY, this.cellWidth, this.cellHeight, "no_food");
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

      this.YesFood.setPosition(this.origX + YesPosition.x * this.cellWidth, this.origY + YesPosition.y * this.cellHeight);
      this.NoFood.setPosition(this.origX + NoPosition.x * this.cellWidth, this.origY + NoPosition.y * this.cellHeight);

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
        // Check Answer
        if (this.answer) {
          this.snake.grow();
          this.repositionChoices(this.snake);
          this.nextQuestion()
        } else {
          this.repositionChoices(this.snake);
          this.health -= 1;
          // check zero health
          sceneEvents.emit('health-changed', this.health)
          
        
        }

        this.repositionChoices(this.snake);
      } else if (this.snake.collideWithFood(this.NoFood)) {
        // Check Answer
        if (!this.answer) {
          this.snake.grow();
          this.repositionChoices(this.snake);
          this.nextQuestion()
        } else {
          this.repositionChoices(this.snake);
          this.health -= 1;
          // check zero health
          sceneEvents.emit('health-changed', this.health)
        }
      }
    }
  }

  STAGES = ['gutenberg', 'broadcastng', 'digital']

  randomizeQuestions() {
    let stageKey = this.STAGES[this.stage];
    let randHistory = getRandom(questions['history'][stageKey], 5)
    let randContent = getRandom(questions['content'][stageKey], 5)
    return shuffle(randHistory.concat(randContent))
  }

  initStage() {
    this.currentQuestions = this.randomizeQuestions();

    this.curQuestion = 0;
    this.answer = this.currentQuestions[this.curQuestion].answer
    sceneEvents.emit('question-changed', {text: this.currentQuestions[this.curQuestion].question, idx: this.curQuestion})

    this.health = 3
    sceneEvents.emit('health-changed', this.health)
  }

  nextStage() {
    this.stage += 1;
    this.initStage();
  }

  nextQuestion() {
    this.curQuestion += 1;
    this.answer = this.currentQuestions[this.curQuestion].answer
    sceneEvents.emit('question-changed', {text: this.currentQuestions[this.curQuestion].question, idx: this.curQuestion})
  }
}

export default GameScene;
