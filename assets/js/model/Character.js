import DynamicBody from "./DynamicBody.js";
import StatusBar from "./StatusBar.js";
import drawName from "../utils/drawName.js";
import Position from "./Position.js";

export default class Character extends DynamicBody {
  constructor(
    name,
    position,
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
      position,
      width,
      height,
      speed,
      moving,
      friction,
      scaleSize,
      isColliding
    );
    this._isAttacking = false;
    this._inBattle = false;
    this._health = 100;
    this._mana = 100;
    this.items = items;
    this.setupStatusBars();
  }

  setupStatusBars() {
    const healthBarPosition = new Position(
      this.position.x + 2,
      this.position.y + this.height + 3
    );
    this.healthBar = new StatusBar(
      healthBarPosition,
      this.width - 4,
      8,
      this._health,
      "green"
    );
    const manaBarPosition = new Position(
      this.position.x + 2,
      this.position.y + this.height + 3 + 8
    );
    this.manaBar = new StatusBar(
      manaBarPosition,
      this.width - 4,
      8,
      this._health,
      "blue"
    );
  }

  get isAttacking() {
    return this._isAttacking;
  }

  set isAttacking(value) {
    this._isAttacking = value;
    setTimeout(() => {
      if (this._isAttacking) {
        this.isAttacking = false;
      }
    }, 200);
  }

  get inBattle() {
    return this._inBattle;
  }

  set inBattle(value) {
    this._inBattle = value;
    setTimeout(() => {
      if (this._inBattle) {
        this._inBattle = false;
      }
    }, 5000);
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
    this.isAttacking = true;
  }

  draw(display) {
    drawName(
      display,
      this.position.x + this.width / 2,
      this.position.y - 5,
      this.name,
      "#fff"
    );
    this.healthBar.position.x =
      this.position.x + this.width / 2 - this.healthBar.maxWidth / 2;
    this.healthBar.position.y = this.position.y + this.height + 3;
    this.healthBar.draw(display);

    this.manaBar.position.x =
      this.position.x + this.width / 2 - this.manaBar.maxWidth / 2;
    this.manaBar.position.y = this.position.y + this.height + 3 + 8;
    this.manaBar.draw(display);
  }
}
