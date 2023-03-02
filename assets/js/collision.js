function hitLeft(objectX, objectWidth, currentMapCol, tileSize, tileScaleSize) {
  const leftSize = currentMapCol * tileSize * tileScaleSize;
  if (objectX < leftSize) {
    console.log("collide left");
    console.log(leftSize);
    console.log(objectX);
    return true;
  }
  return false;
}

function hitTop(objectY, objectHeight, currentMapRow, tileSize, tileScaleSize) {
  const top = currentMapRow * tileSize * tileScaleSize;
  if (objectY + objectHeight < top) {
    return true;
  }
  return false;
}

function hitRight(objectX, currentMapCol, tileSize, tileScaleSize) {
  const rightSide =
    currentMapCol * tileSize * tileScaleSize + tileSize * tileScaleSize;
  if (objectX < rightSide) {
    return true;
  }
  return false;
}

function hitBottom(
  objectY,
  objectHeight,
  currentMapRow,
  tileSize,
  tileScaleSize
) {
  const bottom =
    currentMapRow * tileSize * tileScaleSize + tileSize * tileScaleSize;
  if (objectY + objectHeight > bottom) {
    console.log("collidesBottom");
    return true;
  }
  return false;
}

function collides(
  objectX,
  objectY,
  objectWidth,
  objectHeight,
  colReference,
  rowReference,
  mapData,
  tileSetProperties,
  tileSize,
  tileScaleSize
) {
  const currentMapCol = Math.floor(colReference / (tileSize * tileScaleSize));
  const currentMapRow = Math.floor(rowReference / (tileSize * tileScaleSize));

  const tileIds = [];
  for (const layer of mapData.layers) {
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
    console.log(tile.id);
    const collisionPropertyNames = [
      "collides",
      "collidesLeft",
      "collidesBottom",
    ];
    const collide = tile.properties.filter((property) =>
      collisionPropertyNames.includes(property.name)
    );
    if (collide.length > 0) {
      return collide.some((property) => {
        if (property.name === "collidesLeft") {
          return hitLeft(
            objectX,
            objectWidth,
            currentMapCol,
            tileSize,
            tileScaleSize
          );
        }

        if (property.name === "collidesBottom") {
          return hitBottom(
            objectY,
            objectHeight,
            currentMapRow,
            tileSize,
            tileScaleSize
          );
        }

        if (property.name === "collides") {
          console.log("collides");
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
  mapData,
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
    const itCollides = collides(
      objectX,
      objectY,
      objectWidth,
      objectHeight,
      combination.col,
      combination.row,
      mapData,
      tileSetProperties,
      tileSize,
      tileScaleSize
    );
    hasCollision.push(itCollides);
  }

  return hasCollision.some((value) => value === true);
}

export { mapCollides };
