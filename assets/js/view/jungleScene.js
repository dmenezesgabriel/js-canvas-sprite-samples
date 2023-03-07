import Character from "../model/character.js";
import TileMap from "../model/tileMap.js";
import { mapCollides } from "../helper/collision.js";
import BaseScene from "./baseScene.js";

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
      2,
      this.display
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
    if (this.characterController.moving === true) {
      this.character.moving = true;
    } else {
      this.character.moving = false;
    }

    // Draw
    this.display.beforeDraw(this.camera);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name != "foreground") layerObject.drawLayer();
    }

    this.display.drawObject(
      this.character.img,
      this.character.width * this.character.frameX,
      this.character.height * this.character.frameY,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name === "foreground") layerObject.drawLayer();
    }

    this.display.afterDraw();

    // Future collision from intent to move
    const { newX, newY } = this.characterController.intentToMoveCharacter(
      this.character
    );

    const characterCollide = mapCollides(
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
