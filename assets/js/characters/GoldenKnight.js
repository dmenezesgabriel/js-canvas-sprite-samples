import Battler from "../model/Battler.js";
import animationManager from "../animations/GoldenKnight.js";

class GoldenKnight extends Battler {
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
    animationManager.play("idle-down");
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

const getAnimationStates = await fetch(
  "resources/knights-animation-states.json"
);
const animationStates = await getAnimationStates.json();
const currentAnimationStates = animationStates["golden-knight"];

const characterSpriteImg = new Image();
characterSpriteImg.src = currentAnimationStates["img"];

const goldenKnight = new GoldenKnight(
  "Golden Knight",
  0,
  0,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  10,
  false,
  0,
  2
);

export { goldenKnight };
