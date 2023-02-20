const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 500);

const keys = [];
const moveKeys = ["w", "a", "s", "d"];
const maxCharFrames = 2; // 0, 1, 2
const charSpriteWidth = 52;
const charSpriteHeight = 72;
const currentSpawnPositionX = 250;
const currentSpawnPositionY = 250;

const player = {
  x: currentSpawnPositionX,
  y: currentSpawnPositionY,
  width: charSpriteWidth,
  height: charSpriteHeight,
  frameX: 0,
  frameY: 0,
  speed: 10,
  moving: false,
};

const playerSprite = new Image();
playerSprite.src = "assets/img/knights_2x.png";
const background = new Image();
background.src = "assets/img/tileset.png";

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
  if (keys["w"] && player.y > 100) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys["a"] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keys["s"] && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys["d"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

function HandlePlayerFrame() {
  if (player.frameX < maxCharFrames && player.moving) player.frameX++;
  else player.frameX = 1;
}

let fps, fpsInterval, starTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps; // calculate milliseconds
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
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
    movePLayer();
    HandlePlayerFrame();
  }
}
startAnimating(10);
