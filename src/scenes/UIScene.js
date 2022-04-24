import Phaser from "phaser";
import BaseScene from "./BaseScene";
import bg from "../../assets/bg_board.png";
import { questions } from "../questions";
import { styleText } from "../utils";
import GameScene from "./GameScene";

export default class UIScene extends BaseScene {
  constructor() {
    super({ key: "uiScene" });
    console.log("in constr");
  }

  preload() {
    this.load.image("bg", bg);
  }

  create() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    this.bg = this.add.image(windowWidth / 2, windowHeight / 2, "bg");
    this.bg.setDisplaySize(windowWidth, windowHeight);

    console.log("in create");
    this.textBox = this.add.rectangle(
      windowWidth / 2,
      50,
      windowWidth - 400,
      50,
      "0xFFFFFF"
    );

    let styleT = styleText;

    styleT.color = "0x000000";
    let q = questions.history.gutenberg[1].question;
    this.question = this.add.text(0, 0, q, styleT);
    Phaser.Display.Align.In.Center(this.question, this.textBox);

    let playArea = this.add.rectangle(0, 0, 520, 390, "0x000000");
    playArea.setStrokeStyle(1, "0xFFFFFF");
    Phaser.Display.Align.To.BottomCenter(playArea, this.textBox, 0, 50);

    let scene = this.scene.add("gameScene", GameScene, true, { x: 0, y: 0 });
  }
}
