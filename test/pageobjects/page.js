export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    * @param {WebdriverIO.Element} element
    */

    async click(element) {
        await element.waitForClickable()
        await element.click()
    }

    async open (path) {
        return await browser.url(`https://solflare.com/${path}`)
    }
}
