/**
 * example implementation
 * https://github.com/photonstorm/phaser/blob/468bf7821d87a40208d73cb8d686b96d25d96ebf/src/physics/arcade/World.js#L1927
 */
import Collider from "../helper/Collider.js";

export default class BaseScene {
  constructor(display) {
    this.display = display;
    this.colliders = [];
  }

  addCollider(name, objectA, objectB, callback) {
    const collider = new Collider(name, objectA, objectB, callback);
    this.colliders.push(collider);
  }

  collideObjects() {
    for (const collider of this.colliders) {
      console.log(collider);
    }
  }
}
