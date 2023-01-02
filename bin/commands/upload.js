import fs from "fs";
import axios from 'axios';
import FormData from 'form-data'

const setup = () => {
    console.log("setup");
}

const upload = (file) => {
    let data = new FormData();
    data.append('image', fs.createReadStream(file));
    let config = {
        method: 'post',
        url: 'http://127.0.0.1:9000/api/private/files/image',
        headers: { 
            'apikey': '7c28ecd4-8bf6-4ae3-8d1a-c9860c19c813', 
            'email': 'bravo68web@gmail.com', 
            ...data.getHeaders()
        },
        data : data
    };

    return axios(config)
        .then(function (response) {
            console.log({
                "minifiedURL": response.data.minifiedURL,
            });
            process.exit(0);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

export default {
    setup,
    upload
}