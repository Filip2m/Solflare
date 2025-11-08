const axios = require('axios');

const baseURL = "https://wallet-api.solflare.com"

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application-json',
    }
})

module.exports = api