import { BaseBackgroundScene } from "./BaseScene";

export class TitleBackgroundScene extends BaseBackgroundScene {
    constructor() {
      super({ key: "titleBackgroundScene" }); 
    }
  
    preload() {

    }
  
    create() {
      this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
      this.updateCamera();
    }
  }
  