import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)(test).ts?(x)'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
export default config;
