import Game from "./game.js";
import Controller from "./controller.js";
import Display from "./display.js";
import Camera from "./Camera.js";

let fpsInterval, startTime, now, then, elapsed;

const canvas = document.getElementById("canvas1");
canvas.width = 500;
canvas.height = 500;

const display = new Display(canvas);

const camera = new Camera(0, 0, canvas.width, canvas.height);

const controller = new Controller();
controller.init();

const game = new Game(display, camera, controller);

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    game.update();
  }
}

async function startGame(fps) {
  // center camera

  await game.create();

  fpsInterval = 1000 / fps; // calculate milliseconds
  then = Date.now();
  startTime = then;
  gameLoop();
}

await startGame(10);
