import Player from "./player.js";
import Camera from "./Camera.js";
import Display from "./display.js";
import { mapCollides } from "./collision.js";

export default class Game {
  constructor() {
    this.canvas = document.getElementById("canvas1");
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.display = new Display(this.canvas);
    this.keys = [];
    this.maps = {};
  }
  async create() {
    const moveKeys = [
      "w",
      "a",
      "s",
      "d",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];

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
      this.background,
      this.canvas.width / 2 - currentAnimationStates["width"] / 2,
      this.canvas.height / 2 - currentAnimationStates["height"] / 2,
      currentAnimationStates["width"],
      currentAnimationStates["height"],
      currentAnimationStates["initialXFrame"],
      currentAnimationStates["initialYFrame"],
      10,
      false
    );

    this.camera = new Camera(
      this.player,
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.camera.x = (this.background.width - this.camera.width) / 2;
    this.camera.y = (this.background.height - this.camera.height) / 2;
    this.player.x = (this.background.width - this.camera.width) / 2;
    this.player.y = (this.background.height - this.camera.height) / 2;

    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      if (moveKeys.includes(e.key)) {
        this.player.moving = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      delete this.keys[e.key];
      if (moveKeys.includes(e.key)) {
        this.player.moving = false;
      }
    });
  }

  update() {
    const sprites = [];
    // Map
    const tileAtlas = this.maps.jungle.tileAtlas;
    const tileSize = 16;
    const tileScaleSize = 2;
    const atlasCols = 22; // tiled

    const playerMapCollides = mapCollides(
      this.player,
      this.maps.jungle.data,
      this.maps.jungle.tileSetProperties,
      tileSize,
      tileScaleSize
    );

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
    this.player.update(this.keys);
    this.camera.update();
  }
}
