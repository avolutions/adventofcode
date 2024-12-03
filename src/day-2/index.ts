import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

// Split the input into lines and map each line into an array of numbers
const reports = content
  .trim()
  .split("\n")
  .map(line => line.split(" ").map(Number));

let safeReports = 0;
let safeWithToleranceReports = 0;

for (const report of reports) {
  if (isSafe(report)) {
    safeReports++;
    safeWithToleranceReports++;
  } else {
    if (isSafeWithTolerance(report)) {
      safeWithToleranceReports++;
    }
  }
}

console.log('Part 1: ' + safeReports);
console.log('Part 2: ' + safeWithToleranceReports);

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

function isSafeWithTolerance(report: number[]): boolean {
  for (let i = 0; i < report.length; i++) {
    // Create a new array with the i-th element removed
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];

    // Check if the modified report is safe
    if (isSafe(modifiedReport)) {
      return true;
    }
  }

  return false; // No valid combination found
}