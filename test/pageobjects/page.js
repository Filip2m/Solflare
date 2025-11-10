export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    * @param {WebdriverIO.Element} element
    * Func click is wrapper func. I usually use them to avoid code duplication
    * just like in this case where my wrapper click waits for element to be clickable
    * and only then clicks element. This avoids adding waitForClickable before every (or more than one)
    * element.click() trought tests
    */

    async click(element) {
        await element.waitForClickable()
        await element.click()
    }

    async open (path) {
        return await browser.url(`https://solflare.com/${path}`)
    }
}
