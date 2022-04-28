import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import { TitleScreen, BackgroundScene } from "./scenes/TitleScreen";
import i18n from "../i18n";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";
import InstructionsScene from "./scenes/InstructionsScene";
import UIScene from "./scenes/UIScene";

const MAX_SIZE_WIDTH_SCREEN = 1920;
const MAX_SIZE_HEIGHT_SCREEN = 1080;
const MIN_SIZE_WIDTH_SCREEN = 480;
const MIN_SIZE_HEIGHT_SCREEN = 360;
const SIZE_WIDTH_SCREEN = 10;
const SIZE_HEIGHT_SCREEN = 10;

const config = {
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
    min: {
      width: MIN_SIZE_WIDTH_SCREEN,
      height: MIN_SIZE_HEIGHT_SCREEN,
    },
    // max: {
    //     width: MAX_SIZE_WIDTH_SCREEN,
    //     height: MAX_SIZE_HEIGHT_SCREEN
    // }
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
let backgroundScene = new BackgroundScene();
let instructionsScene = new InstructionsScene();
let uiScene = new UIScene();

game.scene.add("backgroundScene", backgroundScene);

game.scene.add("titleScreen", titleScreen);
game.scene.add("instructionsScene", instructionsScene);
// game.scene.add("gameScene", gameScene);
game.scene.add("uiScene", uiScene);

game.scene.start("backgroundScene");
game.scene.start("titleScreen");
