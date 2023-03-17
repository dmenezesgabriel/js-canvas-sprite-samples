import Animation from "./Animation.js";

export default class AnimationManager {
  constructor() {
    this.animations = {};
    this.currentAnimation = null;
  }

  addAnimation(
    key,
    img,
    frameWidth,
    frameHeight,
    frameCol,
    frameRow,
    start,
    end
  ) {
    const animation = new Animation(
      key,
      img,
      frameWidth,
      frameHeight,
      frameCol,
      frameRow,
      start,
      end
    );

    this.animations[key] = animation;
  }

  play(key) {
    this.currentAnimation = this.animations[key];
    this.currentAnimation.update();
  }
}
