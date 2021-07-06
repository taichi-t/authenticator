import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)(test).ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
export default config;
