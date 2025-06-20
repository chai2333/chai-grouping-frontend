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
    baseUrl: 'http://localhost:5173'
  }
});
