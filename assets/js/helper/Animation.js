export default class Animation {
  constructor(
    key,
    img,
    frameWidth,
    frameHeight,
    frameCol,
    frameRow,
    start,
    end
  ) {
    this.key = key;
    this.img = img;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCol = frameCol;
    this.frameRow = frameRow;
    this.start = start;
    this.end = end;
  }

  get frameX() {
    return this.frameWidth * this.frameCol;
  }

  get frameY() {
    return this.frameHeight * this.frameRow;
  }

  update() {
    if (this.spriteFrameCol < this.end) {
      this.spriteFrameCol++;
    }
    this.spriteFrameCol = this.start;
  }
}
