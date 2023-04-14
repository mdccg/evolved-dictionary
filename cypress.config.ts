import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1366,
    viewportHeight: 768,
  },

  env: {
    API_URL: 'https://api.dictionaryapi.dev/api/v2/entries/en'
  }
});
