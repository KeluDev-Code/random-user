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
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue-tjw',
  ],
};
