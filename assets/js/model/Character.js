import DynamicBody from "./DynamicBody.js";
import StatusBar from "./StatusBar.js";
import drawName from "../utils/drawName.js";

export default class Character extends DynamicBody {
  constructor(
    name,
    x,
    y,
    width,
    height,
    speed,
    moving,
    friction = 0,
    scaleSize,
    isColliding = false,
    items
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
    this.isAttacking = false;
    this._inBattle = false;
    this._health = 100;
    this._mana = 100;
    this.items = items;
    this.setupStatusBars();
  }

  set inBattle(value) {
    this._inBattle = value;
    setTimeout(() => {
      if (this._inBattle) {
        this._inBattle = false;
      }
    }, 5000);
  }

  setupStatusBars() {
    this.healthBar = new StatusBar(
      this.x + 2,
      this.y + this.height + 3,
      this.width - 4,
      8,
      this._health,
      "green"
    );
    this.manaBar = new StatusBar(
      this.x + 2,
      this.y + this.height + 3 + 8,
      this.width - 4,
      8,
      this._health,
      "blue"
    );
  }

  get health() {
    return this._health;
  }

  get mana() {
    return this._mana;
  }

  set health(value) {
    this._health = value;

    this.healthBar.value = value;
  }

  set mana(value) {
    this._mana = value;

    this.manaBar.value = value;
  }

  attack() {
    // Not Implemented
  }

  draw(display) {
    drawName(display, this.x + this.width / 2, this.y - 5, this.name, "#fff");
    this.healthBar.x = this.x + this.width / 2 - this.healthBar.maxWidth / 2;
    this.healthBar.y = this.y + this.height + 3;
    this.healthBar.draw(display);

    this.manaBar.x = this.x + this.width / 2 - this.manaBar.maxWidth / 2;
    this.manaBar.y = this.y + this.height + 3 + 8;
    this.manaBar.draw(display);
  }
}
