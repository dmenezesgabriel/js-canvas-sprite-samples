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
    this.animationManager.play("idle");
  }

  attack(direction) {
    console.log("Sword attack");
    this.direction = direction;
    this.ang = 10;
    setInterval(() => {
      this.animationManager.currentAnimation.rotate =
        ((this.ang += 5) * Math.PI) / 180;
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
