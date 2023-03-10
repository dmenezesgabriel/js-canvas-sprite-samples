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

  handleMove(targetX, targetY, targetWidth, targetHeight) {
    if (targetX < this.leftEdge()) {
      this.x = targetX - this.width * 0.25;
    }
    if (targetX + targetWidth > this.rightEdge()) {
      this.x = targetX + targetWidth - this.width * 0.75;
    }
    if (targetY < this.topEdge()) {
      this.y = targetY - this.height * 0.25;
    }
    if (targetY + targetHeight > this.bottomEdge()) {
      this.y = targetY + targetHeight - this.height * 0.75;
    }
  }

  handleMapLimits(mapWidth, mapHeight) {
    // Limits
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > mapWidth) {
      this.x = mapWidth - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > mapHeight) {
      this.y = mapHeight - this.height;
    }
  }

  update(targetX, targetY, targetWidth, targetHeight, mapWidth, mapHeight) {
    this.handleMove(targetX, targetY, targetWidth, targetHeight);
    this.handleMapLimits(mapWidth, mapHeight);
  }
}
