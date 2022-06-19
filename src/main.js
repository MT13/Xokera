import GameScene from "./scenes/GameScene";
import { TitleScreen, TitleBackgroundScene } from "./scenes/TitleScreen";

import InstructionsScene from "./scenes/InstructionsScene";
import { StageWinLoseScene, WinStage } from "./scenes/StageWinLose";
import StageScene from "./scenes/StageScene";
import { FinalWinLose } from "./scenes/FinalWinLose";
import { PauseScene } from "./scenes/PauseScene";
import { CornerButtonsScene } from "./scenes/CornerButtonsScene";
import PreloadScene from "./scenes/PreloadScene";
import BootScene from "./scenes/BootScene";
import { RotateScene } from "./scenes/RotateScene";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";
import GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js";
import Phaser from "phaser";

const MAX_SIZE_WIDTH_SCREEN = 1920;
const MAX_SIZE_HEIGHT_SCREEN = 1080;
const MIN_SIZE_WIDTH_SCREEN = 480;
const MIN_SIZE_HEIGHT_SCREEN = 360;
const SIZE_WIDTH_SCREEN = 10;
const SIZE_HEIGHT_SCREEN = 10;

const config = {
  scale: {
    type: Phaser.AUTO,
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
    scene: [
      {
        key: "rexGestures",
        plugin: GesturesPlugin,
        mapping: "rexGestures",
      },
    ],
  },
};

let game = new Phaser.Game(config);

let preloadScene = new PreloadScene();
let bootScene = new BootScene();

let titleScreen = new TitleScreen();
let gameScene = new GameScene();
let instructionsScene = new InstructionsScene();
let stageScene = new StageScene();
let finalWinLose = new FinalWinLose();

let winScene = new StageWinLoseScene();
let pauseScene = new PauseScene();
let cornerButtonsScene = new CornerButtonsScene();
let rotateScene = new RotateScene();
game.scene.add("rotateScene", rotateScene);
game.scene.add("preload", preloadScene);
game.scene.add("boot", bootScene);

game.scene.add("titleScreen", titleScreen);
game.scene.add("instructionsScene", instructionsScene);
game.scene.add("gameScene", gameScene);
game.scene.add("stageScene", stageScene);

game.scene.add("stageWinLoseScene", winScene);
game.scene.add("finalWinLose", finalWinLose);
game.scene.add("pauseScene", pauseScene);
game.scene.add("cornerButtonsScene", cornerButtonsScene);
game.scene.start("boot");
