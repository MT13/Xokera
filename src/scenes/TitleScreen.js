import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import i18n from "../../i18n";

import { styleHeader, styleText } from "../utils";
import RedButton from "../objects/redButton";
import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/title";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants/dimensions";
import { TitleBackgroundScene } from "./TitleBackgroundScene";

import logo from "../../assets/1st win.svg";
import yesFood from "../../assets/yes fruit.svg";
import noFood from "../../assets/no fruit.svg";
import bg from "../../assets/bg_title.png";


export class TitleScreen extends BaseScene {
  constructor() {
    super({ key: "titleScreen" });
  }

  preload() {
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

  resize(gameSize, baseSize, displaySize, resolution) {
    super.resize(gameSize, baseSize, displaySize, resolution);
    this.backgroundScene.updateCamera();
  }

  create() {
    super.create();

    this.backgroundScene = this.scene.add(
      "titleBackgroundScene",
      TitleBackgroundScene,
      true
    );

    this.scene.bringToTop();

    let styleH, styleT;

    this.offset = 50;
    let currentOffset = this.offset;

    if (i18n.language === "ka") {
      styleH = { ...styleHeader };
      styleT = { ...styleText };
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH / 2 - 50,
        useAdvancedWrap: true,
      };
    }

    styleH.color = "#FFC627";
    this.aboutH = this.add.text(0, currentOffset, i18n.t("about game"), styleH);

    currentOffset *= 2;
    this.aboutT = this.add.text(0, currentOffset, i18n.t("annotation"), styleT);

    currentOffset += this.aboutT.height + this.offset / 2;
    this.instructionsH = this.add.text(
      0,
      currentOffset,
      i18n.t("instruction"),
      styleH
    );

    currentOffset += this.offset;
    this.instructionsT = this.add.text(
      0,
      currentOffset,
      i18n.t("instruction text"),
      styleT
    );

    currentOffset += this.instructionsT.height + this.offset / 2;

    this.yesFruit = this.add
      .image(0, currentOffset, "yes_food_small")
      .setOrigin(0, 0.5);
    this.foodOffset = this.yesFruit.width;

    this.yesText = this.add
      .text(this.foodOffset, currentOffset, i18n.t("yes"), styleT)
      .setOrigin(0, 0.5);
    this.foodOffset += this.yesText.width + 15;
    this.noFruit = this.add
      .image(this.foodOffset, currentOffset, "no_food_small")
      .setOrigin(0, 0.5);
    this.foodOffset += this.noFruit.width;

    this.noText = this.add
      .text(this.foodOffset, currentOffset, i18n.t("no"), styleT)
      .setOrigin(0, 0.5);
    currentOffset += this.yesFruit.height + 15;
    styleT.fontSize = "15px";
    styleT.fontStyle = "bold";
    this.questions = this.add.text(
      0,
      currentOffset,
      i18n.t("questions"),
      styleT
    );

    styleT.fontStyle = "normal";
    this.q_authors = this.add.text(
      this.questions.width,
      currentOffset,
      i18n.t("q_authors"),
      styleT
    );

    currentOffset += this.q_authors.height;
    styleT.fontStyle = "bold";
    this.illustrator = this.add.text(
      0,
      currentOffset,
      i18n.t("illustrator"),
      styleT
    );

    styleT.fontStyle = "normal";
    this.il_name = this.add.text(
      this.illustrator.width,
      currentOffset,
      i18n.t("il name"),
      styleT
    );
    currentOffset += this.il_name.height;
    styleT.fontStyle = "bold";
    this.illustrator = this.add.text(
      0,
      currentOffset,
      i18n.t("developer"),
      styleT
    );

    styleT.fontStyle = "normal";
    this.q_authors = this.add.text(
      this.illustrator.width,
      currentOffset,
      i18n.t("dev name"),
      styleT
    );

    // currentOffset += 50;
    let button = new RedButton(
      this,
      TITLE_AREA_WIDTH / 2,
      currentOffset,
      i18n.t("start")
    );

    this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.stop("titleBackgroundScene");
      this.scale.removeListener("resize", this.resize);
      this.scene.start("preload");
    });
  }
}
