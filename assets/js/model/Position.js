import EventEmitter from "../helper/EventEmitter.js";

export default class Position extends EventEmitter {
  constructor(x, y, nextX = null, nextY = null) {
    super();
    this.x = x;
    this.y = y;
    this._nextX = nextX;
    this._nextY = nextY;
  }

  get nextX() {
    return this._nextX || this.x;
  }

  set nextX(value) {
    if (this._nextX != value) {
      this._nextX = value;
      this.emit("nextXChanged");
    }
  }

  get nextY() {
    return this._nextY || this.y;
  }

  set nextY(value) {
    if (this._nextY != value) {
      this._nextY = value;
      this.emit("nextYChanged");
    }
  }
}
