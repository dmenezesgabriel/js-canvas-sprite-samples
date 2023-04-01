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
    this._movingWidth = 26;
    this._movingHeight = 36;
    this._battlingWidth = 48;
    this._battlingHeight = 48;
    this._attackingWidth = 48;
    this.animationManager = animationManager;
    this.idle();
  }

  _draw(display) {
    display.drawObject(
      this.animationManager.currentAnimation.img,
      this.animationManager.currentAnimation.frameX,
      this.animationManager.currentAnimation.frameY,
      this.position.x,
      this.position.y,
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
    this._width = this._movingWidth;
    this._height = this._movingHeight;
    this.animationManager.play("move-left");
  }

  moveUp() {
    super.moveUp();
    this._width = this._movingWidth;
    this._height = this._movingHeight;
    this.animationManager.play("move-up");
  }

  moveRight() {
    super.moveRight();
    this._width = this._movingWidth;
    this._height = this._movingHeight;
    this.animationManager.play("move-right");
  }

  moveDown() {
    super.moveDown();
    this._width = this._movingWidth;
    this._height = this._movingHeight;
    this.animationManager.play("move-down");
  }

  idle() {
    super.idle();

    if (this._inBattle) {
      this._width = this._battlingWidth;
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

    this._width = this._movingWidth;
    this._height = this._movingHeight;
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
    super.attack();
    this._width = this._attackingWidth;
    this._height = this._battlingHeight;
    switch (this.direction) {
      case "Left":
        this.animationManager.play("light-attack-sword-left");
        break;
      case "Right":
        this.animationManager.play("light-attack-sword-right");
        break;
      default:
        this.animationManager.play("light-attack-sword-right");
        break;
    }
  }
}
