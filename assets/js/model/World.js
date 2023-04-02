import TileMapLayerCollision from "../helper/TileMapLayerCollision.js";
import Collider from "./Collider.js";
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

  handleGameObjectTileMapLayerCollision(gameObject, tileMapLayer, collider) {
    const collisionOccurs = TileMapLayerCollision.collidesGameObject(
      gameObject.position.nextX,
      gameObject.position.nextY,
      gameObject.collisionWidth,
      gameObject.collisionHeight,
      tileMapLayer.layerCols,
      tileMapLayer.layerData,
      tileMapLayer.tileSetProperties,
      tileMapLayer.tileSize,
      tileMapLayer.tileScaleSize
    );

    collider.isActive = collisionOccurs;
    // TODO
    // Improve collision
    gameObject.isColliding = gameObject.colliders.some(
      (collider) => collider.isActive && collider.overlapOnly === false
    );
    return collisionOccurs;
  }

  setupCollider(collider) {
    const objectA = collider.objectA;
    const objectB = collider.objectB;
    const callback = collider.callback;

    objectA.colliders.push(collider);
    objectB.colliders.push(collider);

    if (objectA.isBody) {
      if (objectB.isBody) {
        // Not implemented
      } else if (objectB.isTileMapLayer) {
        objectA.position.on("nextXChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectA, objectB, collider)
        );
        objectA.position.on("nextYChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectA, objectB, collider)
        );
        if (callback) {
          collider.on("onCollide", (objectA, objectB) =>
            callback(objectA, objectB)
          );
        }
      }
    }

    if (objectA.isTileMapLayer) {
      if (objectB.isBody) {
        objectA.position.on("nextXChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectB, objectA)
        );
        objectA.position.on("nextYChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectB, objectA)
        );
        if (callback) {
          collider.on("onCollide", (objectA, objectB) =>
            callback(objectA, objectB)
          );
        }
      }
    }
  }
}
