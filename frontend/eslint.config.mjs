import { defineConfig } from "@fullstacksjs/eslint-config";

export default defineConfig({
  root: true,
  parser: "@typescript-eslint/parser", // برای TypeScript
  parserOptions: {
    ecmaVersion: 2025, // آخرین استاندارد ECMAScript
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // اگر پروژه React باشد
    },
  },
  env: {
    browser: true,
    node: true,
    es2025: true,
    jest: true, // برای تست‌ها
  },
  extends: [
    "@fullstacksjs/eslint-config/base", // config پایه
    "eslint:recommended", // قوانین پایه ESLint
    "plugin:@typescript-eslint/recommended", // قوانین TypeScript
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended", // هماهنگی با Prettier
    "plugin:jsx-a11y/recommended", // دسترسی برای React (اگر پروژه React)
  ],
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier",
    "jsx-a11y", // اگر React
    "unused-imports",
  ],
  rules: {
    // قواعد عمومی
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
    "prefer-arrow-callback": "error",

    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": "error",

    // Import rules
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "import/no-unresolved": "error",

    // Prettier
    "prettier/prettier": ["error", { endOfLine: "auto" }],

    // React (اگر پروژه React)
    "react/react-in-jsx-scope": "off", // React 17+ لازم نیست
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",

    // حذف import های بلا استفاده
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {},
    },
    react: {
      version: "detect", // برای React
    },
  },
});
