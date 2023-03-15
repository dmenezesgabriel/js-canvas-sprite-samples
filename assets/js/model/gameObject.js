import EventEmitter from "../helper/EventEmitter.js";

export default class GameObject extends EventEmitter {
  constructor(
    img,
    x,
    y,
    width,
    height,
    spriteFrameCol,
    spriteFrameRow,
    speed,
    friction = 0,
    scaleSize = 1,
    isColliding = false
  ) {
    super();
    this.img = img;
    this.x = x;
    this.y = y;
    this._nextX = this.x;
    this._nextY = this.y;
    this._width = width;
    this._height = height;
    this.spriteFrameCol = spriteFrameCol;
    this.spriteFrameRow = spriteFrameRow;
    this._speed = speed;
    this.friction = friction;
    this.scaleSize = scaleSize;
    this._isColliding = isColliding;
  }

  get nextX() {
    return this._nextX || this.x;
  }

  set nextX(value) {
    if (this._nextX != value) {
      this.emit("nextXChanged", [value]);
      this._nextX = value;
    }
  }

  get nextY() {
    return this._nextY || this.y;
  }

  set nextY(value) {
    if (this._nextY != value) {
      this.emit("nextYChanged", [value]);
      this._nextY = value;
    }
  }

  get height() {
    return this._height * this.scaleSize;
  }
  set height(value) {
    this._height = value;
  }

  get width() {
    return this._width * this.scaleSize;
  }

  set width(value) {
    this._width = value;
  }

  get speed() {
    return this._speed - this._speed * this.friction;
  }

  set speed(value) {
    this._speed = value;
  }

  get isColliding() {
    return this._isColliding;
  }

  set isColliding(value) {
    if (this._isColliding != value) {
      this.emit("isCollidingChanged", [value]);
      this._isColliding = value;
    }
  }

  get left() {
    return this.x;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width * this.scaleSize;
  }

  get bottom() {
    this.y + this.height * this.scaleSize;
  }

  draw(display) {
    display.drawObject(
      this.img,
      this._width * this.spriteFrameCol,
      this._height * this.spriteFrameRow,
      this.x,
      this.y,
      this._width,
      this._height,
      this.scaleSize
    );
  }
}
