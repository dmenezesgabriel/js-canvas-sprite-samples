import AnimationManager from "../helper/AnimationManager.js";

const getAnimationStates = await fetch(
  "resources/knights-animation-states.json"
);
const animationStates = await getAnimationStates.json();
const currentAnimationStates = animationStates["golden-knight"];

const characterSpriteImg = new Image();
characterSpriteImg.src = currentAnimationStates["img"];

const animationManager = new AnimationManager();

animationManager.addAnimation(
  "move-left",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["walkLeftFramesRow"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["lastWalkFramesCol"]
);
animationManager.addAnimation(
  "move-up",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["walkUpFramesRow"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["lastWalkFramesCol"]
);

animationManager.addAnimation(
  "move-right",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["walkRightFramesRow"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["lastWalkFramesCol"]
);

animationManager.addAnimation(
  "move-down",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["walkDownFramesRow"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["lastWalkFramesCol"]
);

animationManager.addAnimation(
  "idle-left",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["walkLeftFramesRow"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "idle-up",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["walkUpFramesRow"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "idle-right",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["walkRightFramesRow"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "idle-down",
  characterSpriteImg,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["walkDownFramesRow"],
  currentAnimationStates["idleFrameCol"],
  currentAnimationStates["idleFrameCol"]
);

export default animationManager;
