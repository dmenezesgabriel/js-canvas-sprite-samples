import EventEmitter from "../helper/EventEmitter.js";

export default class GameObject extends EventEmitter {
  constructor(x, y, width, height, scaleSize = 1) {
    super();
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
    this.scaleSize = scaleSize;
  }

  get height() {
    return this._height * this.scaleSize;
  }
  set height(value) {
    this._height = value;
  }

  get width() {
    return this._width * this.scaleSize;
  }

  set width(value) {
    this._width = value;
  }

  get left() {
    return this.x;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width * this.scaleSize;
  }

  get bottom() {
    this.y + this.height * this.scaleSize;
  }
}
