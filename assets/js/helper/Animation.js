export default class Animation {
  constructor(
    key,
    img,
    frameWidth,
    frameHeight,
    frameCol,
    frameRow,
    start,
    end,
    rotate
  ) {
    this.key = key;
    this.img = img;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCol = frameCol;
    this.frameRow = frameRow;
    this.start = start;
    this.end = end;
    this.rotate = rotate;
  }

  get frameX() {
    return this.frameWidth * this.frameCol;
  }

  get frameY() {
    return this.frameHeight * this.frameRow;
  }

  update() {
    if (this.frameCol < this.end) {
      this.frameCol++;
    } else {
      this.frameCol = this.start;
    }
  }
}
