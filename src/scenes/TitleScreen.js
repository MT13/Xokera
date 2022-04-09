import Phaser from "phaser";
import BaseScene from "./BaseScene";
import i18n from "../../i18n";
import bg from "../../assets/bg_title.png";

class TitleScreen extends BaseScene {
  constructor() {
    super({ key: "titleScreen" });
  }

  preload() {
    this.objects = {};
    this.load.image("bg", bg);
  }

  create() {
    console.log("in create titleScreen1");

    console.log("In titleScreen");

    var windowWidth = window.innerWidth;
    var widnowHeight = window.innerHeight;
    this.bg = this.add.image(windowWidth / 2, widnowHeight / 2, "bg");
    this.bg.setDisplaySize(windowWidth, widnowHeight);
    var style = {
      fontFamily: "Roboto_MtavruliBold",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };

    this.myText = this.add.text(50, 50, i18n.t("about game"), style);
    this.myText.setPadding(5, 5, 5, 5);
  }
}

export default TitleScreen;
