import logo from "../../assets/1st win.svg";
import yesFood from "../../assets/yes fruit.svg";
import noFood from "../../assets/no fruit.svg";
import bg from "../../assets/bg_title.png";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants/dimensions";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
  }

  preload() {
    // load all files necessary for the loading screen
    this.load.svg("logo", logo, {
      width: 75,
      height: 75,
    });
    this.load.image("bg", bg);

    this.load.svg("yes_food_small", yesFood, {
      width: (CELL_WIDTH * 2) / 3,
      height: (CELL_HEIGHT * 2) / 3,
    });
    this.load.svg("no_food_small", noFood, {
      width: (CELL_WIDTH * 2) / 3,
      height: (CELL_HEIGHT * 2) / 3,
    });
  }

  create() {
    console.log("yoooo");
    this.scene.start("titleScreen");
  }
}
