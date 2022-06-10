import firstXokeraWin from "../../assets/1st win.svg";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
  }

  preload() {
    this.load.svg("firstXokeraWin", firstXokeraWin, { width: 75, height: 75 });
  }

  create() {
    this.scene.start("preload");
  }
}
