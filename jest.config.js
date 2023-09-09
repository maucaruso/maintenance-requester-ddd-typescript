module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/*.test.ts"],
};
