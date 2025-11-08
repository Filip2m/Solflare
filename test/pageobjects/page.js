const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    * @param {WebdriverIO.Element} element
    */

    async click(element) {
        await element.waitForClickable()
        await element.click()
    }

    open (path) {
        return browser.url(`https://solflare.com/${path}`)
    }
}
