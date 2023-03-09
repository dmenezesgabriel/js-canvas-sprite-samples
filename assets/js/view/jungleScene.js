import Character from "../model/Character.js";
import TileMap from "../model/TileMap.js";
import TileMapCollision from "../helper/TileMapCollision.js";
import BaseScene from "./BaseScene.js";

export default class JungleScene extends BaseScene {
  constructor(display, camera, characterController) {
    super(display);
    this.camera = camera;
    this.characterController = characterController;
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

    this.map = new TileMap(
      "jungle",
      jungleTilesImg,
      22,
      jungleMap,
      jungleTilesetProperties,
      16,
      2
    );

    this.map.createLayersFromMapData();

    const characterSpriteImg = new Image();
    characterSpriteImg.src = currentAnimationStates["img"];

    this.character = new Character(
      characterSpriteImg,
      currentAnimationStates,
      0,
      0,
      currentAnimationStates["width"],
      currentAnimationStates["height"],
      currentAnimationStates["initialFrameCol"],
      currentAnimationStates["initialYFrame"],
      10,
      false,
      0,
      2
    );

    this.camera.x = 780;
    this.camera.y = 0;
    this.character.x = 990;
    this.character.y = 30;
  }

  update() {
    if (this.characterController.moving === true) {
      this.character.moving = true;
    } else {
      this.character.moving = false;
    }

    // Draw
    this.display.beforeDraw(this.camera);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name != "foreground") layerObject.draw(this.display);
    }

    this.character.draw(this.display);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name === "foreground") layerObject.draw(this.display);
    }

    this.display.afterDraw();

    // Future collision from intent to move
    const { newX, newY } = this.characterController.intentToMoveCharacter(
      this.character
    );

    const characterCollide = TileMapCollision.collidesGameObject(
      newX,
      newY,
      this.character.getCollisionWidth(),
      this.character.getCollisionHeight(),
      this.map.mapData,
      this.map.tileSetProperties,
      this.map.tileSize,
      this.map.tileScaleSize
    );

    this.characterController.moveCharacter(
      this.character,
      characterCollide,
      this.map.width,
      this.map.height
    );

    this.camera.update(
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height,
      this.map.width,
      this.map.height
    );
    // console.log(this.camera.x, this.camera.y, this.character.x, this.character.y);
  }
}
