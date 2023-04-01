export default class Size {
  constructor(width, height, scale) {
    this._width = width;
    this._height = height;
    this.scale = scale;
  }

  get height() {
    return this._height * this.scale;
  }
  set height(value) {
    this._height = value;
  }

  get width() {
    return this._width * this.scale;
  }

  set width(value) {
    this._width = value;
  }
}
