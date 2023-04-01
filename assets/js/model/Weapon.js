import Item from "../model/Item.js";

export default class Weapon extends Item {
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
