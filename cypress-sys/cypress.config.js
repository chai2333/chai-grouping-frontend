// eslint-disable-next-line no-undef
const { defineConfig } = require('cypress');
// eslint-disable-next-line no-undef
const { execSync } = require('child_process');
// eslint-disable-next-line no-undef
const FormData = require('form-data');
// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const fs = require('fs');
// eslint-disable-next-line no-undef
const axios = require('axios');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        resetDb() {
          execSync('D:\\package\\.conda\\envs\\OJ\\python.exe scripts/prepare_db.py');
          return null;
        },
        insertTestUsers() {
          execSync('D:\\package\\.conda\\envs\\OJ\\python.exe scripts/insert_test_users.py');
          return null;
        },
        insertTestGroups() {
          execSync('D:\\package\\.conda\\envs\\OJ\\python.exe scripts/insert_test_group.py');
          return null;
        },
        insertTestTasks() {
          execSync('D:\\package\\.conda\\envs\\OJ\\python.exe scripts/insert_test_tasks.py');
          return null;
        },
        insertTestSubmissions: async () => {
          const form = new FormData();
          form.append('text', 'SubmissionTextSubmissionTextSubmissionText');

          const filePath = path.resolve('fixtures/Normal_file.txt');
          form.append('file', fs.createReadStream(filePath));

          await axios.post('http://localhost:8080/api/submissions/submit/1', form, {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsImV4cCI6NDYxMTY4Nzc2ODgzMzE4NH0.4HsW666r3TDORj-bhZDIcaEG3qwOro_nXPM2oYgfJQNL5cTJWeAvTiuXym4w-GPUaSHM52T6mybW_6vTD8gWaQ',
              ...form.getHeaders()
            }
          });
          return null;
        },
        insertNotificationsJoinRequests() {
          execSync('D:\\package\\.conda\\envs\\OJ\\python.exe scripts/insert_notifications_join_requests.py');
          return null;
        },
        insertOverflowJoinRequests() {
          execSync('D:\\package\\.conda\\envs\\OJ\\python.exe scripts/insert_overflow_join_request.py');
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
