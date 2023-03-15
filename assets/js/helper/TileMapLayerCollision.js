import TileCollision from "./TileCollision.js";

export default class TileMapLayerCollision {
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

  static getTile(currentMapCol, currentMapRow, layerWidth, layerData) {
    const colNumber = layerWidth;
    const dataIndex = currentMapRow * colNumber + currentMapCol;
    const data = layerData;
    let tileVal = data[dataIndex];
    // Tiled layer data starts at 1 instead of 0
    if (tileVal != 0) {
      tileVal -= 1;
    }
    return tileVal;
  }

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
    layerWidth,
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
      const currentMapCol = this.getCurrentMapCol(
        objectVertex.x,
        tileSize,
        tileScaleSize
      );
      const currentMapRow = this.getCurrentMapRow(
        objectVertex.y,
        tileSize,
        tileScaleSize
      );

      const tileVal = this.getTile(
        currentMapCol,
        currentMapRow,
        layerWidth,
        layerData
      );

      const currentTiles = tileSetProperties["tiles"].filter(
        (tile) => tileVal === tile.id
      );

      if (currentTiles.length > 0) {
        const tile = currentTiles[0];

        const tileProperties = tile.properties.filter((property) =>
          this.collisionPropertyNames.includes(property.name)
        );
        let itCollides = false;
        if (tileProperties.length > 0) {
          itCollides = tileProperties.some((property) => {
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
        hasCollision.push(itCollides);
      }
    }
    return hasCollision.some((value) => value === true);
  }
}

export { TileMapLayerCollision };
