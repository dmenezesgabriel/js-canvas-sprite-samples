import Player from "./player.js";
import Camera from "./Camera.js";
import Display from "./display.js";

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

    this.maps["jungle"] = { tileAtlas: jungleTilesImg, data: jungleMap };

    const playerSpriteImg = new Image();
    playerSpriteImg.src = currentAnimationStates["img"];
    const backgroundImg = new Image();
    backgroundImg.src = "assets/img/background.jpg";

    this.background = {
      img: backgroundImg,
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
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
    // const backgroundLayer = this.maps.jungle.data.layers.filter(
    //   (layer) => layer.name === "background"
    // )[0];

    // const tileAtlas = this.maps.jungle.tileAtlas;
    // const tileSize = 16;
    // const atlasCols = 22; // tiled
    // const levelMap = backgroundLayer["data"];
    // const mapRows = backgroundLayer["height"];
    // const mapCols = backgroundLayer["width"];

    // this.display.drawMap(
    //   tileAtlas,
    //   atlasCols,
    //   levelMap,
    //   mapRows,
    //   mapCols,
    //   tileSize
    // );

    const sprites = [];
    sprites.push({
      image: this.background.img,
      sourceX: 0,
      sourceY: 0,
      destinationX: 0,
      destinationY: 0,
      width: this.background.width,
      height: this.background.height,
    });
    sprites.push({
      image: this.player.img,
      sourceX: this.player.width * this.player.frameX,
      sourceY: this.player.height * this.player.frameY,
      destinationX: this.player.x,
      destinationY: this.player.y,
      width: this.player.width,
      height: this.player.height,
    });
    this.display.render(sprites, this.camera);
    this.player.update(this.keys);
    this.camera.update();
  }
}
