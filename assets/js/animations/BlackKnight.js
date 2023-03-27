import AnimationManager from "../helper/AnimationManager.js";

const getAnimationStates = await fetch(
  "resources/black-knight-animation-states.json"
);
const animationStates = await getAnimationStates.json();
const walkingAnimationStates = animationStates["black-knight"];
const battleReadyAnimationStates =
  animationStates["black-knight-battler-ready"];

const walkingSpriteImg = new Image();
walkingSpriteImg.src = walkingAnimationStates["img"];

const battleSpriteImg = new Image();
battleSpriteImg.src = battleReadyAnimationStates["img"];

const animationManager = new AnimationManager();

animationManager.addAnimation(
  "move-left",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["walkLeftFramesRow"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["lastWalkFramesCol"]
);
animationManager.addAnimation(
  "move-up",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["walkUpFramesRow"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["lastWalkFramesCol"]
);

animationManager.addAnimation(
  "move-right",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["walkRightFramesRow"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["lastWalkFramesCol"]
);

animationManager.addAnimation(
  "move-down",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["walkDownFramesRow"],
  walkingAnimationStates["initialFrameCol"],
  walkingAnimationStates["lastWalkFramesCol"]
);

animationManager.addAnimation(
  "idle-left",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["walkLeftFramesRow"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "idle-up",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["walkUpFramesRow"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "idle-right",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["walkRightFramesRow"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "idle-down",
  walkingSpriteImg,
  walkingAnimationStates["width"],
  walkingAnimationStates["height"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["walkDownFramesRow"],
  walkingAnimationStates["idleFrameCol"],
  walkingAnimationStates["idleFrameCol"]
);

animationManager.addAnimation(
  "battle-ready-weapon-left",
  battleSpriteImg,
  battleReadyAnimationStates["width"],
  battleReadyAnimationStates["height"],
  battleReadyAnimationStates["initialFrameCol"],
  battleReadyAnimationStates["swordIdleFramesRow"],
  battleReadyAnimationStates["initialFrameCol"],
  battleReadyAnimationStates["lastPositionFramesCol"]
);

animationManager.addAnimation(
  "battle-ready-weapon-right",
  battleSpriteImg,
  battleReadyAnimationStates["width"],
  battleReadyAnimationStates["height"],
  battleReadyAnimationStates["initialFrameCol"],
  battleReadyAnimationStates["swordIdleFramesRow"],
  battleReadyAnimationStates["initialFrameCol"],
  battleReadyAnimationStates["lastPositionFramesCol"],
  null,
  true
);

export default animationManager;
