import TileMapLayer from "./tileMapLayer.js";

export default class TileMap {
  constructor(
    name,
    tileAtlas,
    tileAtlasCols,
    mapData,
    tileSetProperties,
    tileSize,
    tileScaleSize,
    display = null
  ) {
    this.name = name;
    this.mapData = mapData;
    this.tileAtlas = tileAtlas;
    this.tileAtlasCols = tileAtlasCols;
    this.tileSetProperties = tileSetProperties;
    this._height = this.mapData.height;
    this._width = this.mapData.width;
    this.tileSize = tileSize;
    this.tileScaleSize = tileScaleSize;
    this.display = display;
    this.layers = {};
  }

  get height() {
    this._height * this.tileSize * this.tileScaleSize;
  }

  get width() {
    this._width = this.tileSize * this.tileScaleSize;
  }

  createLayer(name, layerData, layerRows, layerCols) {
    this.layers[name] = new TileMapLayer(
      name,
      this.tileAtlas,
      this.tileAtlasCols,
      layerData,
      layerRows,
      layerCols,
      this.tileSize,
      this.tileScaleSize,
      this.display
    );
  }

  createLayersFromMapData() {
    for (const layer of this.mapData.layers) {
      this.createLayer(
        layer.name,
        layer["data"],
        layer["height"],
        layer["width"]
      );
    }
  }
}
