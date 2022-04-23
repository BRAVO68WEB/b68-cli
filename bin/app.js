#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

import status from "../bin/commands/status.js";
import discord from "../bin/commands/discord.js";

program
  .description(
    "A CLI tool to interact with BRAVO68WEB API hosted at https://api.b68dev.xyz"
  )
  .name("b68")
  .version("0.0.1")
  .usage("<command>");

program
  .command("status")
  .description("Get the status of the API")
  .action(status);

program
  .command("discord")
  .description("Get the Discord Status of the API")
  .option("-s, --spotify", "Get Spotify Status", false)
  .action((options) => {
    if (options.spotify) {
      discord.spotify();
    } else if (!options.spotify) {
      discord.userStatus();
    }
  });

// program
//   .command("discord")
//   .description("Get the Spotify Status of the API")
//   .option("-s, --spotify", "Get Spotify Status")
//   .action(discord.spotify);

program.parse(process.argv);
