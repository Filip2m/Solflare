import { expect } from 'chai'
import  getTokens  from '../../api/apiTokens.js'
import {REQ_ADRESS, NETWORK_DEVNET, AUTH_TOKEN} from '../../data/constants.js'

let response;
let tokens;
let responseStatus;

describe('SOL Token Validation', function () {

    this.beforeAll(async function () {
        response = await getTokens ("", REQ_ADRESS, AUTH_TOKEN)
        responseStatus = response.status
        tokens = response.data.tokens
    })

    it('SOL Token Validation step 1, 2', async function () {
        expect(responseStatus === 200).to.be.true
        expect(tokens.some(t => t.name === 'Solana')).to.be.true
        expect(tokens.length === 1).to.be.true //this step fails as there are multiple tokens when network param is not provided
    })

    it('SOL Token Validation step 3', async function () {
        const solanaToken = tokens.find(t => t.name === 'Solana')
        expect(solanaToken.symbol === 'SOL').to.be.true
        expect(solanaToken.mint === '11111111111111111111111111111111').to.be.true
        expect(typeof solanaToken.totalUiAmount === 'number').to.be.true
        expect(solanaToken.totalUiAmount >= 0).to.be.true
    })

    it('SOL Token Validation step ', async function () {
        const solanaToken = tokens.find(t => t.name === 'Solana')
        expect(solanaToken.price).to.have.all.keys(
            'price', 
            'change', 
            'usdPrice', 
            'usdChange', 
            'liquidity', 
            'volume24h', 
            'volumeChange24h', 
            'mc', 
            'currency'
        )
        expect(solanaToken.price).to.include({ //This way we can check all data from api matches expected data
            currency:"usd"}
        )
    })
})