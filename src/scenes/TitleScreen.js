import Phaser from "phaser";
import BaseScene from "./BaseScene";
import i18n from "../../i18n";
import bg from "../../assets/bg_title.png";
import { styleHeader, styleText } from "../utils";
import RedButton from "../objects/redButton";
import {TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH} from '../constants/title';

export class BackgroundScene extends Phaser.Scene
{
    constructor() {
      super({ key: "backgroundScene" });
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

    updateCamera ()
    {
      if(this.bg){
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const camera = this.cameras.main;

        // let x = this.bg.width - width;
        // let y = this.bg.height - height;

        let x = width - this.bg.width
        let y = height - this.bg.height

        const scaleX = width / this.bg.width;
        const scaleY = height / this.bg.height;

        // camera.setViewport(x, y , width, height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(this.bg.width / 2, this.bg.height / 2);

      }
        

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

  updateCamera ()
    {
        const camera = this.cameras.main;

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = 0;
        const scaleX = this.sizer.width / TITLE_AREA_WIDTH;
        const scaleY = this.sizer.height / TITLE_AREA_HEIGHT;
        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(TITLE_AREA_WIDTH / 2, TITLE_AREA_HEIGHT / 2);

        this.backgroundScene.updateCamera();
    }

  getZoom ()
  {
      return this.cameras.main.zoom;
  }

  resize (gameSize, baseSize, displaySize, resolution)
  {
      const width = gameSize.width;
      const height = gameSize.height;

      this.parent.setSize(width, height);
      this.sizer.setSize(width, height);

      this.updateCamera();
  }

  
  create() {
    console.log("in create titleScreen1");


    const scaleWidth = this.scale.gameSize.width
    const scaleHeight = this.scale.gameSize.height

    this.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight)
    this.sizer = new Phaser.Structs.Size(TITLE_AREA_WIDTH, TITLE_AREA_HEIGHT, Phaser.Structs.Size.FIT, this.parent)


    this.parent.setSize(scaleWidth, scaleHeight)
    this.sizer.setSize(scaleWidth, scaleHeight)

    this.backgroundScene = this.scene.get('backgroundScene');

    this.updateCamera(this)
    this.scale.on('resize', this.resize, this)

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
      this.scene.remove('backgroundScene')
      this.scale.removeListener("resize", this.resize)
      this.scene.start("gameScene");
    });
  }
}
