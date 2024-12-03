import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

const leftValues: number[] = [];
const rightValues: number[] = [];

// Split the content into lines
const lines = content.trim().split("\n");

// Process each line and split into columns
lines.forEach(line => {
  const [left, right] = line
    .trim()
    .split(/\s+/)
    .map(Number); // Split by spaces or tabs and convert to numbers

  leftValues.push(left);
  rightValues.push(right);
});

// Sort arrays in ascending order
leftValues.sort((a, b) => a - b);
rightValues.sort((a, b) => a - b);

// Calculate distance between the values
const distance = leftValues.reduce((sum, left, index) => {
  return sum + Math.abs(left - rightValues[index]);
}, 0);

console.log("Part 1: " + distance);