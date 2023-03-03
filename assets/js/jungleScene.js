import Character from "./character.js";
import { mapCollides } from "./collision.js";

export default class JungleScene {
  constructor(display, camera, controller) {
    this.display = display;
    this.camera = camera;
    this.controller = controller;
    this.maps = {};
  }
  async create() {
    const getAnimationStates = await fetch(
      "resources/knights-animation-states.json"
    );
    const animationStates = await getAnimationStates.json();
    const currentAnimationStates = animationStates["golden-knight"];

    const jungleTilesImg = new Image();
    jungleTilesImg.src = "assets/img/tf_jungle_tileset.png";

    const getJungleMap = await fetch("resources/jungle_map.json");
    const jungleMap = await getJungleMap.json();

    const getJungleTilesetProperties = await fetch(
      "resources/tf_jungle_tileset.json"
    );
    const jungleTilesetProperties = await getJungleTilesetProperties.json();

    this.maps["jungle"] = {
      tileAtlas: jungleTilesImg,
      data: jungleMap,
      tileSetProperties: jungleTilesetProperties,
    };

    const characterSpriteImg = new Image();
    characterSpriteImg.src = currentAnimationStates["img"];

    this.background = {
      width: 40 * 16 * 2, // tiles * tileSize * scale
      height: 30 * 16 * 2,
    };

    this.character = new Character(
      characterSpriteImg,
      currentAnimationStates,
      0,
      0,
      currentAnimationStates["width"],
      currentAnimationStates["height"],
      currentAnimationStates["initialXFrame"],
      currentAnimationStates["initialYFrame"],
      10,
      false
    );

    this.camera.x = 780;
    this.camera.y = 0;
    this.character.x = 990;
    this.character.y = 30;
  }

  update() {
    if (this.controller.moving === true) {
      this.character.moving = true;
    } else {
      this.character.moving = false;
    }

    const sprites = [];
    // Map
    const tileAtlas = this.maps.jungle.tileAtlas;
    const tileSize = 16;
    const tileScaleSize = 2;
    const atlasCols = 22; // tiled

    sprites.push({
      image: this.character.img,
      sourceX: this.character.width * this.character.frameX,
      sourceY: this.character.height * this.character.frameY,
      destinationX: this.character.x,
      destinationY: this.character.y,
      width: this.character.width,
      height: this.character.height,
    });

    this.display.render(
      tileAtlas,
      this.maps.jungle.data.layers,
      tileSize,
      tileScaleSize,
      atlasCols,
      sprites,
      this.camera
    );

    // Future collision from intent to move
    const { newX, newY } = this.controller.intentToMove(
      this.character.getCollisionX(),
      this.character.getCollisionY(),
      this.character.getSpeed()
    );

    const characterCollide = mapCollides(
      newX,
      newY,
      this.character.getCollisionWidth(),
      this.character.getCollisionHeight(),
      this.maps.jungle.data,
      this.maps.jungle.tileSetProperties,
      tileSize,
      tileScaleSize
    );

    this.character.update(
      this.controller.keys,
      this.background.width,
      this.background.height,
      characterCollide
    );
    this.camera.update(
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height,
      this.background.width,
      this.background.height
    );
    // console.log(this.camera.x, this.camera.y, this.character.x, this.character.y);
  }
}
