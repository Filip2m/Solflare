import axios from 'axios';

const baseURL = "https://wallet-api.solflare.com"

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application-json',
    }
})

export default api