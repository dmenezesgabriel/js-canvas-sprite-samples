import World from "../model/World.js";

export default class BaseScene {
  constructor(game) {
    this.game = game;
    this.world = new World();
  }
}
