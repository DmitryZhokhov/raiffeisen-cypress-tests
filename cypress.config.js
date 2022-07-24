const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.raiffeisen.ru',
    pageLoadTimeout: 120000
    
  },
  retries: 2
})
