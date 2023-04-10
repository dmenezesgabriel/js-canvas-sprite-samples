import TileMapLayer from "./TileMapLayer.js";

export default class TileMap {
  constructor(name, mapData, tileSize, tileScaleSize) {
    this.name = name;
    this.mapData = mapData;
    this.height = this.mapData.height * tileSize * tileScaleSize;
    this.width = this.mapData.width * tileSize * tileScaleSize;
    this.tileSize = tileSize;
    this.tileScaleSize = tileScaleSize;
    this.layers = {};
    this.isTileMap = true;
  }

  getLayer(name) {
    if (name in this.layers) {
      return this.layers[name];
    }
  }

  addLayer(
    name,
    tileAtlas,
    tileAtlasCols,
    tileSetProperties,
    tileSize,
    tileScaleSize
  ) {
    /**
     * @returns {TileMapLayer}
     */
    if (name in this.layers) {
      return this.layers[name];
    }

    const matchingLayers = this.mapData.layers.filter(
      (layer) => layer.name === name
    );

    if (!matchingLayers) return;
    const layer = matchingLayers[0];

    const layerObject = new TileMapLayer(
      layer.name,
      tileAtlas,
      tileAtlasCols,
      tileSetProperties,
      layer["data"],
      layer["height"],
      layer["width"],
      tileSize,
      tileScaleSize
    );
    this.layers[layer.name] = layerObject;
    return layerObject;
  }
}
