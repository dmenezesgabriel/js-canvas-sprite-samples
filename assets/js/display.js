export default class Display {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
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

  drawMap(tileAtlas, atlasCols, levelMap, mapRows, mapCols, tileSize) {
    /**
     * Draw tile map to the canvas.
     */

    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;

    const mapHeight = mapRows * tileSize;
    const mapWidth = mapCols * tileSize;

    for (let col = 0; col < mapHeight; col += tileSize) {
      for (let row = 0; row < mapWidth; row += tileSize) {
        let tileVal = levelMap[mapIndex];
        if (tileVal != 0) {
          tileVal -= 1;
          sourceY = Math.floor(tileVal / atlasCols) * tileSize;
          sourceX = (tileVal % atlasCols) * tileSize;
          this.context.drawImage(
            tileAtlas,
            sourceX,
            sourceY,
            tileSize,
            tileSize,
            row,
            col,
            tileSize,
            tileSize
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

  render(objects, camera) {
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
