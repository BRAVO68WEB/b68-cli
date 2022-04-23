#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs";

const options = yargs().usage("Usage: -n <name>").option("n", {
  alias: "name",
  describe: "Your name",
  type: "string",
  demandOption: true,
}).argv;
const greeting = `Hello, ${options.name}!`;

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};

console.log(greeting);
