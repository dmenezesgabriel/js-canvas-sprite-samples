const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
const BACKGROUND_WIDTH = 400;
const BACKGROUND_HEIGHT = 300;

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

const charSpriteWidth = currentAnimationStates["width"];
const charSpriteHeight = currentAnimationStates["height"];
const initialXFrame = currentAnimationStates["initialXFrame"];
const initialYFrame = currentAnimationStates["initialYFrame"];

const currentCanvasSpawnPositionX = 250;
const currentCanvasSpawnPositionY = 250;

const player = {
  x: currentCanvasSpawnPositionX,
  y: currentCanvasSpawnPositionY,
  width: charSpriteWidth,
  height: charSpriteHeight,
  frameX: initialXFrame,
  frameY: initialYFrame,
  speed: 10,
  moving: false,
};

const playerSprite = new Image();
playerSprite.src = currentAnimationStates["img"];
const background = new Image();
background.src = "assets/img/tileset.png";

let fps, fpsInterval, startTime, now, then, elapsed;

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

function movePLayer() {
  // move up without crossing screen limits
  if ((keys["w"] || keys["ArrowUp"]) && player.y > 0) {
    player.y -= player.speed;
    player.frameY = currentAnimationStates["upFramesY"];
    player.moving = true;
  }
  if ((keys["a"] || keys["ArrowLeft"]) && player.x > 0) {
    player.x -= player.speed;
    player.frameY = currentAnimationStates["leftFramesY"];
    player.moving = true;
  }
  if (
    (keys["s"] || keys["ArrowDown"]) &&
    player.y < canvas.height - player.height
  ) {
    player.y += player.speed;
    player.frameY = currentAnimationStates["downFramesY"];
    player.moving = true;
  }
  if (
    (keys["d"] || keys["ArrowRight"]) &&
    player.x < canvas.width - player.width
  ) {
    player.x += player.speed;
    player.frameY = currentAnimationStates["rightFramesY"];
    player.moving = true;
  }
}

function HandlePlayerFrame() {
  if (player.frameX < currentAnimationStates["endXFrames"] && player.moving)
    player.frameX++;
  else player.frameX = currentAnimationStates["initialXFrame"];
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    background,
    0,
    0,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
    0,
    0,
    canvas.width,
    canvas.height
  );
  drawSprite(
    playerSprite,
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

function update() {
  movePLayer();
  HandlePlayerFrame();
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

function startAnimating(fps) {
  fpsInterval = 1000 / fps; // calculate milliseconds
  then = Date.now();
  startTime = then;
  gameLoop();
}

startAnimating(10);
