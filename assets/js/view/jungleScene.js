import Character from "../model/Character.js";
import TileMap from "../model/TileMap.js";
import BaseScene from "./BaseScene.js";

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

    const jungleTileAtlas = new Image();
    jungleTileAtlas.src = "assets/img/tf_jungle_tileset.png";

    const getJungleMap = await fetch("resources/jungle_map.json");
    const jungleMap = await getJungleMap.json();

    const getJungleTileSetProperties = await fetch(
      "resources/tf_jungle_tileset.json"
    );
    const jungleTileSetProperties = await getJungleTileSetProperties.json();

    this.map = new TileMap("jungle", jungleMap, 16, 2);

    const layerNames = [
      "background",
      "path",
      "lagoon",
      "trees",
      "bushes",
      "foreground",
    ];
    for (const name of layerNames) {
      this.map.addLayer(
        name,
        jungleTileAtlas,
        22,
        jungleTileSetProperties,
        16,
        2
      );
    }

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

    this.world.addCollider(
      "playerBackgroundCollision",
      this.playerCharacter,
      this.map.getLayer("background"),
      (objectA, objectB) =>
        console.log("Player collided with background", objectA)
    );

    this.world.addCollider(
      "player-trees-collision",
      this.playerCharacter,
      this.map.getLayer("trees"),
      () => console.log("Player collided with trees")
    );
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
