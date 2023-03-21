import Character from "../model/Character.js";
import animationManager from "../animations/GoldenKnight.js";
import Sword from "../weapons/Sword.js";
export default class GoldenKnight extends Character {
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

    this.weapon = new Sword(
      "sword",
      this.x,
      this.y,
      16,
      16,
      0,
      false,
      0,
      3,
      false
    );
  }

  draw(display) {
    super.draw(display);

    if (["Left", "Right"].includes(this.direction)) {
      this.weapon.draw(display);
    }

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

    if (this.direction === "Up") {
      this.weapon.draw(display);
    }
  }

  moveLeft() {
    super.moveLeft();

    this.weapon.x = this.x + this.width * 0.75;
    this.weapon.y = this.y + this.height * 0.6;

    this.animationManager.play("move-left");
  }

  moveUp() {
    super.moveUp();

    this.weapon.x = this.x + this.width * 0.48;
    this.weapon.y = this.y + this.height * 0.6;

    this.animationManager.play("move-up");
  }

  moveRight() {
    super.moveRight();

    this.weapon.x = this.x + this.width * 0.2;
    this.weapon.y = this.y + this.height * 0.6;

    this.animationManager.play("move-right");
  }

  moveDown() {
    super.moveDown();
    this.animationManager.play("move-down");
  }

  idle() {
    super.idle();
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
    }
  }

  attack() {
    console.log("Attacking");
    this.weapon.attack(this.direction);
  }
}
