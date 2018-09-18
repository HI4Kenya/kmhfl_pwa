import axios from 'axios';

const token = require('variables/keys.json');

const requestResponse = async (baseURL, apiEndPoint, params, fields, format) => {
    try {
        const result = await axios.get(`${baseURL}/api/${apiEndPoint}/?${params}&fields=${fields}&format=${format}`, {
            headers:
                { Authorization: `Bearer ${token.accessToken}` }
        })
        return await result;
    } catch (error) {
        console.error(error);
    }
};

export {
    requestResponse
}
