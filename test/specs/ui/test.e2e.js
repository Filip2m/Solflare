const { expect } = require('@wdio/globals')
const OnBoard = require('../../pageobjects/onboard.page')
const Home = require('../../pageobjects/home.page')

describe('OnBoard', () => {
    it('Should copy and paste phrase and create new wallet', async () => {
        await OnBoard.open()
        await OnBoard.createNewWallet()
        await Home.confirmMainWalletExists()
        await Home.manageRecoveryPhraseAddNewWallet()
    })
})

