import { expect } from 'chai'
import  getTokens  from '../../api/apiTokens.js'
import {REQ_ADRESS, NETWORK_DEVNET, AUTH_TOKEN, NETWORK_MAINNET} from '../../data/constants.js'

let responseMainnetOne
let responseMainnetTwo
let responseDevnet

/**
 * As mocha executes tests in order they are written, there is no need for additional
 *  test ordering here. 
 * */
describe(' Returning to Mainnet After Switching to Devnet', function() {

    it('First Request (Mainnet) - step 1', async () => {
        responseMainnetOne = await getTokens(NETWORK_MAINNET, REQ_ADRESS, AUTH_TOKEN)
        expect(responseMainnetOne.status === 200).to.be.true //Making sure response is with status code 200
        expect(responseMainnetOne.data.tokens.some(t => t.symbol === 'SOL')).to.be.true 
        expect(responseMainnetOne.data.errors.length === 0).to.be.true
    })

    it('Second Request (Devnet) - step 2', async () => {
        responseDevnet = await getTokens(NETWORK_DEVNET, REQ_ADRESS, AUTH_TOKEN)
        expect(responseDevnet.status === 200).to.be.true
        expect(responseDevnet.data.tokens.some(t => t.symbol === 'SOL')).to.be.true
        if(!responseMainnetOne) { //This way test is standalone
            responseMainnetOne = await getTokens(NETWORK_MAINNET, REQ_ADRESS, AUTH_TOKEN)
            expect(responseMainnetOne.status === 200).to.be.true
        }
        expect(responseMainnetOne.data.tokens.length < responseDevnet.data.tokens.length).to.be.true  
        expect(responseMainnetOne.data.errors.length === 0).to.be.true 
    })

    /**
     * Used .to.deep.equal as to.equal checks reference, not content
     */
    it('Third Request (Back to Mainnet) - step 3', async () => {
        responseMainnetTwo = await getTokens(NETWORK_MAINNET, REQ_ADRESS, AUTH_TOKEN)
        expect(responseMainnetTwo.status === 200).to.be.true
        expect(responseMainnetTwo.data.tokens.some(t => t.symbol === 'SOL')).to.be.true
        if(!responseMainnetOne) { //This way test is standalone
            responseMainnetOne = await getTokens(NETWORK_MAINNET, REQ_ADRESS, AUTH_TOKEN)
            expect(responseMainnetOne.status === 200).to.be.true
        }
        roundAllDifParams(responseMainnetOne.data.tokens)
        roundAllDifParams(responseMainnetTwo.data.tokens)
        expect(responseMainnetOne.data.tokens.length == responseMainnetTwo.data.tokens.length).to.be.true
        expect(responseMainnetOne.data.tokens).to.deep.equal(responseMainnetTwo.data.tokens)  
        expect(responseMainnetOne.data.errors.length === 0).to.be.true 
    })

    function roundAllDifParams(data) {
        for(const token of data) {
            for(const [key, value] of Object.entries(token.price)) {
                if(typeof value == 'number') {
                    token.price[key] = Math.round(value)        
                }
            }
            for(const [key, value] of Object.entries(token.solPrice)) {
                if(typeof value == 'number') {
                    token.solPrice[key] = Math.round(value)
                }
            }
        }
    }

    /**
     * I went with rounding as I saw that those values fluctuate sligtly.
     * As we are running those two requests close together, there is a realy small chance
     * in bigger difference.
     */
})