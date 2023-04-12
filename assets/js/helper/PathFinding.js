import GridPoint from "../model/GridPoint.js";

export default class PathFinding {
  constructor() {
    this.grid = null;
  }

  init() {
    // w40 x h30 tileMap
    const gridRows = 30;
    const gridCols = 40;

    this.grid = new Array(gridCols);
    for (let col = 0; col < gridCols; col++) {
      this.grid[col] = new Array(gridRows);
    }

    for (let col = 0; col < gridCols; col++) {
      for (let row = 0; row < gridRows; row++) {
        this.grid[col][row] = new GridPoint(col, row);
      }
    }

    for (let col = 0; col < gridCols; col++) {
      for (let row = 0; row < gridRows; row++) {
        this.grid[col][row].updateNeighbors(this.grid);
      }
    }
  }

  heuristic(pointA, pointB) {
    let xDistance = Math.abs(pointB.x - pointA.x);
    let yDistance = Math.abs(pointB.y - pointA.y);

    return xDistance + yDistance;
  }

  search(dynamicBody, targetX, targetY) {
    const unevaluatedPoints = [];
    const evaluatedPoints = [];
    const path = [];

    const tileSize = 16;
    const tileScaleSize = 2;
    const start = {};
    const end = {};

    let counter = 0;

    this.init();

    start.x = Math.ceil(dynamicBody.position.x / (tileSize * tileScaleSize));
    start.y = Math.ceil(dynamicBody.position.y / (tileSize * tileScaleSize));
    end.x = Math.ceil(targetX / (tileSize * tileScaleSize));
    end.y = Math.ceil(targetY / (tileSize * tileScaleSize));

    console.log("start", start);
    console.log("end", end);

    unevaluatedPoints.push(this.grid[start.x][start.y]);
    while (unevaluatedPoints.length > 0) {
      //
      counter++;
      if (counter > 10000) {
        console.log("More than 10k iteration");
        break;
      }
      //

      let lowestIndex = 0;
      for (
        let unevaluatedIndex = 0;
        unevaluatedIndex < unevaluatedPoints.length;
        unevaluatedIndex++
      ) {
        if (
          unevaluatedPoints[unevaluatedIndex].totalCost <
          unevaluatedPoints[lowestIndex].totalCost
        ) {
          lowestIndex = unevaluatedIndex;
        }
      }
      let currentPoint = unevaluatedPoints[lowestIndex];

      if (currentPoint.x === end.x && currentPoint.y === end.y) {
        let temp = currentPoint;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        return path.reverse();
      }

      unevaluatedPoints.splice(lowestIndex, 1);
      evaluatedPoints.push(currentPoint);

      let neighbors = currentPoint.neighbors;

      for (
        let neighborsIndex = 0;
        neighborsIndex < neighbors.length;
        neighborsIndex++
      ) {
        let currentNeighbor = neighbors[neighborsIndex];

        if (!evaluatedPoints.includes(currentNeighbor)) {
          let possibleCostFromStartingPointToThis =
            currentPoint.costFromStartingPointToThis + 1;

          if (!evaluatedPoints.includes(currentNeighbor)) {
            unevaluatedPoints.push(currentNeighbor);
          } else if (
            possibleCostFromStartingPointToThis >=
            currentNeighbor.costFromStartingPointToThis
          ) {
            continue;
          }
          currentNeighbor.costFromStartingPointToThis =
            possibleCostFromStartingPointToThis;

          currentNeighbor.estimatedCostFromThisToGoal = this.heuristic(
            currentNeighbor,
            end
          );

          currentNeighbor.totalCost =
            currentNeighbor.costFromStartingPointToThis +
            currentNeighbor.estimatedCostFromThisToGoal;

          currentNeighbor.parent = currentPoint;
        }
      }
    }

    return [];
  }
}
