import Item from "../model/Item.js";

export default class Weapon extends Item {
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
