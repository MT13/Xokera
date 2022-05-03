import Phaser from "phaser";
import { GRID_WIDTH, GRID_HEIGHT } from "../constants/dimensions";


const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;


export default class Snake {
 
    constructor(scene, x, y, origX, origY, cellWidth, cellHeight) {

      this.cellWidth = cellWidth
      this.cellHeight = cellHeight
      this.origX = origX
      this.origY = origY

      this.body = scene.add.group({
        defaultKey: 'body',
        createCallback: o => {
            o.setOrigin(0)
            o.displayWidth = cellWidth
            o.displayHeight = cellHeight
        }
      });

  
      this.head = this.body.create(origX + x*cellWidth, origY + y*cellHeight, 'head');
  
      this.heading = RIGHT
      this.direction = RIGHT
      this.headPosition = new Phaser.Geom.Point(x, y);
      this.tailPosition = new Phaser.Geom.Point(x, y);
  
      this.alive = true;
      this.updated = true;
      this.moveTime = 0;
      this.moveDelay = 100;
    }
  

    update(time) {
      if (time >= this.moveTime) {
        return this.move(time);
      }
  
      return false;
    }

    faceLeft() {
        if (this.direction != RIGHT) {
            this.heading = LEFT
        }
    }

    faceRight() {
        if (this.direction != LEFT) {
            this.heading = RIGHT
        }
    }

    faceUp() {
        if (this.direction != DOWN) {
            this.heading = UP
        }
    }

    faceDown() {
        if (this.direction != UP) {
            this.heading = DOWN
        }
    }
  

    hitBody() {
      return Phaser.Actions.GetFirst(
        this.body.children.entries,
        {x: this.head.x, y: this.head.y},
        1
      );
    }
  

    move(time) {
        let new_rotation_origin = [0, 0]
        switch (this.heading)
        {
            case LEFT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, GRID_WIDTH);
                new_rotation_origin = [1, 1]
                break;

            case RIGHT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, GRID_WIDTH);
                new_rotation_origin = [0, 0]
                break;

            case UP:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, GRID_HEIGHT);
                new_rotation_origin = [1, 0]
                break;

            case DOWN:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, GRID_HEIGHT);
                new_rotation_origin = [0, 1]
                break;
        }
        this.direction = this.heading
        
        this.head.setAngle(90*this.direction)
        this.head.setOrigin(...new_rotation_origin)

        Phaser.Actions.ShiftPosition(
            this.body.children.entries,
            this.headPosition.x * this.cellWidth + this.origX,
            this.headPosition.y * this.cellHeight + this.origY,
            1,
            this.tailPosition
        );
  
      if (this.hitBody()) {
        //  Game Over!
        this.alive = false;
        return false;
      }
  
      this.moveTime = time + this.moveDelay;
  
      return true;
    }
  
    grow() {
      this.body.create(this.tailPosition.x, this.tailPosition.y);
    }
  

    collideWithFood(food) {
      if (this.head.x === food.x && this.head.y === food.y) {
        return true;
      }
  
      return false;
    }
  
    updateGrid(grid) {
      for (const segment of this.body.getChildren()) {
        const x = (segment.x - this.origX) / this.cellWidth;
        const y = (segment.y - this.origY) / this.cellHeight;
  
        grid[y][x] = false;
      }
  
      return grid;
    }

    destroy(){
      this.body.destroy()
    }
  }