export default class Camera {
  constructor(x, y, width, height) {
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
}
