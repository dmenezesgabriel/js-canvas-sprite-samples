import { TileMapLayerCollision } from "./TileMapLayerCollision.js";

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
      const itCollides = TileMapLayerCollision.collidesGameObject(
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
