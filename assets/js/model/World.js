/**
 * example implementation
 * https://github.com/photonstorm/phaser/blob/468bf7821d87a40208d73cb8d686b96d25d96ebf/src/physics/arcade/World.js#L1927
 */
import TileMapCollision from "../helper/TileMapCollision.js";
import Collider from "../helper/Collider.js";
import EventEmitter from "../helper/EventEmitter.js";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.colliders = [];
  }

  addCollider(name, objectA, objectB, callback) {
    const collider = new Collider(name, objectA, objectB, callback);
    this.setupCollider(collider);
    this.colliders.push(collider);
  }

  handleGameObjectTileMapCollision(gameObject, tileMap) {
    gameObject.isColliding = TileMapCollision.collidesGameObject(
      gameObject.nextX,
      gameObject.nextY,
      gameObject.collisionWidth,
      gameObject.collisionHeight,
      tileMap.mapData,
      tileMap.tileSetProperties,
      tileMap.tileSize,
      tileMap.tileScaleSize
    );
  }

  setupCollider(collider) {
    const objectA = collider.objectA;
    const objectB = collider.objectB;
    const callback = collider.callback;

    if (objectA.isBody) {
      if (objectB.isBody) {
        //
      } else if (objectB.isTileMap) {
        objectA.on("nextXChanged", () =>
          this.handleGameObjectTileMapCollision(objectA, objectB)
        );
        objectA.on("nextYChanged", () =>
          this.handleGameObjectTileMapCollision(objectA, objectB)
        );
        if (callback) {
          objectA.on("isCollidingChanged", () => callback());
        }
      } else if (objectB.isTileMapLayer) {
        //
      }
    }
  }
}
