const config = {
  roots: ['<rootDir>/electron'],
  testMatch: ['<rootDir>/electron/__tests__/**/*.js'],
  moduleNameMapper: {
    electron: '<rootDir>/src/components/tests/mock/electron.js'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/electron/api/**/*.js',
    '<rootDir>/electron/languageFileParser.js'
  ],
  coverageDirectory: '<rootDir>/coverage/electron/',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  resetMocks: true
};

module.exports = config;
