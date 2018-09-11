import axios from 'axios';

const token = require('variables/keys.json');

const requestResponse = (baseURL, apiEndPoint, params, fields, format)=> {
    axios.get(`${baseURL}/api/${apiEndPoint}/?${params}&fields=${fields}&format=${format}`, {
        headers:
            { Authorization: `Bearer ${token.accessToken}` }
    })
        .then((response) => {
            console.log(response.data);
            return (response.data);
        })
        .catch((error) => {
            console.error(error);

        })
};

export {
    requestResponse
}
