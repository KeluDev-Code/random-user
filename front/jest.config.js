module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  automock: false,
  resetMocks: false,
  setupFiles: [
    './tests/setupJest.js',
  ],

  moduleFileExtensions: [
    'js',
    'ts',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
