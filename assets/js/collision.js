function collides(
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
    if (tileVal != 0) {
      tileVal -= 1;
    }
    tileIds.push(tileVal);
  }

  const currentTiles = tileSetProperties["tiles"].filter((tile) =>
    tileIds.includes(tile.id)
  );

  return currentTiles.some((tile) => {
    const collide = tile.properties.filter(
      (property) => property.name === "collides"
    );
    if (collide.length > 0) {
      return collide[0].value === true;
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
