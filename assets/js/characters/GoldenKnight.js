import Character from "../model/Character.js";

const getAnimationStates = await fetch(
  "resources/knights-animation-states.json"
);
const animationStates = await getAnimationStates.json();
const currentAnimationStates = animationStates["golden-knight"];

const characterSpriteImg = new Image();
characterSpriteImg.src = currentAnimationStates["img"];

const goldenKnight = new Character(
  characterSpriteImg,
  currentAnimationStates,
  0,
  0,
  currentAnimationStates["width"],
  currentAnimationStates["height"],
  currentAnimationStates["initialFrameCol"],
  currentAnimationStates["initialYFrame"],
  10,
  false,
  0,
  2
);

export { goldenKnight };
