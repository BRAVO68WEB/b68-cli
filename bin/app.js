#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

import status from "../bin/commands/status.js";
import discord from "../bin/commands/discord.js";
import auth from "../bin/commands/auth.js";
import gists from "../bin/commands/gists.js";
import yt from "../bin/commands/yt.js";
import upload from "../bin/commands/upload.js";
import config from "../bin/commands/config.js";

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
  .command("yt")
  .description("Interact within Youtube API")
  .name("yt")
  .option("-vi, --video-info", "Get YT video info", false)
  .option("-ci, --channel-info", "Get YT channel info", false)
  .option("-pi, --playlist-info", "Get YT playlist info", false)
  .option("-pt, --playlist-items", "Get YT Playlist Items info", false)
  .option("-s, --spotify", "Get Spotify Equivalent", false)
  .argument("<url>", "url to interact with")
  .action((url, options) => {
    if (options.videoInfo) {
      yt.videoInfo(url);
    } else if (options.channelInfo) {
      yt.channelInfo(url);
    } else if (options.playlistInfo) {
      yt.playlistInfo(url);
    } else if (options.playlistItems) {
      yt.playlistItems(url);
    } else if (options.spotify) {
      yt.spotify(url);
    }
    else {
      console.log("Please specify a command");
      process.exit(1);
    }
  });

program
  .command("auth")
  .description("Authenticate with BRAVO68WEB API")
  .option("-l, --login", "Login to BRAVO68WEB API", false)
  .option("-o, --otp", "Login with OTP", false)
  .option("-r, --register", "Register with BRAVO68WEB API", false)
  .option("-c, --check", "Check if you are authenticated", false)
  .option("-d, --delete", "Delete your authentication token", false)
  .name("auth")
  .argument("[[email]", "email to login with")
  .argument("[apiKey]", "apiKey to login with")
  .action((email, apiKey, options) => {
    if (options.login) {
      if (!email || !apiKey) {
        console.log("Please provide an email and apiKey");
        process.exit(1);
      }
      auth.login(email, apiKey);
    }
    else if(options.otp){
      if (!email) {
        console.log("Please provide an email");
        process.exit(1);
      }
      auth.loginOtp(email);
    }
    else if (options.register) {
      if (!email) {
        console.log("Please provide an email");
        process.exit(1);
      }
      auth.register(email);
    }
    else if (options.check) {
      auth.check();
    }
    else if (options.delete) {
      auth.logout();
    }
    else {
      console.log("Please specify a command");
      process.exit(1);
    }
  });
  
const gistsCmds = program
  .command("gists")
  .description("Gists related commands");

gistsCmds
  .command("create")
  .description("Create gists at BRAVO68WEB API's Gists Store")
  .argument("<title>", "title of gist")
  .argument("<message>", "content of gist")
  .argument("<short>", "short description of gist")
  .argument("<tags>", "tags of gist")
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

program
  .command("config")
  .description("Configure the CLI")
  .action(() => {
    console.log("Configure the CLI");
    config.configure();
  })

program
  .command("upload")
  .description("Upload files to BRAVO68WEB API's File Store")
  .argument("<file>", "file to upload")
  .action((file) => {
    if (!file) {
      console.log("Please provide a file");
      return;
    }
    upload.upload(file);
  });

program.parse();
