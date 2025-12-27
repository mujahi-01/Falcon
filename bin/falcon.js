#!/usr/bin/env node

import { runFalcon } from "../src/index.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("❌ Usage: falcon <task description>");
  process.exit(1);
}

const userInput = args.join(" ");

runFalcon(userInput);
