import axios from "axios";
import fs from "fs";
import os from "os";
import APIURL from "../../api.config.js";

const configPath = `${os.homedir()}/.b68-cli.authConfig.json`;

export const login = (email, apikey) => {
  console.log("Validation initaited ...");
  let config = {
    method: "get",
    url: APIURL + "/api/auth/validate/" + email + "/" + apikey,
  };
  axios(config)
    .then(function (response) {
      if (response.data === "OK") {
        console.log("Credentials validated !!");
        fs.open(configPath, "w", function (err, file) {
          fs.writeFile(
            file,
            `{\n\t"email": "${email}",\n\t"apikey": "${apikey}"\n}`,
            function (err) {
              if (err) throw err;
              console.log("Saved your auth configuration");
            }
          );
          if (err) throw err;
        });
      } else {
        console.log("Validation failed!");
      }
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(
        "Unable to validate credentials please try again or check your credentials"
      );
    });
};

export const register = (email) => {
  console.log("Registration initaited ...");
  let config = {
    method: "get",
    url: APIURL + "/api/auth/reg?email=" + email,
  };
  axios(config)
    .then(function (response) {
      if (response.data.email === email) {
        console.log("Registration successful !!");
      } else {
        console.log("Registration failed!");
      }
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(
        "Unable to register please try again or check your credentials"
      );
    });
};

export default {
  login,
  register,
};
