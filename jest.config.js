/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/**/*.test.tsx", "**/**/*.test.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "jest-css-modules",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
};
