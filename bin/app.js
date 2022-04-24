#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

import status from "../bin/commands/status.js";
import discord from "../bin/commands/discord.js";
import auth from "../bin/commands/auth.js";
import gists from "../bin/commands/gists.js";

program
  .name("b68")
  .description(
    "A CLI tool to interact with BRAVO68WEB API hosted at https://api.b68dev.xyz"
  )
  .version("0.0.1")
  .usage("<command>");

program
  .command("status")
  .name("status")
  .description("Get the status of the API")
  .action(status);

program
  .command("discord")
  .description("Get the Discord Status of the API")
  .name("discord")
  .option("-s, --spotify", "Get Spotify listening", false)
  .option("-a, --activity", "Get Playing activity", false)
  .action((options) => {
    if (options.spotify) {
      discord.spotify();
    } else if (options.activity) {
      discord.activity();
    } else {
      discord.userStatus();
    }
  });

program
  .command("auth")
  .description("Authenticate with BRAVO68WEB API")
  .option("-l, --login", "Login to BRAVO68WEB API", false)
  .name("auth")
  .argument("<email>", {
    name: "email",
    required: false,
    description: "email to login with",
  })
  .argument("[apikey]", {
    name: "apikey",
    required: false,
    description: "apikey to login with",
  })
  .action((email, apikey, options) => {
    if (options.login) {
      if (!email || !apikey) {
        console.log("Please provide an email and apikey");
        return;
      }
      auth.login(email, apikey);
    } else {
      return console.log("Please specify a command");
    }
  });
const gistsCmds = program.command("gists");

gistsCmds
  .command("create")
  .description("Create gists at BRAVO68WEB API's Gists Store")
  .argument("[title]", "title of gist")
  .argument("[message]", "content of gist")
  .argument("[short]", "short description of gist")
  .argument("[tags]", "tags of gist")
  .action((title, message, short, tags) => {
    if (!title || !message) {
      console.log("Please provide a title and message");
      return;
    }
    if (!short) {
      short = "";
    }
    if (!tags) {
      tags = "";
    }
    gists.create(title, message, short, tags);
  });

gistsCmds
  .command("view")
  .description("View gists at BRAVO68WEB API's Gists Store")
  .argument("[id]", "id of gist")
  .action((id) => {
    if (!id) {
      console.log("Please provide an id");
      return;
    }
    gists.view(id);
  });

program.parse();
