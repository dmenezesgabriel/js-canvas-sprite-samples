import AnimationManager from "../helper/AnimationManager.js";

const swordSpriteImg = new Image();
swordSpriteImg.src = "assets/img/tficons_limited_16.png";

const animationManager = new AnimationManager();

animationManager.addAnimation(
  "down",
  swordSpriteImg,
  16,
  16,
  0,
  27,
  0,
  0,
  (Math.PI / 180) * 135
);

animationManager.addAnimation(
  "right",
  swordSpriteImg,
  16,
  16,
  0,
  27,
  0,
  0,
  (Math.PI / 180) * 45
);

animationManager.addAnimation(
  "left",
  swordSpriteImg,
  16,
  16,
  0,
  27,
  0,
  0,
  (Math.PI / 180) * -135
);

animationManager.addAnimation(
  "up",
  swordSpriteImg,
  16,
  16,
  0,
  27,
  0,
  0,
  (Math.PI / 180) * -45
);

export default animationManager;
