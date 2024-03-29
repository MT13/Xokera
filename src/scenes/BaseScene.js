import Phaser from "phaser";
import { sceneEvents } from "../events/EventCenter";

import { TITLE_AREA_HEIGHT, TITLE_AREA_WIDTH } from "../constants/title";
import i18n from "../../i18n";

export class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {}

  create() {
    (this.paused = false), (this.asleep = false);
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
    this.scale.on("resize", this.resize, this);
    this.updateCamera(this);

    // this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   this.scale.removeListener("resize", this.resize);
    // });
    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
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

  // onPause() {
  //   // if (!this.scene.isSleeping()) this.paused = true;
  // }

  // onWake() {
  //   // this.paused = false;
  // }

  isPaused() {
    return this.paused;
  }

  setSleepFlag(flag) {
    this.asleep = flag;
  }

  getSleepFlag() {
    return this.asleep;
  }
}

export class BaseBackgroundScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {}

  resize(gameSize, baseSize, displaySize, resolution) {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;
    if (width <= height) {
      sceneEvents.emit("rotate");
    } else {
      sceneEvents.emit("unRotate");
    }
  }

  updateCamera() {
    if (this.bg) {
      const width = this.scale.gameSize.width;
      const height = this.scale.gameSize.height;

      const camera = this.cameras.main;

      const scaleX = width / this.bg.width;
      const scaleY = height / this.bg.height;
      camera.setSize(width, height);
      camera.setZoom(Math.max(scaleX, scaleY));
      camera.centerOn(this.bg.width / 2, this.bg.height / 2);
    }
  }

  create() {
    this.scale.on("resize", this.resize, this);

    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;
    if (width <= height) {
      sceneEvents.emit("rotate");
    } else {
      sceneEvents.emit("unRotate");
    }
  }
}
