import fetch from "node-fetch";
import moment from "moment";

export const userStatus = () => {
  let url = "https://api.b68dev.xyz/me/discord/activity";
  return fetch(url)
    .then(async (response) => {
      const data = await response.json();
      var statusObj;
      if (
        data.data.discord_status === "online" ||
        data.data.discord_status === "dnd" ||
        data.data.discord_status === "idle"
      ) {
        statusObj = "online";
      } else {
        statusObj = "offline";
      }
      if (response.status === 200) {
        return console.log(
          `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is ${statusObj} on Discord`
        );
      } else {
        return console.log(`BRAVO68WEB API might be running low`);
      }
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const spotify = () => {
  let url = "https://api.b68dev.xyz/me/discord/activity";
  return fetch(url)
    .then(async (response) => {
      const data = await response.json();
      var statusObj = {};
      if (data.data.listening_to_spotify) {
        statusObj.song = data.data.spotify.song;
        statusObj.artist = data.data.spotify.artist;
      } else {
        statusObj = "offline";
      }
      if (response.status === 200) {
        if (data.data.listening_to_spotify) {
          return console.log(
            `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is listening to ${statusObj.song} by ${statusObj.artist} on Spotify`
          );
        } else {
          return console.log(
            `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is not listening to Spotify according to Discord`
          );
        }
      } else {
        return console.log(`BRAVO68WEB API might be running low`);
      }
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const activity = () => {
  let url = "https://api.b68dev.xyz/me/discord/activity";
  return fetch(url)
    .then(async (response) => {
      const data = await response.json();
      var statusObj = {};
      var userAct = data.data.activities;
      var userDetails = data.data.discord_user;
      userDetails.avatar_url =
        "https://cdn.discordapp.com/avatars/" +
        userDetails.id +
        "/" +
        userDetails.avatar +
        ".png";
      var userActRevamped = userAct.reduce(function (map, obj) {
        var toShow = {};
        var assets = {};
        if (obj.assets) {
          if (obj.name === "Spotify") {
            assets = {
              large_image: data.data.spotify.album_art_url,
              large_text: data.data.spotify.album,
              small_image:
                "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png",
              small_text: data.data.spotify.artist,
            };
          } else {
            assets = {
              large_image:
                "https://cdn.discordapp.com/app-assets/" +
                obj.application_id +
                "/" +
                obj.assets.large_image,
              large_text: obj.assets.large_text,
              small_image:
                "https://cdn.discordapp.com/app-assets/" +
                obj.application_id +
                "/" +
                obj.assets.small_image,
              small_text: obj.assets.small_text,
            };
          }
        } else if (obj.name == "Custom Status") {
          assets = null;
        } else {
          assets = {
            large_image: "https://www.itsmebravo.dev/images/default_game.jpg",
            large_text: "Playing a game",
            small_image: "https://www.itsmebravo.dev/images/default_game.jpg",
            small_text: "Running an unknown application",
          };
        }
        toShow.state = obj.state;
        toShow.details = obj.details;
        toShow.startTime = obj.created_at;
        toShow.assets = assets;
        map[obj.name] = toShow;
        return map;
      }, {});
      if (data.data.activities.length > 0) {
        statusObj.activity = data.data.playing_activity;
      } else {
        statusObj = "offline";
      }
      if (response.status === 200) {
        if (data.data.activities.length > 0) {
          if (userActRevamped["Visual Studio Code"]) {
            return console.log(
              `${data.data.discord_user.username}#${
                data.data.discord_user.discriminator
              } is working on ${
                userActRevamped["Visual Studio Code"].details
              } in ${
                userActRevamped["Visual Studio Code"].state
              } inside Visual Studio Code since ${moment(
                userActRevamped["Visual Studio Code"].startTime
              ).format("DD-MM-YYYY h:mm:ss")}`
            );
          } else if (userActRevamped["Spotify"]) {
            return console.log(
              `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is listening to ${userActRevamped["Spotify"].details} by ${userActRevamped["Spotify"].state} on Spotify`
            );
          } else if (userActRevamped["Custom Status"]) {
            return console.log(
              `${data.data.discord_user.username}#${
                data.data.discord_user.discriminator
              } :- ${userActRevamped["Custom Status"].state} (${moment(
                userActRevamped["Custom Status"].startTime
              ).format("DD-MM-YYYY HH:mm:ss")})`
            );
          }
        } else if (data.data.activities.length > 0) {
          return console.log(
            `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is playing Games`
          );
        } else {
          return console.log(
            `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is not doing anything according to Discord`
          );
        }
      } else {
        return console.log(`BRAVO68WEB API might be running low`);
      }
    })
    .catch((err) => {
      return console.log(err);
    });
};

export default {
  userStatus,
  spotify,
  activity,
};
