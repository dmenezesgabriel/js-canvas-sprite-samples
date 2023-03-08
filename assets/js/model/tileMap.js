import TileMapLayer from "./tileMapLayer.js";

export default class TileMap {
  constructor(
    name,
    tileAtlas,
    tileAtlasCols,
    mapData,
    tileSetProperties,
    tileSize,
    tileScaleSize
  ) {
    this.name = name;
    this.mapData = mapData;
    this.tileAtlas = tileAtlas;
    this.tileAtlasCols = tileAtlasCols;
    this.tileSetProperties = tileSetProperties;
    this.height = this.mapData.height * tileSize * tileScaleSize;
    this.width = this.mapData.width * tileSize * tileScaleSize;
    this.tileSize = tileSize;
    this.tileScaleSize = tileScaleSize;
    this.layers = {};
  }

  createLayer(name, layerData, layerRows, layerCols) {
    this.layers[name] = new TileMapLayer(
      name,
      this.tileAtlas,
      this.tileAtlasCols,
      this.tileSetProperties,
      layerData,
      layerRows,
      layerCols,
      this.tileSize,
      this.tileScaleSize
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
