import axios from "axios";
import fs from "fs";
export const login = (email, apikey) => {
  console.log("Validation initaited ...");
  var config = {
    method: "get",
    url: "https://api.b68dev.xyz/api/auth/validate/" + email + "/" + apikey,
  };
  axios(config)
    .then(function (response) {
      if (response.data === "OK") {
        console.log("Credentials validated !!");
        fs.open("authConfig.json", "w", function (err, file) {
          fs.appendFile(
            "authConfig.json",
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

export default {
  login,
};
