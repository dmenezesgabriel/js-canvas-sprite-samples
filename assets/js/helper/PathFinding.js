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

  updateNeighbors(speed) {
    this.neighbors.push(this.x + speed);
    this.neighbors.push(this.x - speed);
    this.neighbors.push(this.y + speed);
    this.neighbors.push(this.y - speed);
  }
}

export default class PathFinding {
  constructor() {
    this.unevaluatedPoints = [];
    this.evaluatedPoints = [];
    this.path = [];
  }

  search(DynamicBody, tileMapLayers, targetX, targetY) {
    const start = {};
    const end = {};
    start.x = DynamicBody.x;
    start.y = DynamicBody.y;
    end.x = targetX;
    end.y = targetY;

    const startPoint = new Point(start.x, start.y);
    startPoint.updateNeighbors(DynamicBody.speed);

    return this.path;
  }
}