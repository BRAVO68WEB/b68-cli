import axios from "axios";
import moment from "moment";
export const create = (title, short, message, tags) => {
  console.log("Saving your gist ...");
  console.log(" ");

  var data = JSON.stringify({
    title: title,
    short: short,
    message: message,
    tags: tags.split(",", 2),
  });

  var config = {
    method: "post",
    url: "https://api.b68dev.xyz/api/public/gists",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(
        "Gist saved successfully at " +
          "https://api.b68dev.xyz/api/public/gists/" +
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
  var config = {
    method: "get",
    url: "https://api.b68dev.xyz/api/public/gists/" + id,
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
      console.log(error);
    });
};
export default {
  create,
  view,
};
