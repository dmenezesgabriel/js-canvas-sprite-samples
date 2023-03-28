import Character from "../model/Character.js";
import animationManager from "../animations/BlackKnight.js";
export default class BlackKnight extends Character {
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

  _draw(display) {
    display.drawObject(
      this.animationManager.currentAnimation.img,
      this.animationManager.currentAnimation.frameX,
      this.animationManager.currentAnimation.frameY,
      this.x,
      this.y,
      this._width,
      this._height,
      this.scaleSize,
      this.animationManager.currentAnimation.rotate,
      this.animationManager.currentAnimation.flip
    );
  }

  draw(display) {
    super.draw(display);
    this._draw(display);
  }

  moveLeft() {
    super.moveLeft();
    this._width = 26;
    this.animationManager.play("move-left");
  }

  moveUp() {
    super.moveUp();
    this._width = 26;
    this.animationManager.play("move-up");
  }

  moveRight() {
    super.moveRight();
    this._width = 26;
    this.animationManager.play("move-right");
  }

  moveDown() {
    super.moveDown();
    this._width = 26;
    this.animationManager.play("move-down");
  }

  idle() {
    super.idle();

    if (this._inBattle) {
      this._width = 48;
      switch (this.direction) {
        case "Left":
          this.animationManager.play("battle-ready-weapon-left");
          break;
        case "Right":
          this.animationManager.play("battle-ready-weapon-right");
          break;
        default:
          this.animationManager.play("battle-ready-weapon-right");
          break;
      }
      return;
    }

    this._width = 26;
    switch (this.direction) {
      case "Left":
        this.animationManager.play("idle-left");
        break;
      case "Up":
        this.animationManager.play("idle-up");
        break;
      case "Right":
        this.animationManager.play("idle-right");
        break;
      case "Down":
        this.animationManager.play("idle-down");
        break;
      default:
        this.animationManager.play("idle-down");
        break;
    }
  }

  attack() {
    console.log("Attack");
  }
}
