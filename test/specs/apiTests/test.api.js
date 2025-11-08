//import axios, { get } from 'axios'
const { expect } = require('@wdio/globals')
const api = require('../../api/apiClient')

const adress = "HuiTegTpNAU7EJXvn95HKEWBdFMtWZYko4yoFVQyCKUS"
const networkDevnet = "devnet"
const networkMainnet = "mainnet"
const networkTestnet = "testnet"
const token = "735c6627-2d92-406a-b4f7-7fe1e19d8f4e"

async function getTokens (network) {
    const response = await api.get(`/v3/portfolio/tokens/${adress}`, {
            headers: {
                Authorization: `${token}`
            }, 
            params: {
                network: network
            }
        })
    return response
}

describe('Api portfolio tokens tests', function () {
    it('Devnet token validation', async function () {
        const response = await getTokens (networkDevnet)
        const tokens = response.data.tokens
        console.log("TOOOOKKKKKEEEEEENNNNNNSSSSSSSS")
        console.log(tokens)
        expect(Array.isArray(tokens)).toBe(true)
        expect(tokens.length).toBeGreaterThan(1)//more than one token
        expect(tokens.some(t => t.symbol === 'SOL')).toBe(true)//At least one SOL token
        expect(tokens.every(t => 'mint' in t)).toBe(true)//All tokens have mint prop
        expect(tokens.every(t => typeof t.totalUiAmount === 'number')).toBe(true)
        expect(tokens.every(t => t.totalUiAmount !== null)).toBe(true)
        expect(tokens.every(t => t.totalUiAmount !== '')).toBe(true)//checking that every token has defined totalUiAmount

        //TODO ISTRAZI AJV i SCHEMA pristup, komparacija cijelog response json-a odjednom
    })
})

