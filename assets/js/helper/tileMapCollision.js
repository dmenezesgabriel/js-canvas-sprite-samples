import { TileLayerCollision } from "../helper/TileLayerCollision.js";

export default class TileMapCollision {
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
    const hasCollision = [];

    for (const layer of layerData.layers) {
      const itCollides = TileLayerCollision.collidesGameObject(
        objectX,
        objectY,
        objectWidth,
        objectHeight,
        layer,
        tileSetProperties,
        tileSize,
        tileScaleSize
      );
      hasCollision.push(itCollides);
    }
    return hasCollision.some((value) => value === true);
  }
}
