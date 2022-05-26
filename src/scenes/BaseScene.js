import Phaser from "phaser";
import { sceneEvents } from "../events/EventCenter";

import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/title";

export class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {}

  create() {
    const scaleWidth = this.scale.gameSize.width;
    const scaleHeight = this.scale.gameSize.height;
    this.pauseSceneStarted = false;

    this.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
    this.sizer = new Phaser.Structs.Size(
      TITLE_AREA_WIDTH,
      TITLE_AREA_HEIGHT,
      Phaser.Structs.Size.FIT,
      this.parent
    );

    this.parent.setSize(scaleWidth, scaleHeight);
    this.sizer.setSize(scaleWidth, scaleHeight);

    this.scale.on("leavefullscreen", this.handleFullscreen, this);
    this.scale.on("resize", this.resize, this);
    this.updateCamera(this);

    this.events.on(Phaser.Scenes.Events.DESTROY, () => {
      sceneEvents.off("pause-up");
      sceneEvents.off("wake-up");
      this.scale.removeListener("resize", this.resize);
    });
  }

  updateCamera() {
    const camera = this.cameras.main;

    const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
    const y = 0;
    const scaleX = this.sizer.width / TITLE_AREA_WIDTH;
    const scaleY = this.sizer.height / TITLE_AREA_HEIGHT;
    camera.setViewport(x, y, this.sizer.width, this.sizer.height);
    camera.setZoom(Math.max(scaleX, scaleY));
    camera.centerOn(TITLE_AREA_WIDTH / 2, TITLE_AREA_HEIGHT / 2);
  }

  getZoom() {
    return this.cameras.main.zoom;
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    const width = gameSize.width;
    const height = gameSize.height;

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);

    this.updateCamera();
  }

  handleFullscreen() {
    console.log("caught leave fullscreen");
    sceneEvents.emit("pause-up");
    let pauseScene = this.scene.get("pauseScene");
    if (pauseScene.scene.isSleeping()) {
      console.log("waking pauseScene");
      this.scene.wake("titleBackgroundScene");

      pauseScene.scene.wake();
    } else {
      console.log("launching pauseScene");
      this.scene.launch("pauseScene");
    }

    this.scene.sendToBack();
  }
}

export class BaseBackgroundScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {}

  updateCamera() {
    if (this.bg) {
      const width = this.scale.gameSize.width;
      const height = this.scale.gameSize.height;

      const camera = this.cameras.main;

      let x = width - this.bg.width;
      let y = height - this.bg.height;

      const scaleX = width / this.bg.width;
      const scaleY = height / this.bg.height;

      camera.setZoom(Math.max(scaleX, scaleY));
      camera.centerOn(this.bg.width / 2, this.bg.height / 2);
    }
  }
}
