import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import { TitleScreen, TitleBackgroundScene } from "./scenes/TitleScreen";
import i18n from "../i18n";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";
import InstructionsScene from "./scenes/InstructionsScene";
import { WinStage } from "./scenes/StageLoseWin";
import StageScene from "./scenes/StageScene";

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
  backgroundColor: "#24232B",
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
let titleBackgroundScene = new TitleBackgroundScene();
let instructionsScene = new InstructionsScene();
let stageScene = new StageScene();
// let uiScene = new UIScene();

let winScene = new WinStage();

game.scene.add("titleBackgroundScene", titleBackgroundScene);

game.scene.add("titleScreen", titleScreen);
game.scene.add("instructionsScene", instructionsScene);
game.scene.add("gameScene", gameScene);
game.scene.add("stageScene", stageScene);

// game.scene.add("winScene", winScene);

// game.scene.start("winScene")
// game.scene.add("uiScene", uiScene);

// game.scene.start("titleBackgroundScene");
// game.scene.start("titleScreen");

game.scene.start("instructionsScene");
