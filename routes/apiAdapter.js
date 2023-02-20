const axios = require('axios');
const { TIME_OUT } = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: parseInt(TIME_OUT) 
    })
}