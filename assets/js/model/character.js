import GameObject from "./gameObject.js";

export default class Character extends GameObject {
  constructor(
    img,
    animationStates,
    x,
    y,
    width,
    height,
    spriteFrameCol,
    spriteFrameRow,
    speed,
    moving,
    friction = 1
  ) {
    super(
      img,
      x,
      y,
      width,
      height,
      spriteFrameCol,
      spriteFrameRow,
      speed,
      friction
    );
    this.animationStates = animationStates;
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
    this.spriteFrameRow = this.animationStates["leftFramesY"];
    this.moving = true;
  }

  moveUp() {
    this.y -= this._speed;
    this.spriteFrameRow = this.animationStates["upFramesY"];
    this.moving = true;
  }

  moveRight() {
    this.x += this._speed;
    this.spriteFrameRow = this.animationStates["rightFramesY"];
    this.moving = true;
  }

  moveDown() {
    this.y += this._speed;
    this.spriteFrameRow = this.animationStates["downFramesY"];
    this.moving = true;
  }

  handleFrame() {
    if (this.spriteFrameCol < this.animationStates["endXFrames"] && this.moving)
      this.spriteFrameCol++;
    else if (!this.moving) {
      this.spriteFrameCol = this.animationStates["idleXFrame"];
    } else {
      this.spriteFrameCol = this.animationStates["initialXFrame"];
    }
  }
}
