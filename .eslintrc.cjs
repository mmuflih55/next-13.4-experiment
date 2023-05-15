module.exports = {
  extends: ["eslint:recommended", "next", "next/core-web-vitals", "prettier"],
  plugins: ["@typescript-eslint", "simple-import-sort", "jest"],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["./__tests__/**", "./src/**/*.spec"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
      },
    },
    {
      files: ["./src/**/*.ts", "./src/**/*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
  env: {
    "jest/globals": true,
  },
  root: true,
};
