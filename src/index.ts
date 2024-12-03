import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import inquirer from "inquirer";

const chalk = require("chalk");

const distDir = path.resolve(__dirname); // Use __dirname as usual

async function listDays(): Promise<string> {
  const days = fs
    .readdirSync(distDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith("day-"))
    .map(dirent => dirent.name);

  if (days.length === 0) {
    console.log(chalk.red("No days available."));
    process.exit(1);
  }

  const choices = days.map(day => ({
    name: `Day ${day.split("-")[1]}`, // Display as "Day N"
    value: day, // Pass the original directory name
  }));

  const { selectedDay } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedDay",
      message: "Select a day to execute:",
      choices
    },
  ]);

  return selectedDay;
}

function runDay(day: string) {
  const dayAsNumber = parseInt(day.split("-")[1], 10);
  const dayPath = path.join(distDir, day, "index.js");
  if (!fs.existsSync(dayPath)) {
    console.log(chalk.red(`No solution for day ${dayAsNumber} found!`));
    process.exit(1);
  }

  console.log(chalk.green(`Executing solution for day ${dayAsNumber}...\nResults:\n`));
  exec(`node ${dayPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      return;
    }
    if (stderr) {
      console.error(chalk.yellow(`stderr: ${stderr}`));
    }
    console.log(chalk.blue(stdout));
  });
}

async function main() {
  const [, , dayArg] = process.argv;

  if (dayArg) {
    const dayFolder = `day-${dayArg}`;
    runDay(dayFolder);
  } else {
    const selectedDay = await listDays();
    runDay(selectedDay);
  }
}

main().catch(error => console.error(chalk.red(error.message)));
