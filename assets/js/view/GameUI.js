import BaseScene from "./BaseScene.js";

export default class GameUI extends BaseScene {
  constructor(display) {
    super(display);
  }

  async create() {}

  update() {
    this.display.context.beginPath();
    this.display.context.lineWidth = 2;
    this.display.context.strokeStyle = "red";
    this.display.context.rect(0, 0, 150, 20);
    this.display.context.stroke();
  }
}
