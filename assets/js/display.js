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

  drawMap(image, imageColumns, map, mapColumns, tileSize) {
    /**
     * Draw tile map to the canvas.
     */
    for (let index = map.length - 1; index > -1; --index) {
      let value = map[index];
      let sourceX = (value % imageColumns) * tileSize;
      let sourceY = Math.floor(value / imageColumns) * tileSize;
      let destinationX = (index % mapColumns) * tileSize;
      let destinationY = Math.floor(index / mapColumns) * tileSize;

      this.context.drawImage(
        image,
        sourceX,
        sourceY,
        tileSize,
        tileSize,
        destinationX,
        destinationY,
        tileSize,
        tileSize
      );
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
