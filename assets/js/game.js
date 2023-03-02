import Player from "./player.js";
import { mapCollides } from "./collision.js";

export default class Game {
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

    const playerSpriteImg = new Image();
    playerSpriteImg.src = currentAnimationStates["img"];

    this.background = {
      width: 40 * 16 * 2, // tiles * tileSize * scale
      height: 30 * 16 * 2,
    };

    this.player = new Player(
      playerSpriteImg,
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
    this.player.x = 990;
    this.player.y = 30;
  }

  update() {
    if (this.controller.moving === true) {
      this.player.moving = true;
    } else {
      this.player.moving = false;
    }

    const sprites = [];
    // Map
    const tileAtlas = this.maps.jungle.tileAtlas;
    const tileSize = 16;
    const tileScaleSize = 2;
    const atlasCols = 22; // tiled

    sprites.push({
      image: this.player.img,
      sourceX: this.player.width * this.player.frameX,
      sourceY: this.player.height * this.player.frameY,
      destinationX: this.player.x,
      destinationY: this.player.y,
      width: this.player.width,
      height: this.player.height,
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
      this.player.getCollisionX(),
      this.player.getCollisionY(),
      this.player.getSpeed()
    );

    const playerCollide = mapCollides(
      newX,
      newY,
      this.player.getCollisionWidth(),
      this.player.getCollisionHeight(),
      this.maps.jungle.data,
      this.maps.jungle.tileSetProperties,
      tileSize,
      tileScaleSize
    );

    this.player.update(
      this.controller.keys,
      this.background.width,
      this.background.height,
      playerCollide
    );
    this.camera.update(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
      this.background.width,
      this.background.height
    );
    // console.log(this.camera.x, this.camera.y, this.player.x, this.player.y);
  }
}
