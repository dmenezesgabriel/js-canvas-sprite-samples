export default class Display {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
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

  drawMap(
    tileAtlas,
    atlasCols,
    levelMap,
    mapRows,
    mapCols,
    tileSize,
    tileScaleSize
  ) {
    /**
     * Draw tile map to the canvas.
     */

    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;

    const mapHeight = mapRows * tileSize;
    const mapWidth = mapCols * tileSize;

    for (let row = 0; row < mapHeight; row += tileSize) {
      for (let col = 0; col < mapWidth; col += tileSize) {
        let tileVal = levelMap[mapIndex];
        if (tileVal != 0) {
          tileVal -= 1; // tiled starts at 1 instead of 0
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
    height
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
      width,
      height
    );
  }

  resize(height, width) {
    /**
     * Resize the canvas.
     */
    this.context.canvas.height = height;
    this.context.canvas.width = width;
    this.context.imageSmoothingEnabled = false;
  }

  render(
    tileAtlas,
    mapLayers,
    tileSize,
    tileScaleSize,
    atlasCols,
    objects,
    camera
  ) {
    /**
     *
     */
    this.context.save();
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.context.translate(-camera.x, -camera.y);

    // Map
    for (const layer of mapLayers) {
      const levelMap = layer["data"];
      const mapRows = layer["height"];
      const mapCols = layer["width"];
      this.drawMap(
        tileAtlas,
        atlasCols,
        levelMap,
        mapRows,
        mapCols,
        tileSize,
        tileScaleSize
      );
    }

    // Sprites
    for (const object of objects) {
      this.drawObject(
        object.image,
        object.sourceX,
        object.sourceY,
        object.destinationX,
        object.destinationY,
        object.width,
        object.height
      );
    }
    this.context.restore();
  }
}
