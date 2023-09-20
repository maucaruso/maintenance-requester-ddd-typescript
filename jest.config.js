const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
  },
};
