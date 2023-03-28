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

  drawText(x, y, text, color, font) {
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.fillText(text, x, y);
  }

  _debugDrawMapLayer(row, col, tileVal, tileSize, tileScaleSize) {
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
          if (this.debug) {
            this._debugDrawMapLayer(row, col, tileVal, tileSize, tileScaleSize);
          }
        }
        mapIndex++;
      }
    }
  }

  _debugDrawObject(x, y, width, height, scale) {
    this.context.beginPath();
    this.context.strokeStyle = "blue";
    this.context.lineWidth = 2;
    this.context.rect(x, y, width * scale, height * scale);
    this.context.stroke();
  }

  drawObject(
    image,
    sourceX,
    sourceY,
    destinationX,
    destinationY,
    width,
    height,
    scale = 1,
    rotate = null,
    flip = false
  ) {
    /**
     * Draw Object to the canvas.
     */
    let _destinationX = destinationX;
    let _destinationY = destinationY;

    this.save();

    if (rotate) {
      const centerX = destinationX;
      const centerY = destinationY;

      this.context.translate(centerX, centerY);
      this.context.rotate(rotate);
      _destinationX = 0 - (width * scale) / 2;
      _destinationY = 0 - (height * scale) / 2;
    }

    if (flip) {
      this.context.scale(-1, 1);
      _destinationX = -_destinationX - width * scale;
    }

    this.context.drawImage(
      image,
      sourceX,
      sourceY,
      width,
      height,
      _destinationX,
      _destinationY,
      width * scale,
      height * scale
    );

    if (this.debug) {
      this._debugDrawObject(_destinationX, _destinationY, width, height, scale);
    }

    if (flip) {
      this.context.scale(-1, 1);
    }

    this.restore();
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
