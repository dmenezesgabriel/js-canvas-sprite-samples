export default class GridPoint {
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
