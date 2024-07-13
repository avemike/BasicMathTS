import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.ts"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/tests/**/*.spec.ts"],
};

export default config;
