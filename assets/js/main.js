import JungleScene from "./view/jungleScene.js";
import PlayerController from "./controller/PlayerController.js";
import Display from "./helper/Display.js";
import Camera from "./model/camera.js";
import CameraController from "./controller/CameraController.js";
import GameUI from "./view/GameUI.js";
import Player from "./model/Player.js";

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
    this.scenes = [];
    this.player = null;
  }

  create() {
    this.player = new Player();
    this.playerController.init();

    const jungleScene = new JungleScene(this);
    const gameUI = new GameUI(this);

    this.scenes.push({
      name: "jungle",
      isActive: true,
      sceneObject: jungleScene,
      order: 0,
    });

    this.scenes.push({
      name: "gameUI",
      isActive: true,
      sceneObject: gameUI,
      order: 1,
    });
  }

  update() {
    window.requestAnimationFrame(this.frame);
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      const activeScenes = this.scenes.filter(
        (scene) => scene.isActive === true
      );
      activeScenes.sort((a, b) => a.order - b.order);

      for (const scene of activeScenes) {
        scene.sceneObject.update();
      }
    }
  }

  async start(fps) {
    this.create();

    const activeScenes = this.scenes.filter((scene) => scene.isActive === true);

    activeScenes.sort((a, b) => a.order - b.order);

    for (const scene of activeScenes) {
      await scene.sceneObject.create();
    }

    this.fpsInterval = 1000 / fps; // calculate milliseconds
    this.then = Date.now();
    this.startTime = this.then;
    this.update();
  }
}

const game = new Game();
game.start(10);
