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

  getLeft() {
    return this.x;
  }

  getTop() {
    return this.y;
  }

  getRight() {
    return this.x + this.width;
  }

  getBottom() {
    this.y + this.height;
  }

  getCollisionX() {
    return this.x + this.width * 0.3;
  }

  getCollisionY() {
    return this.y + this.height * 0.7;
  }

  getCollisionWidth() {
    return this.width - this.width * 0.6;
  }

  getCollisionHeight() {
    return this.height - this.height * 0.7;
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

  handleMove(keys, playerCollide) {
    if (playerCollide) {
      return;
    }
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

  update(keys, mapWidth, mapHeight, playerCollide) {
    this.handleMove(keys, playerCollide);
    this.handleMapLimits(mapWidth, mapHeight);
    this.handleFrame();
  }
}
