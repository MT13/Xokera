import Phaser from "phaser";
import { BaseScene, BaseBackgroundScene } from "./BaseScene";
import i18n from "../../i18n";
import bg from "../../assets/bg_title.png";
import { styleHeader, styleText } from "../utils";
import RedButton from "../objects/redButton";
import {TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH} from '../constants/title';

export class TitleBackgroundScene extends BaseBackgroundScene
{
    constructor() {
      super({ key: "titleBackgroundScene" });
    }

    preload ()
    {
        this.load.image("bg", bg);
    }

    create ()
    {
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.updateCamera()
    }
}

export class TitleScreen extends BaseScene {
  constructor() {
    super({ key: "titleScreen" });
  }

  preload() {
    this.objects = {};
    // this.load.plugin(
    //   "rexroundrectangleplugin",
    //   "https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js",
    //   true
    // );
  }


  resize (gameSize, baseSize, displaySize, resolution)
  {
    super.resize(gameSize, baseSize, displaySize, resolution)
    this.backgroundScene.updateCamera();
  }

  
  create() {
    super.create()

    this.backgroundScene = this.scene.get('titleBackgroundScene');
    
    let styleH, styleT;

    this.offset = 50;
    let currentOffset = this.offset;

    if (i18n.language === "ka") {
      styleH = styleHeader;
      styleT = styleText;
      styleT.wordWrap = {
        width: TITLE_AREA_WIDTH/2 - 50,
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


    currentOffset += 100;
    let button = new RedButton(
      this,
      TITLE_AREA_WIDTH / 2,
      currentOffset,
      i18n.t("start")
    );

    this.add.existing(button);

    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.remove('titleBackgroundScene')
      this.scale.removeListener("resize", this.resize)
      this.scene.start("gameScene");
    });
  }
}
