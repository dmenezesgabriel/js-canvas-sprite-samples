export default class Camera {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  }
  leftEdge() {
    return this.position.x + this.width * 0.25;
  }
  topEdge() {
    return this.position.y + this.height * 0.25;
  }
  rightEdge() {
    return this.position.x + this.width * 0.75;
  }
  bottomEdge() {
    return this.position.y + this.height * 0.75;
  }
}
