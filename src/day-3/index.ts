import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

// Regex pattern to find mul(X,Y) where X and Y are 1-3 digits
const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

let result = 0;

const matches = content.matchAll(pattern);

for (const match of matches) {
  const x = Number(match[1]); // Convert match[1] to a number
  const y = Number(match[2]); // Convert match[2] to a number

  result += (x * y);
}

console.log('Part 1: ' + result);