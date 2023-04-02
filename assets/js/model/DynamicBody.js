import GameObject from "./GameObject.js";
import Direction from "../enum/Direction.js";

export default class DynamicBody extends GameObject {
  constructor(
    name,
    position,
    width,
    height,
    speed,
    moving,
    friction = 0,
    scaleSize,
    isColliding = false
  ) {
    super(position, width, height, scaleSize);
    this.name = name;
    this.moving = moving;
    this._speed = speed;
    this.friction = friction;
    this.isBody = true;
    this.direction = null;
    this.orientation = null;
    this._isColliding = isColliding;
    this.colliders = [];
  }

  get speed() {
    return this._speed - this._speed * this.friction;
  }

  set speed(value) {
    this._speed = value;
  }

  get collisionX() {
    return this.position.x + this.width * 0.3;
  }

  get collisionY() {
    return this.position.y + this.height * 0.7;
  }

  get collisionWidth() {
    return this.width - this.width * 0.6;
  }

  get collisionHeight() {
    return this.height - this.height * 0.7;
  }

  get isColliding() {
    return this._isColliding;
  }

  set isColliding(value) {
    if (this._isColliding != value) {
      this._isColliding = value;
      this.emit("isCollidingChanged");
    }
  }

  moveLeft() {
    this.orientation = this.direction = Direction.Left;
    this.position.x -= this._speed;
    this.moving = true;
  }

  moveUp() {
    this.direction = Direction.Up;
    this.position.y -= this._speed;
    this.moving = true;
  }

  moveRight() {
    this.orientation = this.direction = Direction.Right;
    this.position.x += this._speed;
    this.moving = true;
  }

  moveDown() {
    this.direction = Direction.Down;
    this.position.y += this._speed;
    this.moving = true;
  }

  idle() {}
}
