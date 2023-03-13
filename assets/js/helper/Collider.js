export default class Collider {
  constructor(name, objectA, objectB, callback) {
    this.name = name;
    this.objectA = objectA;
    this.objectB = objectB;
    this.callback = callback;
  }
}
