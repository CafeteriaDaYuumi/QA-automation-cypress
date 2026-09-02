const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

  // NÃO apagar screenshots e vídeos entre execuções
  trashAssetsBeforeRuns: false,

  e2e: {
    baseUrl: 'https://parabank.parasoft.com/parabank',

    setupNodeEvents(on, config) {
      return config
    }
  },

  screenshotOnRunFailure: true,
  video: true
})