module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "prettier/@typescript-eslint",
    "prettier",
    // "plugin:react/recommended",
    // "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "indent": ["error", 2],
    "linebreak-style": 0, //
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-unused-vars": "off",
  },
};
