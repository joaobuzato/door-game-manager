/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/**/*.test.tsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "jest-css-modules",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
};
