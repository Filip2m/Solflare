import { appendFileSync } from 'fs'
import { join } from 'path'
/**
 * Here we can add configuration to log every step in log file
 * I usualy create new dir for each test run and each test logs and screenshots
 * are stored in individual test dirs.
 * That way it is easy to debug if test fails (screenshot + logged steps) or
 * in case of regression testing, logged files can be used as proof of test run
 */
const file = join(__dirname, 'solflareLog.log')

function log (message) {
    console.log(message)
    appendFileSync(file, message + "\n", 'utf-8')
}
export default log