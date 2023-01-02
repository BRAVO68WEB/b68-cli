import auth from "./auth.js";
import readline from 'readline';

export const configure = () => {
    console.log("Configure the CLI");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter Safe Auth Token :- ', function (otp) {
        if(otp){
            auth.configStore.set('safeToken', otp);
        } else {
            console.log("OTP is required");
        }
        rl.close();
    })
    rl.close();
}

