// eslint-disable-next-line no-undef
const { defineConfig } = require('cypress');
// eslint-disable-next-line no-undef
const { execSync } = require('child_process');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        resetDb() {
          execSync('conda activate OJ && python scripts/prepare_db.py');
          return null;
        }
      });
    },
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress-sys/support/e2e.js',
    specPattern: 'cypress-sys/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress-sys/fixtures',
    screenshotsFolder: 'cypress-sys/screenshots'
  }
});
