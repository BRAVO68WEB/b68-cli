import axios from "axios";
import moment from "moment";
import APIURL from "../../api.config.js";

export const create = (title, message, short, tags) => {
  console.log("Saving your gist ...");
  console.log(" ");

  let data = JSON.stringify({
    title: title,
    short: short,
    message: message,
    tags: tags.split(",", 2),
  });

  let config = {
    method: "post",
    url: APIURL + "/api/public/gists",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(
        "Gist saved successfully at " +
          APIURL +
          "/api/public/gists/" +
          response.data.id
      );
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const view = (id) => {
  console.log("Fetching your gist ...");
  console.log(" ");
  let config = {
    method: "get",
    url: APIURL + "/api/public/gists/" + id,
  };

  axios(config)
    .then(function (response) {
      console.log("Tiltle: " + response.data.title);
      console.log("Short: " + response.data.short);
      console.log("Message: " + response.data.message);
      console.log("Tags: " + response.data.tags);
      console.log(
        "Created at: " +
          moment(response.data.createdAt).format("DD-MM-YYYY HH:mm:ss")
      );
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export default {
  create,
  view,
};
