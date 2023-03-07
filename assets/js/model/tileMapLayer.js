export default class TileMapLayer {
  constructor(
    name,
    tileAtlas,
    atlasCols,
    layerData,
    layerRows,
    layerCols,
    tileSize,
    tileScaleSize,
    display = null
  ) {
    this.name = name;
    this.tileAtlas = tileAtlas;
    this.atlasCols = atlasCols;
    this.layerData = layerData;
    this.layerRows = layerRows;
    this.layerCols = layerCols;
    this.tileSize = tileSize;
    this.tileScaleSize = tileScaleSize;
    this.display = display;
  }

  drawLayer() {
    if (this.display != null) {
      this.display.drawMapLayer(
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
}
