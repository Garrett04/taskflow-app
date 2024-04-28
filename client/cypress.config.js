const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3001/",
    viewportHeight: 920,
    viewportWidth: 1080
  },
  env: {
    username: 'helloworld',
    password: '12345hello'
  }
});
