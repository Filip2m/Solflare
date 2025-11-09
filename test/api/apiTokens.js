import api from './apiClient.js'
async function getTokens (network, adress, token) {
    const requestConfig ={
        headers: {
                Authorization: `${token}`
            }             
    }
    if(network != ""){
        requestConfig.params = { network }
    }
    const response = await api.get(`/v3/portfolio/tokens/${adress}`, requestConfig)
    return response
}

export default getTokens