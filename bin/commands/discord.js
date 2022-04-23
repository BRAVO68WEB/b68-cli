import fetch from "node-fetch";

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
        return console.log(
          `${data.data.discord_user.username}#${data.data.discord_user.discriminator} is listening to ${statusObj.song} by ${statusObj.artist} on Spotify`
        );
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
};
