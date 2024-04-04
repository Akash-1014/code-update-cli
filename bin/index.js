#!/usr/bin/env node

import inquirer from "inquirer";
import { runBasicExample } from "../src/commands/basic-example.js";
import { runChalkExample } from "../src/commands/chalk-example.js";
import { runFigletExample } from "../src/commands/figlet-example.js";
import { execSync } from "child_process";
import chalk from "chalk";

const examples = {
  "Commit on Local and update QA & Stage": runBasicExample,
  "Commit on Local and update QA ": runChalkExample,
  "Commit on Local and update  Stage": runFigletExample,
};

inquirer.prompt([
  {
    type: "list",
    name: "selectedExample",
    message: "Choose an example to run:",
    choices: Object.keys(examples),
  },
  {
    type: "input", // Type of prompt (e.g., input, list, password)
    name: "commitMsg", // Name to access the answer in the response object
    message: "Enter commit messge", // Question to display to the user
  },
  // ... more questions
]);
inquirer
  .prompt([
    /* ... prompts */
  ])
  .then((answers) => {
    try {
      // Perform Git operations
      execSync("git add ."); // Stage all changes
      execSync(`git commit -m "${answers.commitMsg}"`);
      chalk.greenBright("Commit sucessfully"); // Commit with user-provided message

      // Run the selected example
      examples[answers.selectedExample](answers);
    } catch (error) {
      // Handle any errors during Git operations or example execution
      console.log("");
      chalk.redBright("Error:", error);
    }
  });
