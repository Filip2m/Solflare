//const log = require('./logger')
import log from './logger.js'
const browserName = process.env.BROWSER.toLowerCase().trim() || 'all'

const allCapabilities = {
    chrome: { browserName: 'chrome' },
    firefox: { browserName: 'firefox' }
}

let capabilities

if(browserName === 'all'){
    capabilities = Object.keys(allCapabilities).map(key => allCapabilities[key]) 
} else if(!allCapabilities[browserName]) {
    throw new Error(
            `Unsupported browser: ${browserName}. Supported browsers: ${Object.keys(allCapabilities).join(', ')}`
        )
} else {
    capabilities = [allCapabilities[browserName]]
}

export const config = {
    runner: 'local',

    specs: ['./test/specs/uiTests/**/*.js'],
    exclude: [],

    maxInstances: 10,
    capabilities,

    logLevel: 'error',
    bail: 0,

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    beforeSession: function (capabilities) {
        log(`Starting session for ${browserName}`)
    },

    beforeTest: function (test) {
        log(`Test starting...${test.parent} -> ${test.title}`)
    },

    afterTest: async function (test, context, { error, result, duration, passed }) {
        const status = passed ? 'PASSED' : 'FAILED'
        log(`Finished test: ${test.parent} -> ${test.title} | Status: ${status} | Duration: ${duration}ms | ${browser.capabilities.browserName}`)
        if (error) {
            log(`Error: ${error.message} + " Browser: " + ${browser.capabilities.browserName}`)
            const fileName = `./failledTestScreenshots/${test.parent} -> ${test.title}`
            await browser.saveScreenshot(fileName)
        }
    }
}
