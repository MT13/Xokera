import Phaser from "phaser";
import BaseScene from "./BaseScene";
import Snake from "../objects/snake";
import ChoiceFood from "../objects/choiceFood";
import head from "../../assets/first xokera head.png";
import body from "../../assets/first xokera body.png";
import yesFood from "../../assets/yes.png";
import noFood from "../../assets/no.png";

import { GRID_HEIGHT, GRID_WIDTH } from "../constants/dimensions";

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

  create(data) {
    super.create()

    let {origX, origY, width, height} = data
    this.origX = origX
    this.origY = origY
    this.cellWidth = width/GRID_WIDTH
    this.cellHeight = height/GRID_HEIGHT

    console.log(this.cellHeight, this.cellWidth)
    
    this.snake = new Snake(this, 1, 1, origX, origY, this.cellWidth, this.cellHeight);
    this.generateChoices(this.snake);
    this.cursors = this.input.keyboard.createCursorKeys();
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
        if (true) {
          this.snake.grow();
          this.repositionChoices(this.snake);
        } else {
          // lose life
        }

        this.repositionChoices(this.snake);
      } else if (this.snake.collideWithFood(this.NoFood)) {
        // Check Answer
        if (true) {
          this.snake.grow();
          this.repositionChoices(this.snake);
        } else {
          // lose life
        }
      }
    }
  }

  end() {}
}

export default GameScene;
