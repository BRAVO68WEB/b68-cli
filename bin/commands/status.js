import fetch from "node-fetch";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

export default () => {
  let url = "https://api.b68dev.xyz/ping";

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
