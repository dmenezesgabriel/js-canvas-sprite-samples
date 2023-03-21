import Weapon from "../model/Weapon.js";
import animationManager from "../animations/Sword.js";

export default class Sword extends Weapon {
  constructor(
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
    this.animationManager.play("down");
  }

  attack(direction) {
    if (this.moving) return;
    this.moving = true;
    const cachedX = this.x;
    const cachedY = this.y;
    this.direction = direction;

    switch (this.direction) {
      case "Left":
        this.y += 5;
        this.x -= 40;

        this.animationManager.play("left");
        break;
      case "Up":
        this.animationManager.play("up");
        break;
      case "Right":
        this.y += 5;
        this.x += 40;

        this.animationManager.play("right");
        break;
      case "Down":
        this.animationManager.play("down");
        break;
      default:
    }

    setTimeout(() => {
      animationManager.play("down");
      this.x = cachedX;
      this.y = cachedY;
      this.moving = false;
    }, 200);
  }

  draw(display) {
    display.drawObject(
      this.animationManager.currentAnimation.img,
      this.animationManager.currentAnimation.frameX,
      this.animationManager.currentAnimation.frameY,
      this.x,
      this.y,
      this._width,
      this._height,
      this.scaleSize,
      this.animationManager.currentAnimation.rotate
    );
  }
}
