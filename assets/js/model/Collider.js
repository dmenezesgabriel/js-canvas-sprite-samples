import EventEmitter from "../helper/EventEmitter.js";

export default class Collider extends EventEmitter {
  constructor(name, objectA, objectB, callback) {
    super();
    this.name = name;
    this.objectA = objectA;
    this.objectB = objectB;
    this.callback = callback;
    this._iActive = false;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value) {
    if (this._isActive != value) {
      if (value === true) {
        this.emit("onCollide", [this.objectA, this.objectB]);
      } else {
        this.emit("offCollide", [this.objectA, this.objectB]);
      }
      this._isActive = value;
    }
  }
}
