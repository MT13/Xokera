import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import { TitleScreen, TitleBackgroundScene } from "./scenes/TitleScreen";
import i18n from "../i18n";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";
import GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js";
import InstructionsScene from "./scenes/InstructionsScene";
import { StageWinLoseScene, WinStage } from "./scenes/StageWinLose";
import StageScene from "./scenes/StageScene";
import { FinalWinLose } from "./scenes/FinalWinLose";
import { PauseScene } from "./scenes/PauseScene";
import { CornerButtonsScene } from "./scenes/CornerButtonsScene";
import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "./constants/dimensions";
import yes from "./yes.png";
import BootScene from "./scenes/BootScene";
import PreloadScene from "./scenes/PreloadScene";

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

let bootScene = new BootScene();
let preloadScene = new PreloadScene();

let titleScreen = new TitleScreen();
let gameScene = new GameScene();
let instructionsScene = new InstructionsScene();
let stageScene = new StageScene();
let finalWinLose = new FinalWinLose();

let winScene = new StageWinLoseScene();
let pauseScene = new PauseScene();
let cornerButtonsScene = new CornerButtonsScene();
game.scene.add("boot", bootScene);
game.scene.add("preload", preloadScene);

game.scene.add("titleScreen", titleScreen);
game.scene.add("instructionsScene", instructionsScene);
game.scene.add("gameScene", gameScene);
game.scene.add("stageScene", stageScene);

game.scene.add("stageWinLoseScene", winScene);
game.scene.add("finalWinLose", finalWinLose);
game.scene.add("pauseScene", pauseScene);
game.scene.add("cornerButtonsScene", cornerButtonsScene);
game.scene.start("boot");
