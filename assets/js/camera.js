export default class Camera {
  constructor(player, map, x, y, width, height) {
    this.player = player;
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
    if (this.player.x < this.leftEdge()) {
      this.x = this.player.x - this.width * 0.25;
    }
    if (this.player.x + this.player.width > this.rightEdge()) {
      this.x = this.player.x + this.player.width - this.width * 0.75;
    }
    if (this.player.y < this.topEdge()) {
      this.y = this.player.y - this.height * 0.25;
    }
    if (this.player.y + this.player.height > this.bottomEdge()) {
      this.y = this.player.y + this.player.height - this.height * 0.75;
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
