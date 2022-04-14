import Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import GameScene from "./scenes/GameScene";
import i18n from "../i18n";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";

const config = {
  scale: {
    mode: Phaser.Scale.NONE,
    parent: "game",
    width: window.innerWidth,
    height: window.innerHeight,
  },
  type: Phaser.AUTO,
  plugins: {
    global: [
      {
        key: "rexRoundRectanglePlugin",
        plugin: RoundRectanglePlugin,
        start: true,
      },
    ],
  },
};

let game = new Phaser.Game(config);

let titleScreen = new TitleScreen();
let gameScene = new GameScene();
// let gameScene = new GameScene();
game.scene.add("titleScreen", titleScreen);
game.scene.add("gameScene", gameScene);

// game.scene.add("gameScene", gameScene);
game.scene.start("titleScreen");
