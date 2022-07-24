import axios from "axios";
import fs from "fs";
import APIURL from "../../api.config.js";
import Configstore from 'configstore';

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const configStore = new Configstore(packageJson.name);

export const login = (email, apiKey) => {
  console.log("Validation initaited ...");
  let axConfig = {
    method: "get",
    url: APIURL + "/api/auth/validate/" + email + "/" + apiKey,
  };
  axios(axConfig)
    .then(function (response) {
      if (response.data === "OK") {
        console.log("Credentials validated and Stored at " + configStore.path + "!");
        configStore.set('email', email);
        configStore.set('apiKey', apiKey);
        console.log("You are now authenticated as "+ configStore.get('email') +"!");
        process.exit(0);
      } else {
        console.log("Validation failed!");
        process.exit(1);
      }
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(
        "Unable to validate credentials please try again or check your credentials"
      );
    });
};

export const loginOtp = (email) => {
  console.log("OTP based Login initaited ...");
  let axConfig = {
    method: "get",
    url: APIURL + "/api/auth/otp/" + email,
  };
  axios(axConfig)
    .then(function (response) {
      if (response.data === "Login OTP was send") {
        console.log("OTP sent to " + email + " !!");  
        rl.question('Enter the OTP send to you :', function (otp) {
            if(otp){
              axConfig = {
                method: "post",
                url: APIURL + "/api/auth/otp/verify",
                data: {
                  email: email,
                  otp: otp
                }
              };
              axios(axConfig)
                .then(function (response) {
                  if (response.data.email === email) {
                    console.log(response.data)
                    console.log("Credentials validated and Stored at " + configStore.path + "!");
                    configStore.set('email', email);
                    configStore.set('apiKey', response.data.apiKey);
                    console.log("You are now authenticated as "+ configStore.get('email') +"!");
                  } else {
                    console.log("Validation failed!");
                    process.exit(1);
                  }
                  rl.close();
                })
                .catch(function (error) {
                  console.log(error.message);
                  console.log(
                    "Unable to validate credentials please try again or check your credentials"
                  );
                });
            }
        }); 
      } else {
        console.log("OTP failed!");
        process.exit(1);
      }
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(
        "Unable to send OTP please try again or check your credentials"
      );
    });
  rl.on('close', function () {
    process.exit(0);
  });   
}

export const register = (email) => {
  console.log("Registration initaited ...");
  let axConfig = {
    method: "get",
    url: APIURL + "/api/auth/reg?email=" + email,
  };
  axios(axConfig)
    .then(function (response) {
      if (response.data.email === email) {
        console.log("Registration successful !!");
      } else {
        console.log("Registration failed!");
        process.exit(1);
      }
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(
        "Unable to register please try again or check your credentials"
      );
    });
};

export const check = () => {
  console.log("Checking credentials ...");
  if(configStore.has('email') && configStore.has('apiKey')) {
    console.log("Credentials found at " + configStore.path + "!!");
  }
  else {
    console.error("Credentials not found !!");
    process.exit(1)
  }
  let axConfig = {
    method: "get",
    url: APIURL + "/api/auth/validate/" + configStore.get('email') + "/" + configStore.get('apiKey'),
  };
  axios(axConfig)
    .then(function (response) {
      if (response.data === "OK") {
        console.log("Credentials validated !!");
        console.log("You are logged in as " + configStore.get('email'));
        process.exit(0);
      } else {
        console.log("Credentials not validated!");
        process.exit(1);
      }
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(
        "Unable to check credentials please try again or check your credentials"
      );
    });
}

export const logout = () => {
  console.log("Logging out ...");
  configStore.delete('email');
  configStore.delete('apiKey');
  console.log("You are logged out");
  process.exit(0);
}

export default {
  login,
  register,
  check,
  logout,
  loginOtp
};
