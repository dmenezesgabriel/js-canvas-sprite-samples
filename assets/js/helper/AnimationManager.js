export default class AnimationManager {
  constructor() {
    this.animations = {};
    this.currentAnimation = null;
  }

  play(key) {
    this.currentAnimation = this.animations[key];
    this.currentAnimation.update();
  }
}
