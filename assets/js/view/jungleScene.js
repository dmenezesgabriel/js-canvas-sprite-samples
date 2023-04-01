import BlackKnight from "../characters/BlackKnight.js";
import TileMap from "../model/TileMap.js";
import BaseScene from "./BaseScene.js";

export default class JungleScene extends BaseScene {
  constructor(game) {
    super(game);
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

    this.game.player.character = new BlackKnight(
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

    this.game.camera.position.x = 780;
    this.game.camera.position.y = 0;
    this.game.player.character.x = 990;
    this.game.player.character.y = 30;

    this.world.addCollider(
      "playerBackgroundCollision",
      this.game.player.character,
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
      this.game.player.character,
      this.map.getLayer("path"),
      () => console.log("Player collided with path")
    );

    this.world.addCollider(
      "playerLagoonCollision",
      this.game.player.character,
      this.map.getLayer("lagoon"),
      () => console.log("Player collided with lagoon")
    );
    this.world.addCollider(
      "playerBushesCollision",
      this.game.player.character,
      this.map.getLayer("bushes"),
      () => console.log("Player collided with bushes")
    );

    this.world.addCollider(
      "playerTreesCollision",
      this.game.player.character,
      this.map.getLayer("trees"),
      () => console.log("Player collided with trees")
    );

    this.game.display.on("mousedown", (x, y) => {
      console.log("Clicked", "x: ", x, " y: ", y);
      this.game.playerController.moveCharacterToCoordinates(
        this.game.player.character,
        null,
        x,
        y
      );
    });
  }

  update() {
    if (this.game.playerController.moving === true) {
      this.game.player.character.moving = true;
    } else {
      this.game.player.character.moving = false;
    }

    // Draw
    this.game.display.beforeDraw(this.game.camera);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name != "foreground") layerObject.draw(this.game.display);
    }

    this.game.player.character.draw(this.game.display);

    for (const key of Object.keys(this.map.layers)) {
      const layerObject = this.map.layers[key];
      if (layerObject.name === "foreground")
        layerObject.draw(this.game.display);
    }

    this.game.display.afterDraw();

    this.game.playerController.moveCharacter(
      this.game.player.character,
      this.map.width,
      this.map.height
    );

    this.game.cameraController.moveCamera(
      this.game.camera,
      this.game.player.character.x,
      this.game.player.character.y,
      this.game.player.character.width,
      this.game.player.character.height,
      this.map.width,
      this.map.height
    );
  }
}
