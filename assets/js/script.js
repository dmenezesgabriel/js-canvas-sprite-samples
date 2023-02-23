import Player from "./player.js";
import Camera from "./Camera.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
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

const charSpriteWidth = currentAnimationStates["width"];
const charSpriteHeight = currentAnimationStates["height"];
const initialXFrame = currentAnimationStates["initialXFrame"];
const initialYFrame = currentAnimationStates["initialYFrame"];

const currentCanvasSpawnPositionX = canvas.width / 2 - charSpriteWidth / 2;
const currentCanvasSpawnPositionY = canvas.height / 2 - charSpriteHeight / 2;

let fps, fpsInterval, startTime, now, then, elapsed;

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
  currentCanvasSpawnPositionX,
  currentCanvasSpawnPositionY,
  charSpriteWidth,
  charSpriteHeight,
  initialXFrame,
  initialYFrame,
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

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

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

function draw() {
  ctx.drawImage(
    background.img,
    0,
    0,
    background.width,
    background.height,
    0,
    0,
    background.width,
    background.height
  );
  drawSprite(
    player.img,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
}

function render() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(-camera.x, -camera.y);
  draw();
  ctx.restore();
}

function update() {
  player.update(keys);
  camera.update();
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    render();
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
