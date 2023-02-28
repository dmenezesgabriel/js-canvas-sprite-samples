export default class Player {
  constructor(
    img,
    animationStates,
    x,
    y,
    width,
    height,
    frameX,
    frameY,
    speed,
    moving,
    friction = 1
  ) {
    this.img = img;
    this.animationStates = animationStates;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this._speed = speed * friction;
    this.moving = moving;
  }

  getSpeed() {
    return this._speed;
  }

  setSpeed(value) {
    this._speed = value * this.friction;
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

  handleMove(keys) {
    let newX = this.x;
    let newY = this.y;
    let isMoving = this.moving;
    let newFrameY = this.frameY;

    if (keys["w"] || keys["ArrowUp"]) {
      //  check if can move before assign
      this.y -= this._speed;
      this.frameY = this.animationStates["upFramesY"];
      this.moving = true;
    }
    if (keys["a"] || keys["ArrowLeft"]) {
      //  check if can move before assign
      this.x -= this._speed;
      this.frameY = this.animationStates["leftFramesY"];
      this.moving = true;
    }
    if (keys["s"] || keys["ArrowDown"]) {
      //  check if can move before assign
      this.y += this._speed;
      this.frameY = this.animationStates["downFramesY"];
      this.moving = true;
    }
    //  check if can move before assign
    if (keys["d"] || keys["ArrowRight"]) {
      this.x += this._speed;
      this.frameY = this.animationStates["rightFramesY"];
      this.moving = true;
    }
  }

  handleMapLimits(mapWidth, mapHeight) {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > mapWidth) {
      this.x = mapWidth - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > mapHeight) {
      this.y = mapHeight - this.height;
    }
  }

  update(keys, mapWidth, mapHeight) {
    this.handleMove(keys);
    this.handleMapLimits(mapWidth, mapHeight);
    this.handleFrame();
  }
}
