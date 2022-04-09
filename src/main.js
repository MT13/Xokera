import Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import GameScene from "./scenes/GameScene";
import i18n from "../i18n";

const config = {
  scale: {
    mode: Phaser.Scale.NONE,
    parent: "game",
    width: window.innerWidth,
    height: window.innerHeight,
  },
  type: Phaser.AUTO,
};

let game = new Phaser.Game(config);

let titleScreen = new TitleScreen();
// let gameScene = new GameScene();
game.scene.add("titleScreen", titleScreen);
// game.scene.add("gameScene", gameScene);
game.scene.start("titleScreen");
