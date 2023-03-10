import TileCollision from "./TileCollision.js";

export default class TileLayerCollision {
  static collidesByProperty(
    property,
    objectX,
    objectY,
    objectWidth,
    objectHeight,
    currentMapCol,
    currentMapRow,
    tileSize,
    tileScaleSize
  ) {
    switch (property.name) {
      case "collidesLeft":
        return TileCollision.collideLeft(
          objectX,
          currentMapCol,
          tileSize,
          tileScaleSize
        );
      case "collidesTop":
        return TileCollision.collideTop(
          objectY,
          objectHeight,
          currentMapRow,
          tileSize,
          tileScaleSize
        );
      case "collidesRight":
        return TileCollision.collideRight(
          objectX,
          objectWidth,
          currentMapCol,
          tileSize,
          tileScaleSize
        );
      case "collidesBottom":
        return TileCollision.collideBottom(
          objectY,
          objectHeight,
          currentMapRow,
          tileSize,
          tileScaleSize
        );
      case "collides":
        return property.value;
    }
  }

  static collidesGameObject(
    objectX,
    objectY,
    objectWidth,
    objectHeight,
    colReference,
    rowReference,
    layer,
    tileSetProperties,
    tileSize,
    tileScaleSize
  ) {
    const currentMapCol = Math.floor(colReference / (tileSize * tileScaleSize));
    const currentMapRow = Math.floor(rowReference / (tileSize * tileScaleSize));

    const colNumber = layer["width"];
    const dataIndex = currentMapRow * colNumber + currentMapCol;
    const data = layer["data"];
    let tileVal = data[dataIndex];
    // Tiled layer data starts at 1 instead of 0
    if (tileVal != 0) {
      tileVal -= 1;
    }

    const currentTiles = tileSetProperties["tiles"].filter(
      (tile) => tileVal === tile.id
    );

    return currentTiles.some((tile) => {
      const collisionPropertyNames = [
        "collides",
        "collidesLeft",
        "collidesTop",
        "collidesRight",
        "collidesBottom",
      ];
      const collide = tile.properties.filter((property) =>
        collisionPropertyNames.includes(property.name)
      );
      if (collide.length > 0) {
        return collide.some((property) => {
          return this.collidesByProperty(
            property,
            objectX,
            objectY,
            objectWidth,
            objectHeight,
            currentMapCol,
            currentMapRow,
            tileSize,
            tileScaleSize
          );
        });
      }
      return false;
    });
  }
}

export { TileLayerCollision };
