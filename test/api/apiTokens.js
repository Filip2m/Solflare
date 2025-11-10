import api from './apiClient.js'

/**
 * @param network defines from which network we are getting tokens
 * @param adress defines portfolio/tokens adress
 * @param token represents Bearer {uuid4} token  
 * */ 
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
