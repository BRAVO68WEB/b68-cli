import fetch from "node-fetch";
import APIURL from "../../api.config.js";

function secondsToHms(d) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

export default () => {
  let url = APIURL + "/ping";

  fetch(url).then(async (response) => {
    const data = await response.json();

    if (response.status === 200) {
      return console.log(
        `BRAVO68WEB API is up and running for ${secondsToHms(data.uptime)}`
      );
    } else {
      return console.log(`BRAVO68WEB API might be running low`);
    }
  });
};
