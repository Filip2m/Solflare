import Page from './page.js'
import Crypto from '../helpers/crypto.js'

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

    async open () {
        return await super.open('onboard')
    }
}

export default new OnBoard()
