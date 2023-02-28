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
  //  + player.width = player end
  const currentMapCol = Math.floor(
    (objectX + objectWidth) / (tileSize * tileScaleSize)
  );
  //  + player.height = player bottom
  const currentMapRow = Math.floor(
    (objectY + objectHeight) / (tileSize * tileScaleSize)
  );

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

export { mapCollides };
