import { expect } from 'chai'
import  getTokens  from '../../api/apiTokens.js'
import {REQ_ADRESS, NETWORK_DEVNET, AUTH_TOKEN, NETWORK_MAINNET, NETWORK_TESTNET} from '../../data/constants.js'

let response

describe('Break the API', function () {

    it('Send empty network param', async function () {
        try{
            response = await getTokens (" ", REQ_ADRESS, AUTH_TOKEN)
        } catch (e) {
            response = e.response
        }
        expect(response.data.message === '"network" must be one of [mainnet, devnet, testnet]')
        expect(response.status === 400).to.be.true
    })

    it('Send invalid network param', async function () {
        try{
            response = await getTokens ("INVALID", REQ_ADRESS, AUTH_TOKEN)
        } catch (e) {
            response = e.response
        }
        expect(response.data.message === '"network" must be one of [mainnet, devnet, testnet]')
        expect(response.status === 400).to.be.true
    })

    it('Send empty adress param', async function () {
        try{
            response = await getTokens (NETWORK_DEVNET, " ", AUTH_TOKEN)
        } catch (e) {
            response = e.response
        }
        expect(response.data.message === 'Invalid public key provided')
        expect(response.status === 404).to.be.true
    })

    it('Send invalid adress param', async function () {
        try{
            response = await getTokens (NETWORK_DEVNET, "INVALID", AUTH_TOKEN)
        } catch (e) {
            response = e.response
        }
        expect(response.data.message === 'Invalid public key provided')
        expect(response.status === 400).to.be.true
    })

    /**
     * Sending empty token (or any namber of spaces) results in 200 which is major issue!!!
     * Explanation: Adding key Authorization but providing no value
     * It can be tested in postman but you can not use Authorization tab, authorization
     * must be added as header and value must be left empty (or add any number of spaces). 
     * Adding any symbol to auth value will result in 403. Sending request without auth also
     * results in 403
     */

    it('Send empty token', async function () {
        try{
            response = await getTokens (NETWORK_DEVNET, REQ_ADRESS, "")
        } catch (e) {
            response = e.response
        }
        expect(response.data === 'Invalid API key!')
        expect(response.status === 403).to.be.true
    })

    it('Send invalid token', async function () {
        try{
            response = await getTokens (NETWORK_DEVNET, REQ_ADRESS, "INVALID")
        } catch (e) {
            response = e.response
        }
        expect(response.data === 'Invalid API key!')
        expect(response.status === 403).to.be.true
    })
    /**
     * Depending what network (devnet, mainnet, testnet) actualy means structuraly, 
     * we could test all these cases for each network (especialy auth). 
     * There is no need for additional tests, that can be done with array of
     * networks and using foreac we can easily run eah case for each network
     */
})