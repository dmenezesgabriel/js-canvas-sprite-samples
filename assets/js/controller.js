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
}
