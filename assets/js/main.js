import Game from "./game.js";

let fpsInterval, startTime, now, then, elapsed;
const game = new Game();

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
