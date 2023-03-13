import GameObject from "./GameObject.js";

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
    friction = 0,
    scaleSize,
    isColliding = false
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
      friction,
      scaleSize,
      isColliding
    );
    this.animationStates = animationStates;
    this.moving = moving;
    this.isBody = true;
  }

  get collisionX() {
    return this.x + this.width * 0.3;
  }

  get collisionY() {
    return this.y + this.height * 0.7;
  }

  get collisionWidth() {
    return this.width - this.width * 0.6;
  }

  get collisionHeight() {
    return this.height - this.height * 0.7;
  }

  moveLeft() {
    this.x -= this._speed;
    this.spriteFrameRow = this.animationStates["walkLeftFramesRow"];
    this.moving = true;
  }

  moveUp() {
    this.y -= this._speed;
    this.spriteFrameRow = this.animationStates["walkUpFramesRow"];
    this.moving = true;
  }

  moveRight() {
    this.x += this._speed;
    this.spriteFrameRow = this.animationStates["walkRightFramesRow"];
    this.moving = true;
  }

  moveDown() {
    this.y += this._speed;
    this.spriteFrameRow = this.animationStates["walkDownFramesRow"];
    this.moving = true;
  }

  handleFrame() {
    if (
      this.spriteFrameCol < this.animationStates["lastWalkFramesCol"] &&
      this.moving
    )
      this.spriteFrameCol++;
    else if (!this.moving) {
      this.spriteFrameCol = this.animationStates["idleFrameCol"];
    } else {
      this.spriteFrameCol = this.animationStates["initialFrameCol"];
    }
  }
}
