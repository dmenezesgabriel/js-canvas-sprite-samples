export default class TileCollision {
  static collideLeft(objectX, currentMapCol, tileSize, tileScaleSize) {
    const leftSize = currentMapCol * tileSize * tileScaleSize;
    if (objectX < leftSize) {
      return true;
    }
    return false;
  }

  static collideTop(
    objectY,
    objectHeight,
    currentMapRow,
    tileSize,
    tileScaleSize
  ) {
    const top = currentMapRow * tileSize * tileScaleSize;
    if (objectY + objectHeight > top) {
      return true;
    }
    return false;
  }

  static collideRight(
    objectX,
    objectWidth,
    currentMapCol,
    tileSize,
    tileScaleSize
  ) {
    const rightSide =
      currentMapCol * tileSize * tileScaleSize + tileSize * tileScaleSize;
    if (objectX + objectWidth > rightSide) {
      return true;
    }
    return false;
  }

  static collideBottom(
    objectY,
    objectHeight,
    currentMapRow,
    tileSize,
    tileScaleSize
  ) {
    const bottom =
      currentMapRow * tileSize * tileScaleSize + tileSize * tileScaleSize;
    if (objectY + objectHeight > bottom) {
      return true;
    }
    return false;
  }
}
