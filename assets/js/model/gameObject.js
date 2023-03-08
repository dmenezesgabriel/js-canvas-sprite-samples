export default class gameObject {
  constructor(x, y, width, height, speed, friction = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
}
