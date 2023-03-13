import World from "../model/World.js";

export default class BaseScene {
  constructor(display) {
    this.display = display;
    this.world = new World();
  }
}
