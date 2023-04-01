import DynamicBody from "./DynamicBody.js";

export default class Item extends DynamicBody {
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
  }
}
