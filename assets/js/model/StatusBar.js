export default class StatusBar {
  constructor(position, width, height, maxValue, color) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.maxValue = maxValue;
    this.maxWidth = width;
    this._value = maxValue;
    this.color = color;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.width = (this._value / this.maxValue) * this.maxWidth;
  }

  draw(display) {
    const context = display.context;
    context.strokeStyle = "#333";
    context.lineWidth = 2;
    // Background
    context.fillStyle = "gray";
    context.fillRect(
      this.position.x,
      this.position.y,
      this.maxWidth,
      this.height
    );
    // Color
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    context.strokeRect(
      this.position.x,
      this.position.y,
      this.maxWidth,
      this.height
    );
  }
}
