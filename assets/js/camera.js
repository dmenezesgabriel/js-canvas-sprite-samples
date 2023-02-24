export default class Camera {
  constructor(target, map, x, y, width, height) {
    this.target = target;
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  leftEdge() {
    return this.x + this.width * 0.25;
  }
  topEdge() {
    return this.y + this.height * 0.25;
  }
  rightEdge() {
    return this.x + this.width * 0.75;
  }
  bottomEdge() {
    return this.y + this.height * 0.75;
  }

  update() {
    if (this.target.x < this.leftEdge()) {
      this.x = this.target.x - this.width * 0.25;
    }
    if (this.target.x + this.target.width > this.rightEdge()) {
      this.x = this.target.x + this.target.width - this.width * 0.75;
    }
    if (this.target.y < this.topEdge()) {
      this.y = this.target.y - this.height * 0.25;
    }
    if (this.target.y + this.target.height > this.bottomEdge()) {
      this.y = this.target.y + this.target.height - this.height * 0.75;
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
  }
}
