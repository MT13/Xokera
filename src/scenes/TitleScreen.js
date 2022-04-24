import Phaser from "phaser";
import BaseScene from "./BaseScene";
import i18n from "../../i18n";
import bg from "../../assets/bg_title.png";
import { styleHeader, styleText } from "../utils";
import RedButton from "../objects/redButton";

class TitleScreen extends BaseScene {
  constructor() {
    super({ key: "titleScreen" });
  }

  preload() {
    this.objects = {};
    this.load.image("bg", bg);
    // this.load.plugin(
    //   "rexroundrectangleplugin",
    //   "https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js",
    //   true
    // );
  }

  create() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    this.bg = this.add.image(windowWidth / 2, windowHeight / 2, "bg");
    this.bg.setDisplaySize(windowWidth, windowHeight);

    let styleH, styleT;

    this.offset = 50;
    let currentOffset = this.offset;

    if (i18n.language === "ka") {
      styleH = styleHeader;
      styleT = styleText;
      styleT.wordWrap = {
        width: windowWidth / 2 - this.offset,
        useAdvancedWrap: true,
      };
    }

    styleH.color = "#FFC627";
    this.aboutH = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("about game"),
      styleH
    );
    currentOffset *= 2;
    this.aboutT = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("annotation"),
      styleT
    );

    currentOffset += this.aboutT.height + this.offset / 2;
    this.instructionsH = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("instruction"),
      styleH
    );

    currentOffset += this.offset;
    this.instructionsT = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("instruction text"),
      styleT
    );

    currentOffset += this.instructionsT.height + this.offset / 2;
    styleT.fontSize = "2vh";
    styleT.fontStyle = "bold";
    this.questions = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("questions"),
      styleT
    );

    styleT.fontStyle = "normal";
    this.q_authors = this.add.text(
      this.questions.width + this.offset,
      currentOffset,
      i18n.t("q_authors"),
      styleT
    );

    currentOffset += this.q_authors.height;
    styleT.fontStyle = "bold";
    this.illustrator = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("illustrator"),
      styleT
    );

    styleT.fontStyle = "normal";
    this.il_name = this.add.text(
      this.illustrator.width + this.offset,
      currentOffset,
      i18n.t("il name"),
      styleT
    );
    currentOffset += this.il_name.height;
    styleT.fontStyle = "bold";
    this.illustrator = this.add.text(
      this.offset,
      currentOffset,
      i18n.t("developer"),
      styleT
    );

    styleT.fontStyle = "normal";
    this.q_authors = this.add.text(
      this.illustrator.width + this.offset,
      currentOffset,
      i18n.t("dev name"),
      styleT
    );

    currentOffset += this.offset;
    let button = new RedButton(
      this,
      windowWidth / 2,
      currentOffset,
      i18n.t("start")
    );

    this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.start("uiScene");
    });
  }
}

export default TitleScreen;
