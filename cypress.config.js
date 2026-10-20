const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

  // NÃO apagar screenshots e vídeos entre execuções
  trashAssetsBeforeRuns: true,

  e2e: {
    baseUrl: 'http://localhost:8080/parabank',
    
    // Site online: dar mais tempo para rede, servidor e elementos
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 150000,
    requestTimeout: 60000,
    responseTimeout: 60000,

    setupNodeEvents(on, config) {
      return config
    }
  },

  screenshotOnRunFailure: true,
  video: false
})
