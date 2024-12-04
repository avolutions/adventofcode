import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

const searchTerm = 'XMAS';
let count = 0;

// Steps while searching in a direction: [row, col]
const searchDirections: { [key: string]: number[] } = {
  up: [-1, 0],
  upright: [-1, 1],
  right: [0, 1],
  downright: [1, 1],
  down: [1, 0],
  downleft: [1, -1],
  left: [0, -1],
  upleft: [-1, -1]
}

// Create a grid (multi-dimensional array) for easier work
const grid = content
  .trim()
  .split('\n')
  .map(line => line.trim().split(''));

// Iterate through whole grid
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    // If current letter is first letter of search term, in our case 'X'
    if (grid[row][col] === searchTerm[0]) {
      count += (searchInAllDirections(col, row));
    }
  }
}

function searchInAllDirections(col: number, row: number): number {
  let termsFound = 0;

  // Search in all directions
  for (const direction in searchDirections) {
    let found = true;

    // Get steps for current direction
    const [x, y] = searchDirections[direction];

    // Search as many steps in the current direction as the search term has letters
    for (let i = 0; i < searchTerm.length; i++) {
      const searchRow = row + (i * x);
      const searchCol = col + (i * y);

      // If new search position is not valid and letter does not match search term
      if (!grid[searchRow]?.[searchCol] || grid[searchRow]?.[searchCol] !== searchTerm[i]) {
        found = false;
        break;
      }
    }

    if (found) {
      termsFound++;
    }
  }

  return termsFound;
}

console.log('Part 1: ' + count);