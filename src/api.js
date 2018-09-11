
const token = require('variables/keys.json');

const baseUrl = "http://api.kmhfltest.health.go.ke/api/common";

const fetchData = async ({ type, paging = false, fields = "*" }) => {
    const headers = Object.assign({}, {
        Authorization: `Bearer ${token.accessToken}`
    });

    try {
        const request = await axios.get(`${baseUrl}/${type}?paging=${paging}&fields=${fields}`, {
            headers
        });
        if (request.ok) {
            return await request.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    fetchData
};