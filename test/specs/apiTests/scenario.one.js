import { expect } from 'chai'
import  getTokens  from '../../api/apiTokens.js'
import {REQ_ADRESS, NETWORK_DEVNET, AUTH_TOKEN} from '../../data/constants.js'

let response
let tokens
let responseStatus

describe('Devnet token validation', function () {
    this.beforeAll(async function () {
        response = await getTokens (NETWORK_DEVNET, REQ_ADRESS, AUTH_TOKEN)
        responseStatus = response.status
        tokens = response.data.tokens
    })

    it('Devnet token validation step 1', async function () {
        expect(response.status === 200).to.be.true//network is set to devnet and response is with status 200 (OK)
        expect(tokens).to.be.an('array')//response data is not empty
    })

    it('Devnet token validation step 2', async function () {
        expect(tokens.length).to.be.greaterThan(1)//more than one token
        expect(tokens.some(t => t.symbol === 'SOL')).to.be.true//At least one SOL token
    })

    it('Devnet token validation step 3', async function () {
        expect(tokens.every(t => 'mint' in t)).to.be.true//All tokens have mint prop
        expect(tokens.every(t => t.mint.length > 0)).to.be.true
    })

    it('Devnet token validation step 4', async function () {
        expect(tokens.every(t => typeof t.totalUiAmount === 'number')).to.be.true//checking that every token has defined totalUiAmount
    })

    it('Devnet token validation step 5', async function () {
        expect(tokens.every(t => typeof t.price.price === 'number')).to.be.true//validate that price is number and exists
        /**
         * Line above will fail as not every token has price.
         * Best practice for expect will be to create wraper function that will only collect "not expected", log them and soft fail test.
         * Under soft fail I think about running whole test and failing at the end of test, with all exceptions documented.
         * In my case here, my test fails at first exception (not expected condition), and it will not run to the end, but for sake of
         * simplicity, I will keep it this way.
         */
        expect(tokens.every(t => typeof t.coingeckoId === 'string')).to.be.true//validate that price is string and exists
        expect(tokens.every(t => t.coingeckoId === t.name.toLowerCase())).to.be.true//will fail on null as only solana token has name and coingeckoid
        expect(tokens.every(t => typeof t.symbol === 'string')).to.be.true//will fail on null as only solana token has symbol
    })
})
