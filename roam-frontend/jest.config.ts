import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest', 
      { configFile: './babel.config' }
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/components/__tests__/__mocks__/"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/components/__tests__/__mocks__/",
    "<rootDir>/components/ui/",
    "<rootDir>/app/",
    "<rootDir>/api/",
  ],
};

export default config;
