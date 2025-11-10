import OnBoard from '../../pageobjects/onboard.page.js'
import Home from '../../pageobjects/home.page.js'

describe('OnBoard', () => {
    it('Should copy and paste phrase and create new wallet', async () => {
        await OnBoard.open()
        await OnBoard.createNewWallet()
        await Home.confirmMainWalletExists()
        await Home.manageRecoveryPhraseAddNewWallet()
    })
})

