Solflare Wallet

Project setup:
1. git clone <repo-url>
2. cd <solflare>
3. npm install

Run UI tests using cmd:<br>
Run tests on all browsers defined in wdio.conf.js: set BROWSER=all && npx wdio run wdio.conf.js or with command npm run test:all<br>
Run tests only on chrome browser: set BROWSER=chrome && npx wdio run wdio.conf.js or with command npm run test:chrome<br>
Run tests only on firefox browser: set BROWSER=firefox && npx wdio run wdio.conf.js or with command npm run test:firefox<br>

If you are using macOS or Linux, commands above should look like:<br>
Run tests on all browsers defined in wdio.conf.js: BROWSER=all npx wdio run wdio.conf.js or with command npm run test:all<br>
Run tests only on chrome browser: BROWSER=chrome npx wdio run wdio.conf.js or with command npm run test:chrome<br>
Run tests only on firefox browser: BROWSER=firefox npx wdio run wdio.conf.js or with command npm run test:firefox<br>

Running npx wdio run wdio.conf.js will run only UI tests<br>

To run only API tests using cmd:
npm run test:api
