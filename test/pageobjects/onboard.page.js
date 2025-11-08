const { $, expect, browser } = require('@wdio/globals')
const Page = require('./page')
const Crypto = require('../helpers/crypto')

class OnBoard extends Page {
    /**
     * defined selectors using getter methods
     */
    phrase (index) {
        return $(`input[data-testid="input-recovery-phrase-${index}"]`)
    }

    get iNeedNewWalletButton () { 
        return $(`button[data-testid="btn-need-new-wallet"]`)
    }

    get iSavedRecoveryPhraseButton () { 
        return $(`button[data-testid="btn-saved-my-recovery-phrase"]`)
    }

    get continueButton () {
        return $(`button[data-testid="btn-continue"]`)
    }

    get newPasswordInput () {
        return $(`input[data-testid="input-new-password"]`)
    }

    get repeatPasswordInput () {
        return $(`input[data-testid="input-repeat-password"]`)
    }

    get agreeLetsGoButton () {
        return $(`button[data-testid="btn-explore"]`)
    }

    /**
     * Next selector is to show That we can use element text for getting elements
     * but this way we do not cover multilingual pages.
     * When we are testing pages that are multilingual, we can use translate files
     * and add translated text programatically, but then we can not use getter method, 
     * for selectors as getter method in js does not allow parameters
     */
    
    async navigateToRecoveryPhrases() {
        await expect(await this.iNeedNewWalletButton.isDisplayed())
        await this.click(this.iNeedNewWalletButton)
    }

    async getPhrases () {
        const phrases = []
        for(let i =1; i < 13; i++){
            const text = await this.phrase(i).getValue()
            phrases.push(text)
        }
        return phrases
    }

    async pastePhrases (phrases) {
        for(let i =1; i < 13; i++){
            this.phrase(i).setValue(phrases[i - 1])
        }
    }

    async populatePasswords (password) {
        await expect(this.newPasswordInput.isDisplayed()) 
        await expect(this.repeatPasswordInput.isDisplayed())
        await this.newPasswordInput.click()
        await browser.keys(password)
        await this.repeatPasswordInput.click() 
        await browser.keys(password)
    }

    async createNewWallet () {
        await this.navigateToRecoveryPhrases()
        const phrases = await this.getPhrases()
        await this.click(this.iSavedRecoveryPhraseButton)
        await this.pastePhrases(phrases)
        await this.click(this.continueButton)
        await this.populatePasswords(Crypto.getRandomPassword())
        await this.click(this.continueButton)
        await this.click(this.agreeLetsGoButton)
    }

    /**
     * expect(this.recoveryPhraseItem.$(`div[data-testid="list-item-m-title"]`)).toHaveText('Main Wallet')
     * Nested because of data-testid redundancy. 
     * This way I make sure that I only collect elements with data-testid="list-item-m-title" 
     * from wallet list and not from whole page.
     * Makes false positive test less likely.
     * I could not use data-testid="li-wallets-7kXkEcPedTVHWLnHcEsHPAm5JKG4xyPnB2ASub4jBZcY" 
     * because of wallet id that I do not have acces to. In real world scenario I would probably get
     * that id trough api (I would get all wallets for logged in user and locate them all in UI to verify they exist)
     */
    /* async confirmMainWalletExists () {
        expect(this.portfolioTitle.isDisplayed())
        await this.click(this.waletPicker.$(`span`))
        await expect(this.recoveryPhraseItem.$(`div[data-testid="list-item-m-title"]`)).toHaveText('Main Wallet')
        //As there might be multiple wallets, we need to make sure we check all of them 
        const wallets = this.recoveryPhraseItem.$$(`div[data-testid="list-item-m-title"]`)
        const walletTexts = await wallets.map(w => w.getText())
        expect(walletTexts.some(w => w === 'Main Wallet')).toBe(true)
    }

    async manageRecoveryPhraseAddNewWallet () {
        if(! await this.addWalletButton.isDisplayed()) {
            expect(this.portfolioTitle.isDisplayed())
            await this.click(this.waletPicker.$(`span`))
        }
        await this.addWalletButton.click()
        expect(this.manageRecoveryPhaseOption.isDisplayed())
        this.manageRecoveryPhaseOption.click()
        const firstSwitch = await this.getRecoverySwitcheByIndex(0)
        await expect(firstSwitch).toHaveAttribute("data-disabled")
        await expect(firstSwitch).toHaveAttribute("disabled")
        await expect(firstSwitch).toHaveAttribute("aria-checked", "true")
        const thirdSwitch = await this.getRecoverySwitcheByIndex(2)
        const forthSwitch = await this.getRecoverySwitcheByIndex(3)
        await thirdSwitch.click()
        await forthSwitch.click()
        await expect(thirdSwitch).toHaveAttribute("aria-checked", "true")
        await expect(forthSwitch).toHaveAttribute("aria-checked", "true")
        await this.saveNewWalletButton.click()
        const wallets = this.recoveryPhraseItem.$$(`div[data-testid="list-item-m-title"]`)
        await expect(wallets).toBeElementsArrayOfSize(3)
        const walletTexts = await wallets.map(w => w.getText())
        expect(walletTexts.some(w => w === 'Main Wallet')).toBe(true)
        expect(walletTexts.some(w => w === 'Wallet 2')).toBe(true)
        expect(walletTexts.some(w => w === 'Wallet 3')).toBe(true)
    } */

    open () {
        return super.open('onboard')
    }
}

module.exports = new OnBoard()
