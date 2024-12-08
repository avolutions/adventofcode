import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

// Split into lines
const lines = content
  .trim()
  .split("\n")

const results: number[] = [];
const values: number[][] = [];

const operatorCombinationsCache = new Map<number, string[][]>();

// Read everything left of : into results, everything right from it into values
lines.forEach(line => {
  const [left, right] = line
    .trim()
    .split(':');

  results.push(Number(left));
  values.push(right.trim().split(' ').map(Number));
});

let resultPart1 = 0;

// Iterate all result lines
for (let i = 0; i < results.length; i++) {
  const numbers = values[i];
  // Get all possible combinations for count of values
  const operators = getOperatorCombinations(numbers.length - 1);

  // Iterate all possible combinations of operator
  for (let j = 0; j < operators.length; j++) {
    let result = numbers[0];

    // Calculate all values with the given operator
    for (let k = 0; k < operators[j].length; k++) {
      if (operators[j][k] === '+') {
        result += numbers[k + 1];
      } else if (operators[j][k] === '*') {
        result *= numbers[k + 1];
      }
    }

    // If calculated values is same as result we stop checking for further combinations
    if (result === results[i]) {
      resultPart1 += result;
      break;
    }
  }
}

// Get an array of all possible combinations of operators
function getOperatorCombinations(n: number): string[][] {
  // Check if combinations for this 'n' are already cached
  if (operatorCombinationsCache.has(n)) {
    return operatorCombinationsCache.get(n)!;
  }

  const result: string[][] = [];
  const totalCombinations = 1 << n; // 2^n combinations

  for (let i = 0; i < totalCombinations; i++) {
      const combination: string[] = [];
      for (let bit = 0; bit < n; bit++) {
          combination.push((i >> bit) & 1 ? '+' : '*'); // Map 1 to '+' and 0 to '*'
      }
      result.push(combination);
  }

  // Store the result in the cache before returning
  operatorCombinationsCache.set(n, result);

  return result;
}

console.log('Part 1: ' + resultPart1);