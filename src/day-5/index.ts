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

let count = 0;

// Check each update
for (const update of updates) {

  // Find all rules that applies for this update
  const appliedRules = rules
    .filter(rule => rule.every(rulePart => update.includes(rulePart)));

  // Find all rules that applies for this update but does not fulfill the condition
  const notFulfilledRules = appliedRules
    .filter(rule => update.indexOf(rule[0]) > update.indexOf(rule[1]));


  if (notFulfilledRules.length === 0) {
    // Get middle element from update array
    const middleNumber = update[(Math.floor(update.length / 2))];

    count += middleNumber
  }
}

console.log('Part 1: ' + count);