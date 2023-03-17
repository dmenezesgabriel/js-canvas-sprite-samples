export default class HealthBar {
  constructor(x, y, width, height, maxHealth, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxHealth = maxHealth;
    this.maxWidth = width;
    this._health = maxHealth;
    this.color = color;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
    this.width = (this._health / this.maxHealth) * this.maxWidth;
  }

  draw(display) {
    const context = display.context;
    context.strokeStyle = "#333";
    context.lineWidth = 2;
    // Background
    context.fillStyle = "gray";
    context.fillRect(this.x, this.y, this.maxWidth, this.height);
    // Color
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

    context.strokeRect(this.x, this.y, this.maxWidth, this.height);
  }
}
