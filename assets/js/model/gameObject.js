import EventEmitter from "../helper/EventEmitter.js";

export default class GameObject extends EventEmitter {
  constructor(position, width, height, scaleSize = 1) {
    super();
    this.position = position;
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
    return this.position.x;
  }

  get top() {
    return this.position.y;
  }

  get right() {
    return this.position.x + this.width * this.scaleSize;
  }

  get bottom() {
    this.position.y + this.height * this.scaleSize;
  }
}
