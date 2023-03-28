import BlackKnight from "../characters/BlackKnight.js";
import TileMap from "../model/TileMap.js";
import BaseScene from "./BaseScene.js";

export default class JungleScene extends BaseScene {
  constructor(display, camera, cameraController, playerController) {
    super(display);
    this.camera = camera;
    this.cameraController = cameraController;
    this.playerController = playerController;
    this.maps = {};
  }

  async create() {
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

    this.playerCharacter = new BlackKnight(
      "Black Knight",
      0,
      0,
      26,
      36,
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
      (objectA, objectB) => {
        console.log("Player collided with background");

        // Damage
        objectA.health = objectA.health - 10;
        objectA.inBattle = true;
        console.log(objectA.health);
      }
    );

    this.world.addCollider(
      "playerPathCollision",
      this.playerCharacter,
      this.map.getLayer("path"),
      () => console.log("Player collided with path")
    );

    this.world.addCollider(
      "playerLagoonCollision",
      this.playerCharacter,
      this.map.getLayer("lagoon"),
      () => console.log("Player collided with lagoon")
    );
    this.world.addCollider(
      "playerBushesCollision",
      this.playerCharacter,
      this.map.getLayer("bushes"),
      () => console.log("Player collided with bushes")
    );

    this.world.addCollider(
      "playerTreesCollision",
      this.playerCharacter,
      this.map.getLayer("trees"),
      () => console.log("Player collided with trees")
    );
  }

  update() {
    if (this.playerController.moving === true) {
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

    this.playerController.moveCharacter(
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
