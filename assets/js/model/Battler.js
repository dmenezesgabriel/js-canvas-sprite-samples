import DynamicBody from "./DynamicBody.js";
import HealthBar from "./HealthBar.js";

export default class Battler extends DynamicBody {
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
    isColliding = false
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
    this._health = 100;
    this.healthBar = new HealthBar(
      this.x + 2,
      this.y + this.height + 3,
      this.width - 4,
      8,
      this._health,
      "green"
    );
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;

    this.healthBar.health = value;
  }

  draw(display) {
    super.draw(display);
    this.healthBar.x = this.x + 2;
    this.healthBar.y = this.y + this.height + 3;
    this.healthBar.draw(display);
  }
}
