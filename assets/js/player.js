export default class Player {
  constructor(
    img,
    animationStates,
    map,
    x,
    y,
    width,
    height,
    frameX,
    frameY,
    speed,
    moving
  ) {
    this.img = img;
    this.animationStates = animationStates;
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.speed = speed;
    this.moving = moving;
  }

  handleFrame() {
    if (this.frameX < this.animationStates["endXFrames"] && this.moving)
      this.frameX++;
    else if (!this.moving) {
      this.frameX = this.animationStates["stationaryXFrame"];
    } else {
      this.frameX = this.animationStates["initialXFrame"];
    }
  }

  update(keys) {
    if (keys["w"] || keys["ArrowUp"]) {
      this.y -= this.speed;
      this.frameY = this.animationStates["upFramesY"];
      this.moving = true;
    }
    if (keys["a"] || keys["ArrowLeft"]) {
      this.x -= this.speed;
      this.frameY = this.animationStates["leftFramesY"];
      this.moving = true;
    }
    if (keys["s"] || keys["ArrowDown"]) {
      this.y += this.speed;
      this.frameY = this.animationStates["downFramesY"];
      this.moving = true;
    }
    if (keys["d"] || keys["ArrowRight"]) {
      this.x += this.speed;
      this.frameY = this.animationStates["rightFramesY"];
      this.moving = true;
    }

    // Limits
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.map.width) {
      this.x = this.map.width - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > this.map.height) {
      this.y = this.map.height - this.height;
    }

    this.handleFrame();
  }
}
