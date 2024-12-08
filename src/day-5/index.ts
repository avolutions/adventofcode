import { readFileFromCurrentDirectory } from '../utils/readFile.js';

const content = readFileFromCurrentDirectory();

const [rawRules, rawUpdates] = content.trim().split(/\r?\n\r?\n/);

// Read rules x|y into array [ x, y ]
const rules = rawRules
  .trim()
  .split('\n')
  .map(rule => rule
    .trim()
    .split('|')
    .map(Number)
  );

// Read updates x,y,z into array [ x, y, z ]
const updates = rawUpdates
  .trim()
  .split('\n')
  .map(rule => rule
    .trim()
    .split(',')
    .map(Number)
  );

let countPart1 = 0;
let countPart2 = 0;

// Check each update
for (let update of updates) {

  // Find all rules that applies for this update
  const appliedRules = rules
    .filter(rule => rule.every(rulePart => update.includes(rulePart)));

  // Find all rules that applies for this update but does not fulfill the condition
  const notFulfilledRules = appliedRules
    .filter(rule => update.indexOf(rule[0]) > update.indexOf(rule[1]));

  if (notFulfilledRules.length === 0) {
    // Get middle element from update array
    countPart1 += getMiddleItem(update);
  } else {
    // TODO: order update
    update = reorder(update, notFulfilledRules);

    countPart2 += getMiddleItem(update);
  }
}

function reorder(items: number[], rules: number[][]): number[] {
  return items.sort((a, b) => {
    // Check if there is a rule that requires "a" before "b"
    if (rules.some(([first, second]) => first === a && second === b)) {
      return -1; // "a" before "b"
    }

    // Check if there is a rule that requires "b" before "a"
    if (rules.some(([first, second]) => first === b && second === a)) {
      return 1; // "b" before "a"
    }

    // No rule applies -> original order
    return 0;
  });
}

function getMiddleItem(items: number[]): number {
  return items[(Math.floor(items.length / 2))];
}

console.log('Part 1: ' + countPart1);
console.log('Part 2: ' + countPart2);