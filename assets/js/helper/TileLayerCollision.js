import TileCollision from "./TileCollision.js";

export default class TileLayerCollision {
  static collisionPropertyNames = [
    "collides",
    "collidesLeft",
    "collidesTop",
    "collidesRight",
    "collidesBottom",
  ];

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

  static getCurrentMapCol(colReference, tileSize, tileScaleSize) {
    return Math.floor(colReference / (tileSize * tileScaleSize));
  }

  static getCurrentMapRow(rowReference, tileSize, tileScaleSize) {
    return Math.floor(rowReference / (tileSize * tileScaleSize));
  }

  static getTile(currentMapCol, currentMapRow, layer) {
    const colNumber = layer["width"];
    const dataIndex = currentMapRow * colNumber + currentMapCol;
    const data = layer["data"];
    let tileVal = data[dataIndex];
    // Tiled layer data starts at 1 instead of 0
    if (tileVal != 0) {
      tileVal -= 1;
    }
    return tileVal;
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
    const currentMapCol = this.getCurrentMapCol(
      colReference,
      tileSize,
      tileScaleSize
    );
    const currentMapRow = this.getCurrentMapRow(
      rowReference,
      tileSize,
      tileScaleSize
    );

    const tileVal = this.getTile(currentMapCol, currentMapRow, layer);

    const currentTiles = tileSetProperties["tiles"].filter(
      (tile) => tileVal === tile.id
    );

    if (currentTiles.length > 0) {
      const tile = currentTiles[0];

      const tileProperties = tile.properties.filter((property) =>
        this.collisionPropertyNames.includes(property.name)
      );
      if (tileProperties.length > 0) {
        return tileProperties.some((property) => {
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
    }
  }
}

export { TileLayerCollision };
