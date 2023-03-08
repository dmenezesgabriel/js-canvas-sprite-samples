import GameObject from "./gameObject.js";

export default class Character extends GameObject {
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
    super(x, y, width, height, speed, friction);
    this.img = img;
    this.animationStates = animationStates;
    this.frameX = frameX;
    this.frameY = frameY;
    this.moving = moving;
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

  moveLeft() {
    this.x -= this._speed;
    this.frameY = this.animationStates["leftFramesY"];
    this.moving = true;
  }

  moveUp() {
    this.y -= this._speed;
    this.frameY = this.animationStates["upFramesY"];
    this.moving = true;
  }

  moveRight() {
    this.x += this._speed;
    this.frameY = this.animationStates["rightFramesY"];
    this.moving = true;
  }

  moveDown() {
    this.y += this._speed;
    this.frameY = this.animationStates["downFramesY"];
    this.moving = true;
  }

  handleFrame() {
    if (this.frameX < this.animationStates["endXFrames"] && this.moving)
      this.frameX++;
    else if (!this.moving) {
      this.frameX = this.animationStates["idleXFrame"];
    } else {
      this.frameX = this.animationStates["initialXFrame"];
    }
  }
}
