import { tileMapLayerGameObjectCollides } from "../helper/tileMapCollision.js";

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
    tileScaleSize,
    display = null
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
    this.display = display;
  }

  draw() {
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

  // hasCollision(objectX, objectY, objectWidth, objectHeight) {
  //   const objectLeft = objectX;
  //   const objectTop = objectY;
  //   const objectRight = objectX + objectWidth;
  //   const objectBottom = objectY + objectHeight;

  //   const objectVertices = [
  //     { x: objectLeft, y: objectTop },
  //     { x: objectRight, y: objectTop },
  //     { x: objectLeft, y: objectBottom },
  //     { x: objectRight, y: objectBottom },
  //   ];

  //   const verticesCollisions = [];

  //   for (const objectVertex of objectVertices) {
  //     const itCollides = tileMapLayerGameObjectCollides(
  //       objectX,
  //       objectY,
  //       objectWidth,
  //       objectHeight,
  //       objectVertex.x,
  //       objectVertex.y,
  //       this.layerData,
  //       this.tileSetProperties,
  //       this.tileSize,
  //       this.tileScaleSize
  //     );
  //     verticesCollisions.push(itCollides);
  //   }

  //   return verticesCollisions.some((value) => value === true);
  // }
}
