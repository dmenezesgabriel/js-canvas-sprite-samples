import { TileLayerCollision } from "../helper/TileLayerCollision.js";

export default class TileMapCollision {
  static getGameObjectVertices(objectX, objectY, objectWidth, objectHeight) {
    const objectLeft = objectX;
    const objectTop = objectY;
    const objectRight = objectX + objectWidth;
    const objectBottom = objectY + objectHeight;

    return [
      { x: objectLeft, y: objectTop },
      { x: objectRight, y: objectTop },
      { x: objectLeft, y: objectBottom },
      { x: objectRight, y: objectBottom },
    ];
  }

  static collidesGameObject(
    objectX,
    objectY,
    objectWidth,
    objectHeight,
    layerData,
    tileSetProperties,
    tileSize,
    tileScaleSize
  ) {
    const objectVertices = this.getGameObjectVertices(
      objectX,
      objectY,
      objectWidth,
      objectHeight
    );

    const hasCollision = [];

    for (const objectVertex of objectVertices) {
      for (const layer of layerData.layers) {
        const itCollides = TileLayerCollision.collidesGameObject(
          objectX,
          objectY,
          objectWidth,
          objectHeight,
          objectVertex.x,
          objectVertex.y,
          layer,
          tileSetProperties,
          tileSize,
          tileScaleSize
        );
        hasCollision.push(itCollides);
      }
    }
    return hasCollision.some((value) => value === true);
  }
}
