export default class Animation {
  constructor(
    key,
    img,
    frameWidth,
    frameHeight,
    frameX,
    frameY,
    scaleSize,
    frameCol,
    frameRow,
    start,
    end
  ) {
    this.key = key;
    this.img = img;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameX = frameX;
    this.frameY = frameY;
    this.scaleSize = scaleSize;
    this.frameCol = frameCol;
    this.frameRow = frameRow;
    this.start = start;
    this.end = end;
  }

  update() {
    if (this.spriteFrameCol < this.end) {
      this.spriteFrameCol++;
    }
    this.spriteFrameCol = this.start;
  }
}
