export default class Controller {
  constructor() {
    this.moveKeys = [
      "w",
      "a",
      "s",
      "d",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];
    this.keys = [];
    this.moving = false;
  }

  init() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      if (this.moveKeys.includes(e.key)) {
        this.moving = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      delete this.keys[e.key];
      if (this.moveKeys.includes(e.key)) {
        this.moving = false;
      }
    });
  }

  intentToMove(currentX, currentY, speed) {
    let x = currentX;
    let y = currentY;
    if (this.keys["w"] || this.keys["ArrowUp"]) {
      y = currentY - speed;
    }
    if (this.keys["a"] || this.keys["ArrowLeft"]) {
      x = currentX - speed;
    }
    if (this.keys["s"] || this.keys["ArrowDown"]) {
      y = currentY + speed;
    }
    if (this.keys["d"] || this.keys["ArrowRight"]) {
      x = currentX + speed;
    }
    // console.log(x, y);
    return { x, y };
  }
}
