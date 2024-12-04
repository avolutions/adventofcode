import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

const searchTerm = 'XMAS';
let countPart1 = 0;
let countPart2 = 0;

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
      countPart1 += countInAllDirections(row, col);
    }

    // If current letter is 'A' we check for X pattern
    if (grid[row][col] === 'A') {
      if (checkPattern(row, col)) {
        countPart2++;
      }
    }
  }
}

function countInAllDirections(row: number, col: number): number {
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

function checkPattern(row: number, col: number): boolean {
  const searchTerms = ['MAS', 'SAM'];
  const center = grid[row][col];

  const topleft = grid[row - 1]?.[col - 1];
  const bottomright = grid[row + 1]?.[col + 1];

  const topright = grid[row - 1]?.[col + 1];
  const bottomleft = grid[row + 1]?.[col - 1];

  const diagonal1 = [
    topleft,
    center,
    bottomright
  ].join('');

  const diagonal2 = [
    topright,
    center,
    bottomleft
  ].join('');

  if (searchTerms.includes(diagonal1) && searchTerms.includes(diagonal2)) {
    return true;
  }

  return false;
}

console.log('Part 1: ' + countPart1);
console.log('Part 2: ' + countPart2);