const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/features/*.feature",
    async setupNodeEvents(on, config) {
      const { addCucumberPreprocessorPlugin } = await import(
        "@badeball/cypress-cucumber-preprocessor"
      );
      await addCucumberPreprocessorPlugin(on, config);
      const { createEsbuildPlugin } = require(
        "@badeball/cypress-cucumber-preprocessor/esbuild"
      );
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
  },
});