import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

// Split the input into lines and map each line into an array of numbers
const reports = content
  .trim()
  .split("\n")
  .map(line => line.split(" ").map(Number));

let safeReports = 0;
for (const report of reports) {
  if (isSafe(report)) {
    safeReports++;
  }
}

console.log('Part 1: ' + safeReports);

function isSafe(array: number[]): boolean {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < array.length; i++) {
    const step = Math.abs(array[i] - array[i - 1]);

    // Check if the step size (1, 2 or 3) is valid
    if (step > 3 || step < 1) {
      return false;
    }

    if (array[i] > array[i - 1]) {
      decreasing = false; // It's not decreasing
    } else if (array[i] < array[i - 1]) {
      increasing = false; // It's not increasing
    }

    // If it's neither increasing nor decreasing
    if (!increasing && !decreasing) {
      return false;
    }
  }

  return true; // It's safe
}