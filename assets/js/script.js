const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 300);
const CANVAS_HEIGHT = (canvas.height = 300);

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

const sprites = [];

let fps, fpsInterval, startTime, now, then, elapsed;

const background = {
  img: backgroundImg,
  x: 0,
  y: 0,
  width: 1280,
  height: 720,
};

const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  leftEdge: function () {
    return this.x + this.width * 0.25;
  },
  topEdge: function () {
    return this.y + this.height * 0.25;
  },
  rightEdge: function () {
    return this.x + this.width * 0.75;
  },
  bottomEdge: function () {
    return this.y + this.height * 0.75;
  },
};

const player = {
  img: playerSpriteImg,
  x: currentCanvasSpawnPositionX,
  y: currentCanvasSpawnPositionY,
  width: charSpriteWidth,
  height: charSpriteHeight,
  frameX: initialXFrame,
  frameY: initialYFrame,
  speed: 10,
  moving: false,
};

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
  if (keys["w"] || keys["ArrowUp"]) {
    player.y -= player.speed;
    player.frameY = currentAnimationStates["upFramesY"];
    player.moving = true;
  }
  if (keys["a"] || keys["ArrowLeft"]) {
    player.x -= player.speed;
    player.frameY = currentAnimationStates["leftFramesY"];
    player.moving = true;
  }
  if (keys["s"] || keys["ArrowDown"]) {
    player.y += player.speed;
    player.frameY = currentAnimationStates["downFramesY"];
    player.moving = true;
  }
  if (keys["d"] || keys["ArrowRight"]) {
    player.x += player.speed;
    player.frameY = currentAnimationStates["rightFramesY"];
    player.moving = true;
  }

  // Player limits
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.width > background.width) {
    player.x = background.width - player.width;
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.y + player.height > background.height) {
    player.y = background.height - player.height;
  }

  // camera
  if (player.x < camera.leftEdge()) {
    camera.x = player.x - camera.width * 0.25;
  }
  if (player.x + player.width > camera.rightEdge()) {
    camera.x = player.x + player.width - camera.width * 0.75;
  }
  if (player.y < camera.topEdge()) {
    camera.y = player.y - camera.height * 0.25;
  }
  if (player.y + player.height > camera.bottomEdge()) {
    camera.y = player.y + player.height - camera.height * 0.75;
  }

  // Camera limits
  if (camera.x < 0) {
    camera.x = 0;
  }
  if (camera.x + camera.width > background.width) {
    camera.x = background.width - camera.width;
  }
  if (camera.y < 0) {
    camera.y = 0;
  }
  if (camera.y + camera.height > background.height) {
    camera.y = background.height - camera.height;
  }
}

function HandlePlayerFrame() {
  if (player.frameX < currentAnimationStates["endXFrames"] && player.moving)
    player.frameX++;
  else player.frameX = currentAnimationStates["initialXFrame"];
}

function render() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(-camera.x, -camera.y);
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
  ctx.restore();
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

startAnimating(10);
