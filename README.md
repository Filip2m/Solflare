Solflare Wallet

Project setup:
1. git clone <repo-url>
2. cd <solflare>
3. npm install

Run tests using cmd:
Run tests on all browsers defined in wdio.conf.js: set BROWSER=all && npx wdio run wdio.conf.js
Run tests only on chrome browser: set BROWSER=chrome && npx wdio run wdio.conf.js
Run tests only on firefox browser: set BROWSER=firefox && npx wdio run wdio.conf.js

If you are using macOS or Linux, commands above should look like:
Run tests on all browsers defined in wdio.conf.js: BROWSER=all npx wdio run wdio.conf.js
Run tests only on chrome browser: BROWSER=chrome npx wdio run wdio.conf.js
Run tests only on firefox browser: BROWSER=firefox npx wdio run wdio.conf.js