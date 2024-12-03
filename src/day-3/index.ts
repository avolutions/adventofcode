import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

// Regex pattern to find mul(X,Y) where X and Y are 1-3 digits, do() and don't()
const pattern = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g;

let result = 0;
let resultWithDo = 0;
let enabled = true;

const matches = content.matchAll(pattern);

/**
 * match[1] = mul(x,y)
 * match[2] = x
 * match[3] = y
 * match[3] = do
 * match[4] = don't
 */
for (const match of matches) {
  if (match[1]) {
    const x = Number(match[2]);
    const y = Number(match[3]);

    // Add product to total result
    result += (x * y);

    if (enabled) {
      resultWithDo += (x * y);
    }
  }

  // Enable/disable multiplication
  if (match[4]) {
    enabled = true;
  } else if (match[5]) {
    enabled = false;
  }
}

console.log('Part 1: ' + result);
console.log('Part 2: ' + resultWithDo);