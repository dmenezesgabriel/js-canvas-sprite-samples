export default class CharacterController {
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

  intentToMoveCharacter(character) {
    let newX = character.x;
    let newY = character.y;
    if (this.keys["w"] || this.keys["ArrowUp"]) {
      newY = currentY - character.speed;
    }
    if (this.keys["a"] || this.keys["ArrowLeft"]) {
      newX = currentX - character.speed;
    }
    if (this.keys["s"] || this.keys["ArrowDown"]) {
      newY = currentY + character.speed;
    }
    if (this.keys["d"] || this.keys["ArrowRight"]) {
      newX = currentX + character.speed;
    }
    // console.log(x, y);
    return { newX, newY };
  }

  moveCharacter(character, characterCollide, mapWidth, mapHeight) {
    if (characterCollide) {
      return;
    }
    if (this.keys["w"] || this.keys["ArrowUp"]) {
      character.moveUp();
    }
    if (this.keys["a"] || this.keys["ArrowLeft"]) {
      character.moveLeft();
    }
    if (this.keys["s"] || this.keys["ArrowDown"]) {
      character.moveDown();
    }
    if (this.keys["d"] || this.keys["ArrowRight"]) {
      character.moveRight();
    }

    character.handleMapLimits(mapWidth, mapHeight);
    character.handleFrame();
  }
}
