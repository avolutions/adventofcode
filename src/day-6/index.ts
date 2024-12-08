import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

const grid = content
  .trim()
  .split('\n')
  .map(line => line.trim().split(''));

const gridWidth = grid[0].length;
const gridHeight = grid.length;

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1]
}

const visitedPositions: [number, number][] = [];

let row = grid.findIndex((line) => line.includes("^"));
let col = grid[row].indexOf("^");

let currentDirection = directions.up;

while(true) {
  let nextRow = row + currentDirection[0];
  let nextCol = col + currentDirection[1];

  // If new position is outside the grid we stop moving around
  if (isOutsideGrid(nextRow, nextCol)) {
    break;
  }

  // Check the next position, if '#' we turn 90° right and continue to walk
  const nextPosition = grid[nextRow][nextCol];
  if (nextPosition === '#') {
    turn();
    continue;
  }

  // Add new position to visited position, but only if not already there
  if (!visitedPositions.some(([x, y]) => x === nextRow && y === nextCol)) {
    visitedPositions.push([nextRow, nextCol]);
  }

  // Move to new position
  row = nextRow;
  col = nextCol;
}

function isOutsideGrid(row: number, col: number): boolean {
  return row < 0
    || row >= gridHeight
    || col < 0
    || col >= gridWidth;
}

function turn() {
  switch (currentDirection) {
    case directions.up:
      currentDirection = directions.right
      break;

    case directions.right:
      currentDirection = directions.down
      break;

    case directions.down:
      currentDirection = directions.left
      break;

    case directions.left:
      currentDirection = directions.up
      break;
  }
}

console.log('Part 1: ' + visitedPositions.length);