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
    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
      if (this.moveKeys.includes(event.key)) {
        this.moving = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      delete this.keys[event.key];
      if (this.moveKeys.includes(event.key)) {
        this.moving = false;
      }
    });
  }

  intentToMoveCharacter(character) {
    const currentSpeed = character.speed;
    const currentX = character.collisionX;
    const currentY = character.collisionY;
    let newX = currentX;
    let newY = currentY;

    if (this.keys["w"] || this.keys["ArrowUp"]) {
      newY = currentY - currentSpeed;
    }
    if (this.keys["a"] || this.keys["ArrowLeft"]) {
      newX = currentX - currentSpeed;
    }
    if (this.keys["s"] || this.keys["ArrowDown"]) {
      newY = currentY + currentSpeed;
    }
    if (this.keys["d"] || this.keys["ArrowRight"]) {
      newX = currentX + currentSpeed;
    }
    // console.log(x, y);
    return { newX, newY };
  }

  handleMapLimits(character, mapWidth, mapHeight) {
    if (character.x < 0) {
      character.x = 0;
    }
    if (character.x + character.width > mapWidth) {
      character.x = mapWidth - character.width;
    }
    if (character.y < 0) {
      character.y = 0;
    }
    if (character.y + character.height > mapHeight) {
      character.y = mapHeight - character.height;
    }
  }

  moveCharacter(character, mapWidth, mapHeight) {
    const characterSpeed = character.speed;
    if (character.isColliding) {
      character.speed = 0;
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

    this.handleMapLimits(character, mapWidth, mapHeight);
    character.handleFrame();

    if (character.isColliding) {
      character.speed = characterSpeed;
    }
  }
}
