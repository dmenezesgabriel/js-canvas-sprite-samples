export default class TileMapLayer {
  constructor(
    name,
    tileAtlas,
    atlasCols,
    tileSetProperties,
    layerData,
    layerRows,
    layerCols,
    tileSize,
    tileScaleSize
  ) {
    this.name = name;
    this.tileAtlas = tileAtlas;
    this.atlasCols = atlasCols;
    this.tileSetProperties = tileSetProperties;
    this.layerData = layerData;
    this.layerRows = layerRows;
    this.layerCols = layerCols;
    this.tileSize = tileSize;
    this.tileScaleSize = tileScaleSize;
    this.isTileMapLayer = true;
    this.colliders = [];
  }

  draw(display) {
    display.drawMapLayer(
      this.tileAtlas,
      this.atlasCols,
      this.layerData,
      this.layerRows,
      this.layerCols,
      this.tileSize,
      this.tileScaleSize
    );
  }
}
