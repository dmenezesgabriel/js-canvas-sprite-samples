import Battler from "../model/Battler.js";
import animationManager from "../animations/GoldenKnight.js";
export default class GoldenKnight extends Battler {
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
    super(
      name,
      x,
      y,
      width,
      height,
      speed,
      moving,
      friction,
      scaleSize,
      isColliding
    );
    this.animationManager = animationManager;
    this.idle();
  }

  draw(display) {
    super.draw(display);
    display.drawObject(
      this.animationManager.currentAnimation.img,
      this.animationManager.currentAnimation.frameX,
      this.animationManager.currentAnimation.frameY,
      this.x,
      this.y,
      this._width,
      this._height,
      this.scaleSize
    );
  }

  moveLeft() {
    super.moveLeft();
    this.animationManager.play("move-left");
  }

  moveUp() {
    super.moveUp();
    this.animationManager.play("move-up");
  }

  moveRight() {
    super.moveRight();
    this.animationManager.play("move-right");
  }

  moveDown() {
    super.moveDown();
    this.animationManager.play("move-down");
  }

  idle() {
    super.idle();
    this.animationManager.play("idle-down");
  }
}
