import Character from "../model/Character.js";
import TileMap from "../model/TileMap.js";
import TileMapCollision from "../helper/TileMapCollision.js";
import BaseScene from "./BaseScene.js";
import CameraController from "../controller/CameraController.js";

export default class JungleScene extends BaseScene {
  constructor(display, camera, cameraController, characterController) {
    super(display);
    this.camera = camera;
    this.cameraController = cameraController;
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

    this.playerCharacter = new Character(
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
    this.playerCharacter.x = 990;
    this.playerCharacter.y = 30;
  }

  update() {
    if (this.characterController.moving === true) {
      this.playerCharacter.moving = true;
    } else {
      this.playerCharacter.moving = false;
    }

    // Draw
    this.display.beforeDraw(this.camera);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name != "foreground") layerObject.draw(this.display);
    }

    this.playerCharacter.draw(this.display);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name === "foreground") layerObject.draw(this.display);
    }

    this.display.afterDraw();

    // Future collision from intent to move
    const { newX, newY } = this.characterController.intentToMoveCharacter(
      this.playerCharacter
    );

    const characterCollide = TileMapCollision.collidesGameObject(
      newX,
      newY,
      this.playerCharacter.collisionWidth,
      this.playerCharacter.collisionHeight,
      this.map.mapData,
      this.map.tileSetProperties,
      this.map.tileSize,
      this.map.tileScaleSize
    );
    if (characterCollide) {
      this.playerCharacter.isColliding = true;
    } else {
      this.playerCharacter.isColliding = false;
    }

    this.characterController.moveCharacter(
      this.playerCharacter,
      this.map.width,
      this.map.height
    );

    this.cameraController.moveCamera(
      this.camera,
      this.playerCharacter.x,
      this.playerCharacter.y,
      this.playerCharacter.width,
      this.playerCharacter.height,
      this.map.width,
      this.map.height
    );
  }
}
