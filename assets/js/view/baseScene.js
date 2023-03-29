import World from "../model/World.js";

export default class BaseScene {
  constructor(game, display) {
    this.game = game;
    this.display = display;
    this.world = new World();
  }
}
