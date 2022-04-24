import Phaser from "phaser";
import BaseScene from "./BaseScene";
import Snake from "../objects/snake";
import ChoiceFood from "../objects/choiceFood";
import head from "../../assets/first xokera head.png";
import body from "../../assets/first xokera body.png";
import yesFood from "../../assets/yes.png";
import noFood from "../../assets/no.png";

import { HEIGHT, SIZE, WIDTH } from "../constants/game";

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
    this.snake = new Snake(this, 0, 0);
    this.generateChoices(this.snake);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  generateChoices(snake) {
    this.YesFood = new ChoiceFood(this, 13, 12, "yes_food");
    this.NoFood = new ChoiceFood(this, 19, 3, "no_food");
  }

  repositionChoices(snake) {
    const testGrid = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => true)
    );

    snake.updateGrid(testGrid);

    const validLocations = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 1) {
      Phaser.Actions.Shuffle(validLocations);

      let YesPosition = validLocations[0];
      let NoPosition = validLocations[1];

      this.YesFood.setPosition(YesPosition.x * SIZE, YesPosition.y * SIZE);
      this.NoFood.setPosition(NoPosition.x * SIZE, NoPosition.y * SIZE);

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
