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
    tileIds.push(data[dataIndex]);
  }

  const currentTiles = tileSetProperties["tiles"].filter((tile) =>
    tileIds.includes(tile.id)
  );

  return currentTiles.some((tile) => (tile.properties.collide = true));
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
  const objectTop = objectY;
  const objectLeft = objectX;
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
