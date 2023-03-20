import DynamicBody from "./DynamicBody.js";

export default class Item extends DynamicBody {
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
  }
}
