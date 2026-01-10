const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",

  // usamos el transform oficial de ts-jest
  transform: {
    ...tsJestTransformCfg,
  },

  // DDD: testeamos src
  roots: ["<rootDir>/src"],

  moduleFileExtensions: ["ts", "js"],

  // Convención enterprise
  testMatch: [
    "**/*.spec.ts",
    "**/*.test.ts"
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Limpia mocks entre tests
  clearMocks: true,

  // Coverage
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.dto.ts",
    "!src/**/index.ts",
    "!src/**/types.ts"
  ],
};
