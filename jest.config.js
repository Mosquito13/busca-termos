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
      branches: 90,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  resetMocks: true
};

module.exports = config;
