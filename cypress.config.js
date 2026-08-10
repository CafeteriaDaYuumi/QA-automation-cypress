const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://parabank.parasoft.com/parabank',

    setupNodeEvents(on, config) {
      return config
    }
  },

  screenshotOnRunFailure: true,
  video: true
})