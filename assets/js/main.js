import Player from "./player.js";
import Camera from "./Camera.js";
import Display from "./display.js";

const canvas = document.getElementById("canvas1");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 500);

const keys = [];
const moveKeys = [
  "w",
  "a",
  "s",
  "d",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

const getAnimationStates = await fetch(
  "resources/knights-animation-states.json"
);
const animationStates = await getAnimationStates.json();

const currentAnimationStates = animationStates["golden-knight"];

const playerSpriteImg = new Image();
playerSpriteImg.src = currentAnimationStates["img"];
const backgroundImg = new Image();
backgroundImg.src = "assets/img/background.jpg";

let fps, fpsInterval, startTime, now, then, elapsed;

const display = new Display(canvas);

const background = {
  img: backgroundImg,
  x: 0,
  y: 0,
  width: 1280,
  height: 720,
};

const player = new Player(
  playerSpriteImg,
  currentAnimationStates,
  background,
  canvas.width / 2 - currentAnimationStates["width"] / 2,
  canvas.height / 2 - currentAnimationStates["height"] / 2,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["initialXFrame"],
  currentAnimationStates["initialYFrame"],
  10,
  false
);

const camera = new Camera(
  player,
  background,
  0,
  0,
  canvas.width,
  canvas.height
);

window.addEventListener("keydown", function (e) {
  keys[e.key] = true;
  if (moveKeys.includes(e.key)) {
    player.moving = true;
  }
});

window.addEventListener("keyup", function (e) {
  delete keys[e.key];
  if (moveKeys.includes(e.key)) {
    player.moving = false;
  }
});

function update() {
  const sprites = [];
  sprites.push({
    image: background.img,
    sourceX: 0,
    sourceY: 0,
    destinationX: 0,
    destinationY: 0,
    width: background.width,
    height: background.height,
  });
  sprites.push({
    image: player.img,
    sourceX: player.width * player.frameX,
    sourceY: player.height * player.frameY,
    destinationX: player.x,
    destinationY: player.y,
    width: player.width,
    height: player.height,
  });
  display.render(sprites, camera);
  player.update(keys);
  camera.update();
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    update();
  }
}

function startGame(fps) {
  // center camera
  camera.x = (background.width - camera.width) / 2;
  camera.y = (background.height - camera.height) / 2;
  player.x = (background.width - camera.width) / 2;
  player.y = (background.height - camera.height) / 2;

  fpsInterval = 1000 / fps; // calculate milliseconds
  then = Date.now();
  startTime = then;
  gameLoop();
}

startGame(10);
