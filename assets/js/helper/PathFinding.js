class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.totalCost = 0;
    this.costFromStartingPointToThis = 0;
    this.estimatedCostFromThisToGoal = 0;
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
    this.start = null;
    this.end = null;
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
    for (let col = 1; col < gridCols; col++) {
      this.grid[col] = new Array(gridRows);
    }

    for (let col = 1; col < gridCols; col++) {
      for (let row = 1; row < gridRows; row++) {
        this.grid[col][row] = new Point(col, row);
      }
    }

    for (let col = 1; col < gridCols; col++) {
      for (let row = 1; row < gridRows; row++) {
        this.grid[col][row].updateNeighbors(this.grid);
      }
    }

    console.log(this.grid);
  }

  search(dynamicBody, targetX, targetY) {
    this.init();
    const start = {};
    const end = {};
    start.x = Math.ceil(dynamicBody.position.x / (16 * 2));
    start.y = Math.ceil(dynamicBody.position.y / (16 * 2));
    end.x = Math.ceil(targetX / (16 * 2));
    end.y = Math.ceil(targetY / (16 * 2));

    console.log(start);
    console.log(end);

    return this.path;
  }
}
