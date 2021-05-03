module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  automock: false,
  resetMocks: false,
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  setupFiles: [
    './tests/setupJest.js',
  ],
};
