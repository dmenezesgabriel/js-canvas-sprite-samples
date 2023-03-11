export default class GameObject {
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
    this.img = img;
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
    this.spriteFrameCol = spriteFrameCol;
    this.spriteFrameRow = spriteFrameRow;
    this._speed = speed;
    this.friction = friction;
    this.scaleSize = scaleSize;
    this._isColliding = isColliding;
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
    this._isColliding = value;
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
