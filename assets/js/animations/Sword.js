import AnimationManager from "../helper/AnimationManager.js";

const swordSpriteImg = new Image();
swordSpriteImg.src = "assets/img/tficons_limited_16.png";

const animationManager = new AnimationManager();

animationManager.addAnimation(
  "idle",
  swordSpriteImg,
  16,
  16,
  0,
  27,
  0,
  0,
  (Math.PI / 180) * 135
);

export default animationManager;
