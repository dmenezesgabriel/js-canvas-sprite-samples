export default class Animation {
  constructor(
    key,
    spriteSheetFile,
    objectWidth,
    objectHeight,
    startColNumber,
    endColNumber,
    startRowNumber,
    endRowNumber
  ) {
    this.key = key;
    this.spriteSheetFile = spriteSheetFile;
    this.objectWidth = objectWidth;
    this.objectHeight = objectHeight;
    this.startColNumber = startColNumber;
    this.endColNumber = endColNumber;
    this.startRowNumber = startRowNumber;
    this.endRowNumber = endRowNumber;
    this.currentColNumber = this.startColNumber;
    this.currentRowNumber = this.startRowNumber;
  }

  play() {
    if (this.currentColNumber < this.endColNumber) {
      this.currentColNumber++;
    }
  }
}
