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
    this.isAttacking = false;
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

  _draw(display) {
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

  draw(display) {
    super.draw(display);

    if (["Left", "Right"].includes(this.direction)) {
      this.weapon.draw(display);
      this._draw(display);
    } else if (this.direction === "Up") {
      this._draw(display);
      this.weapon.draw(display);
    } else {
      this._draw(display);
    }
  }

  idleWeaponLeft() {
    this.weapon.x = this.x + this.width * 0.75;
    this.weapon.y = this.y + this.height * 0.6;
  }

  idleWeaponRight() {
    this.weapon.x = this.x + this.width * 0.2;
    this.weapon.y = this.y + this.height * 0.6;
  }

  idleWeaponUp() {
    this.weapon.x = this.x + this.width * 0.48;
    this.weapon.y = this.y + this.height * 0.6;
  }

  moveLeft() {
    super.moveLeft();
    this.idleWeaponLeft();
    this.animationManager.play("move-left");
  }

  moveUp() {
    super.moveUp();
    this.idleWeaponUp();
    this.animationManager.play("move-up");
  }

  moveRight() {
    super.moveRight();
    this.idleWeaponRight();
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
        this.idleWeaponLeft();
        break;
      case "Up":
        this.animationManager.play("idle-up");
        this.idleWeaponUp();
        break;
      case "Right":
        this.animationManager.play("idle-right");
        this.idleWeaponRight();
        break;
      case "Down":
        this.animationManager.play("idle-down");
        break;
      default:
        this.animationManager.play("idle-down");
    }
  }

  attack() {
    if (this.isAttacking) return;
    const cachedX = this.x;
    const cachedY = this.y;

    this.isAttacking = true;
    this.weapon.attack(this.direction);
    switch (this.direction) {
      case "Left":
        this.x -= 5;
        this.animationManager.play("move-left");
        break;
      case "Up":
        this.animationManager.play("move-up");
        break;
      case "Right":
        this.x += 5;
        this.animationManager.play("move-right");
        break;
      case "Down":
        this.animationManager.play("move-down");
        break;
      default:
        this.animationManager.play("move-down");
    }

    setTimeout(() => {
      this.isAttacking = false;
      this.x = cachedX;
      this.y = cachedY;
    }, 100);
  }
}
