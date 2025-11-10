import Page from './page.js'

class Home extends Page {

    /**
     * Next selector is to show That we can use element text for getting elements
     * but this way we do not cover multilingual pages.
     * When we are testing pages that are multilingual, we can use translate files
     * and add translated text programatically, but then we can not use getter method, 
     * for selectors as getter method in js does not allow parameters
     */
    get portfolioTitle () {
        return $('span=Portfolio')
    }

    get waletPicker () {
        return $(`div[data-testid="section-wallet-picker"]`)
    }

    get recoveryPhraseItem () {
        return $(`div[data-testid="section-header_account_recovery_phrase"]`)
    }

    get recoveryPhraseItems () {
        return $$(`div[data-testid="list-item-m-title"]`)
    }
    /**
     * Nested because of data-testid redundancy. 
     * This way is much more bulletproof and I do not need to iterate as
     * data-testid="list-item-m-title" is same for wallet title and
     * Add wallet button
     */
    get addWalletButton () {
        return $(`a[data-testid="icon-btn-add"]`).$(`div=Add wallet`)
    }

    get buttonSwitch () {
        return $$(`button[role="switch"]`)
    }

    get manageRecoveryPhaseOption () {
        return $(`div=Manage recovery phrase`)
    }

    get saveNewWalletButton () {
        return $(`button[data-testid="btn-save"]`)
    }

    async getRecoverySwitcheByIndex (index) {
        const btnSwitches = this.buttonSwitch
        return btnSwitches[index]
    }

    async confirmMainWalletExists () {
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
    }
}

export default new Home()