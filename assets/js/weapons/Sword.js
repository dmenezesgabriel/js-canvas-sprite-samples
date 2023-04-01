import Weapon from "../model/Weapon.js";
import animationManager from "../animations/Sword.js";

export default class Sword extends Weapon {
  constructor(
    name,
    position,
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
      position,
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
    const cachedX = this.position.x;
    const cachedY = this.position.y;
    this.direction = direction;

    switch (this.direction) {
      case "Left":
        this.position.y += 5;
        this.position.x -= 40;

        this.animationManager.play("left");
        break;
      case "Up":
        this.animationManager.play("up");
        break;
      case "Right":
        this.position.y += 5;
        this.position.x += 40;

        this.animationManager.play("right");
        break;
      case "Down":
        this.animationManager.play("down");
        break;
      default:
    }

    setTimeout(() => {
      animationManager.play("down");
      this.position.x = cachedX;
      this.position.y = cachedY;
      this.moving = false;
    }, 200);
  }

  draw(display) {
    display.drawObject(
      this.animationManager.currentAnimation.img,
      this.animationManager.currentAnimation.frameX,
      this.animationManager.currentAnimation.frameY,
      this.position.x,
      this.position.y,
      this._width,
      this._height,
      this.scaleSize,
      this.animationManager.currentAnimation.rotate
    );
  }
}
