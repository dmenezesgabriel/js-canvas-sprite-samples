class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.totalCost = 0; // f
    this.costFromStartingPointToThis = 0; // g
    this.estimatedCostFromThisToGoal = 0; // h
    this.neighbors = [];
    this.parent = null;
  }

  updateNeighbors(grid) {
    if (grid[this.x + 1] && grid[this.x + 1][this.y]) {
      this.neighbors.push(grid[this.x + 1][this.y]);
    }
    if (grid[this.x - 1] && grid[this.x - 1][this.y]) {
      this.neighbors.push(grid[this.x - 1][this.y]);
    }
    if (grid[this.x] && grid[this.x][this.y + 1]) {
      this.neighbors.push(grid[this.x][this.y + 1]);
    }
    if (grid[this.x] && grid[this.x][this.y - 1]) {
      this.neighbors.push(grid[this.x][this.y - 1]);
    }
  }
}

export default class PathFinding {
  constructor() {
    this.grid = null;
    this.unevaluatedPoints = [];
    this.evaluatedPoints = [];
    this.path = [];
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
        this.grid[col][row] = new Point(col, row);
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

    this.unevaluatedPoints.push(this.grid[start.x][start.y]);
    while (this.unevaluatedPoints.length > 0) {
      //
      counter++;
      if (counter > 5000) {
        break;
      }
      console.log("running");
      //

      let lowestIndex = 0;
      for (
        let unevaluatedIndex = 0;
        unevaluatedIndex < this.unevaluatedPoints.length;
        unevaluatedIndex++
      ) {
        if (
          this.unevaluatedPoints[unevaluatedIndex].totalCost <
          this.unevaluatedPoints[lowestIndex].totalCost
        ) {
          lowestIndex = unevaluatedIndex;
        }
      }
      let currentPoint = this.unevaluatedPoints[lowestIndex];

      if (currentPoint.x === end.x && currentPoint.y === end.y) {
        let temp = currentPoint;
        this.path.push(temp);
        while (temp.parent) {
          this.path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        return this.path.reverse();
      }

      this.unevaluatedPoints.splice(lowestIndex, 1);
      this.evaluatedPoints.push(currentPoint);

      let neighbors = currentPoint.neighbors;

      for (
        let neighborsIndex = 0;
        neighborsIndex < neighbors.length;
        neighborsIndex++
      ) {
        let currentNeighbor = neighbors[neighborsIndex];

        if (!this.evaluatedPoints.includes(currentNeighbor)) {
          let possibleCostFromStartingPointToThis =
            currentPoint.costFromStartingPointToThis + 1;

          if (!this.evaluatedPoints.includes(currentNeighbor)) {
            this.unevaluatedPoints.push(currentNeighbor);
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
