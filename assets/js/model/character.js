import GameObject from "./GameObject.js";
import drawName from "../utils/drawName.js";

export default class Character extends GameObject {
  constructor(
    name,
    x,
    y,
    width,
    height,
    speed,
    moving,
    friction = 0,
    scaleSize,
    isColliding = false
  ) {
    super(x, y, width, height, speed, friction, scaleSize, isColliding);
    this.name = name;
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

  draw(display) {
    drawName(display, this.x + this.width / 2, this.y, this.name, "#fff");
  }

  moveLeft() {
    this.x -= this._speed;
    this.moving = true;
  }

  moveUp() {
    this.y -= this._speed;
    this.moving = true;
  }

  moveRight() {
    this.x += this._speed;
    this.moving = true;
  }

  moveDown() {
    this.y += this._speed;
    this.moving = true;
  }

  idle() {}
}
