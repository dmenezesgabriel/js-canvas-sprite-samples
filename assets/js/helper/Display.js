export default class Display {
  constructor(canvas, debug) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.debug = debug;
  }

  save() {
    this.context.save();
  }

  restore() {
    this.context.restore();
  }

  clearRect(destinationX, destinationY, width, height) {
    this.context.clearRect(destinationX, destinationY, width, height);
  }

  translate(destinationX, destinationY) {
    this.context.translate(destinationX, destinationY);
  }

  drawMapLayer(
    tileAtlas,
    atlasCols,
    layerData,
    layerRows,
    layerCols,
    tileSize,
    tileScaleSize
  ) {
    /**
     * Draw tile map to the canvas.
     */

    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;

    const layerHeight = layerRows * tileSize;
    const layerWidth = layerCols * tileSize;

    for (let row = 0; row < layerHeight; row += tileSize) {
      for (let col = 0; col < layerWidth; col += tileSize) {
        let tileVal = layerData[mapIndex];
        if (tileVal != 0) {
          tileVal -= 1; // Tiled layer data starts at 1 instead of 0
          sourceX = (tileVal % atlasCols) * tileSize; // col number * tileSize
          sourceY = Math.floor(tileVal / atlasCols) * tileSize; // line number * tileSize
          this.context.drawImage(
            tileAtlas,
            sourceX,
            sourceY,
            tileSize,
            tileSize,
            col * tileScaleSize,
            row * tileScaleSize,
            tileSize * tileScaleSize,
            tileSize * tileScaleSize
          );
          //  Debug
          if (this.debug) {
            this.context.fillStyle = "white";
            this.context.fillText(
              `t${tileVal}`,
              col * tileScaleSize,
              row * tileScaleSize + 30
            );
            this.context.beginPath();
            this.context.strokeStyle = "green";
            this.context.rect(
              col * tileScaleSize,
              row * tileScaleSize,
              tileSize * tileScaleSize,
              tileSize * tileScaleSize
            );
            this.context.stroke();
          }
          // Debug end
        }
        mapIndex++;
      }
    }
  }

  drawObject(
    image,
    sourceX,
    sourceY,
    destinationX,
    destinationY,
    width,
    height,
    scale = 1
  ) {
    /**
     * Draw Object to the canvas.
     */
    this.context.drawImage(
      image,
      sourceX,
      sourceY,
      width,
      height,
      destinationX,
      destinationY,
      width * scale,
      height * scale
    );
    //  Debug
    if (this.debug) {
      this.context.beginPath();
      this.context.strokeStyle = "blue";
      this.context.rect(
        destinationX,
        destinationY,
        width * scale,
        height * scale
      );
      this.context.stroke();
    }

    //  Debug end
  }

  resize(height, width) {
    /**
     * Resize the canvas.
     */
    this.context.canvas.height = height;
    this.context.canvas.width = width;
    this.context.imageSmoothingEnabled = false;
  }

  beforeDraw(camera) {
    this.context.save();
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.context.translate(-camera.x, -camera.y);
  }

  afterDraw() {
    this.context.restore();
  }
}
