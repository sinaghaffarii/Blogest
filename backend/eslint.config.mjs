import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser', // برای TypeScript
  parserOptions: {
    ecmaVersion: 2025, // آخرین استاندارد ECMAScript
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2025: true,
    jest: true, // برای تست‌ها
  },
  extends: [
    '@fullstacksjs/eslint-config/base', // config پایه
    'eslint:recommended', // قوانین پایه ESLint
    'plugin:@typescript-eslint/recommended', // قوانین TypeScript
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // هماهنگی با Prettier
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'unused-imports'],
  rules: {
    // قواعد عمومی
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',

    // Import rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'error',

    // Prettier
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    // حذف import های بلا استفاده
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
});
