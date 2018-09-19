import axios from "axios";
const queryString = require('query-string');

const data = {
    grant_type: "password",
    client_id: "a3UXT427j160XpW1CcmMWqq7FLdkgTfH2NZlDHzV",
    client_secret: "Lf3lZv9XYG2p3S7nsy2sy580mDuB9ajDY6M39FIfEEzhNLua1LBY1LB1EV0NdQFClsqSvUnvpkDi8V7XTiVEXIzLtzH3MCMcO3SQblzbqlhpy97d2TamfSDsNoa6HVrJ",
    scope: "read write",
    username: "test@mail.com",
    password: "test@1234"
};

let fetchedToken = null;



axios.post("http://api.kmhfltest.health.go.ke/o/token/", queryString.stringify(data))
    .then(response => {
        console.log(response.data);
        fetchedToken = response.data;
        console.log('userresponse ' + response.data.access_token);
    })
    .catch((error) => {
        console.log('error ' + error);
    });

export default fetchedToken;
