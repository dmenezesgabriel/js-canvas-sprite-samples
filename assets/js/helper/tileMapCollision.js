import TileCollision from "./TileCollision.js";

function tileMapLayerGameObjectCollides(
  objectX,
  objectY,
  objectWidth,
  objectHeight,
  colReference,
  rowReference,
  layerData,
  tileSetProperties,
  tileSize,
  tileScaleSize
) {
  const currentMapCol = Math.floor(colReference / (tileSize * tileScaleSize));
  const currentMapRow = Math.floor(rowReference / (tileSize * tileScaleSize));

  const tileIds = [];
  for (const layer of layerData.layers) {
    const colNumber = layer["width"];
    const dataIndex = currentMapRow * colNumber + currentMapCol;
    const data = layer["data"];
    let tileVal = data[dataIndex];
    // Tiled layer data starts at 1 instead of 0
    if (tileVal != 0) {
      tileVal -= 1;
    }
    tileIds.push(tileVal);
  }

  const currentTiles = tileSetProperties["tiles"].filter((tile) =>
    tileIds.includes(tile.id)
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
        if (property.name === "collidesLeft") {
          return TileCollision.collideLeft(
            objectX,
            currentMapCol,
            tileSize,
            tileScaleSize
          );
        }

        if (property.name === "collidesTop") {
          return TileCollision.collideTop(
            objectY,
            objectHeight,
            currentMapRow,
            tileSize,
            tileScaleSize
          );
        }

        if (property.name === "collidesRight") {
          return TileCollision.collideRight(
            objectX,
            objectWidth,
            currentMapCol,
            tileSize,
            tileScaleSize
          );
        }

        if (property.name === "collidesBottom") {
          return TileCollision.collideBottom(
            objectY,
            objectHeight,
            currentMapRow,
            tileSize,
            tileScaleSize
          );
        }

        if (property.name === "collides") {
          return property.value;
        }
      });
    }
    return false;
  });
}

function mapCollides(
  objectX,
  objectY,
  objectWidth,
  objectHeight,
  layerData,
  tileSetProperties,
  tileSize,
  tileScaleSize
) {
  const objectLeft = objectX;
  const objectTop = objectY;
  const objectRight = objectX + objectWidth;
  const objectBottom = objectY + objectHeight;

  const combinations = [
    { col: objectLeft, row: objectTop },
    { col: objectRight, row: objectTop },
    { col: objectLeft, row: objectBottom },
    { col: objectRight, row: objectBottom },
  ];

  const hasCollision = [];

  for (const combination of combinations) {
    const itCollides = tileMapLayerGameObjectCollides(
      objectX,
      objectY,
      objectWidth,
      objectHeight,
      combination.col,
      combination.row,
      layerData,
      tileSetProperties,
      tileSize,
      tileScaleSize
    );
    hasCollision.push(itCollides);
  }

  return hasCollision.some((value) => value === true);
}

export { mapCollides, tileMapLayerGameObjectCollides };
