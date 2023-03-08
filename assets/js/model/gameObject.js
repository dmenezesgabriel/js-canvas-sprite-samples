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
    friction = 1
  ) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spriteFrameCol = spriteFrameCol;
    this.spriteFrameRow = spriteFrameRow;
    this._speed = speed;
    this.friction = friction;
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

  draw(display) {
    display.drawObject(
      this.img,
      this.width * this.spriteFrameCol,
      this.height * this.spriteFrameRow,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
