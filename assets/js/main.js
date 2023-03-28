import JungleScene from "./view/jungleScene.js";
import PlayerController from "./controller/PlayerController.js";
import Display from "./helper/Display.js";
import Camera from "./model/camera.js";
import CameraController from "./controller/CameraController.js";

class Game {
  constructor(fpsInterval, startTime, now, then, elapsed) {
    this.fpsInterval = fpsInterval;
    this.startTime = startTime;
    this.now = now;
    this.then = then;
    this.elapsed = elapsed;
    this.canvas = document.getElementById("canvas1");
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);
    this.cameraController = new CameraController();
    this.display = new Display(this.canvas, true);
    this.playerController = new PlayerController();
    this.frame = this.update.bind(this);
  }

  create() {
    this.playerController.init();
    this.currentScene = new JungleScene(
      this.display,
      this.camera,
      this.cameraController,
      this.playerController
    );

    this.display.on("mousedown", (x, y) => {
      console.log("Clicked", "x: ", x, " y: ", y);
    });
  }

  update() {
    window.requestAnimationFrame(this.frame);
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.currentScene.update();
    }
  }

  async start(fps) {
    this.create();

    await this.currentScene.create();

    this.fpsInterval = 1000 / fps; // calculate milliseconds
    this.then = Date.now();
    this.startTime = this.then;
    this.update();
  }
}

const game = new Game();
game.start(10);
