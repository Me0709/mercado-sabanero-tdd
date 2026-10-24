/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['src/**/*.ts', '!src/dominio/tipos.ts'],
  coverageThreshold: { global: { lines: 80 } },
  coverageReporters: ['text', 'lcov', 'html'],
};
