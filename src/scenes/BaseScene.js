import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);

    console.log("In BaseScene");
  }
  preload() {}

  create() {
    console.log("C:   In BaseScene");
    // window.addEventListener("resize", resize);
    // resize();
  }

  // resize() {
  //   var canvas = game.canvas,
  //     width =
  //       document.getElementsByClassName("parent-container")[0].offsetWidth,
  //     height = window.innerHeight;
  //   var wratio = width / height,
  //     ratio = canvas.width / canvas.height;
  //   if (wratio < ratio) {
  //     canvas.style.width = width + "px";
  //     canvas.style.height = width / ratio + "px";
  //   } else {
  //     canvas.style.width = height * ratio + "px";
  //     canvas.style.height = height + "px";
  //   }
  // }
}

export default BaseScene;
