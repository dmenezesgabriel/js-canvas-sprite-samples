import Position from "../model/Position.js";
import StatusBar from "../model/StatusBar.js";
import BaseScene from "./BaseScene.js";

export default class GameUI extends BaseScene {
  constructor(game) {
    super(game);
  }

  async create() {
    const healthBarPosition = new Position(5, 4);
    if (this.game.player.character) {
      this.healthBar = new StatusBar(
        healthBarPosition,
        150,
        8,
        this.game.player.character.health,
        "green"
      );

      const manaBarPosition = new Position(5, 12);
      this.manaBar = new StatusBar(
        manaBarPosition,
        150,
        8,
        this.game.player.character.mana,
        "blue"
      );
    }
  }

  update() {
    this.game.display.context.beginPath();
    this.game.display.context.strokeStyle = "#333";
    this.game.display.context.lineWidth = 1;
    this.game.display.context.fillStyle = "gray";
    this.game.display.context.fillRect(0, 0, 160, 25);
    this.game.display.context.strokeRect(0, 0, 160, 25);

    this.healthBar.value = this.game.player.character.health;
    this.healthBar.draw(this.game.display);
    this.manaBar.value = this.game.player.character.mana;
    this.manaBar.draw(this.game.display);
  }
}
