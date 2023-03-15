import TileMapCollision from "../helper/TileMapCollision.js";
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

  handleGameObjectTileMapCollision(gameObject, tileMap, collider) {
    const collisionOccurs = TileMapCollision.collidesGameObject(
      gameObject.nextX,
      gameObject.nextY,
      gameObject.collisionWidth,
      gameObject.collisionHeight,
      tileMap.mapData,
      tileMap.tileSetProperties,
      tileMap.tileSize,
      tileMap.tileScaleSize
    );
    collider.isActive = collisionOccurs;
    gameObject.isColliding = collisionOccurs;
    return collisionOccurs;
  }

  handleGameObjectTileMapLayerCollision(gameObject, tileMapLayer, collider) {
    const collisionOccurs = TileMapLayerCollision.collidesGameObject(
      gameObject.nextX,
      gameObject.nextY,
      gameObject.collisionWidth,
      gameObject.collisionHeight,
      tileMapLayer.layerCols,
      tileMapLayer.layerData,
      tileMapLayer.tileSetProperties,
      tileMapLayer.tileSize,
      tileMapLayer.tileScaleSize
    );
    collider.isActive = collisionOccurs;
    gameObject.isColliding = collisionOccurs;
    return collisionOccurs;
  }

  setupCollider(collider) {
    const objectA = collider.objectA;
    const objectB = collider.objectB;
    const callback = collider.callback;

    if (objectA.isBody) {
      if (objectB.isBody) {
        // Not implemented
      } else if (objectB.isTileMap) {
        objectA.on("nextXChanged", () =>
          this.handleGameObjectTileMapCollision(objectA, objectB, collider)
        );
        objectA.on("nextYChanged", () =>
          this.handleGameObjectTileMapCollision(objectA, objectB, collider)
        );
        if (callback) {
          collider.on("onCollide", (objectA, objectB) =>
            callback(objectA, objectB)
          );
        }
      } else if (objectB.isTileMapLayer) {
        objectA.on("nextXChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectA, objectB, collider)
        );
        objectA.on("nextYChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectA, objectB, collider)
        );
        if (callback) {
          collider.on("onCollide", (objectA, objectB) =>
            callback(objectA, objectB)
          );
        }
      }
    }
    if (objectA.isTileMap) {
      if (objectB.isBody) {
        objectA.on("nextXChanged", () =>
          this.handleGameObjectTileMapCollision(objectB, objectA)
        );
        objectA.on("nextYChanged", () =>
          this.handleGameObjectTileMapCollision(objectB, objectA)
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
        objectA.on("nextXChanged", () =>
          this.handleGameObjectTileMapLayerCollision(objectB, objectA)
        );
        objectA.on("nextYChanged", () =>
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
