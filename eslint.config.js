import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';

export default [
  {
    ignores: [ 'dist/**' ],
    files: [ '**/*.{js,ts}' ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': ts.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended[0].rules,

      'semi': [ 'error', 'always' ],
      'no-unused-vars': [ 'warn', {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: true,

        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-useless-escape': 'off',
      'no-prototype-builtins': 'off',
      'no-constant-binary-expression': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: [ '**/*.{js,ts}' ],
    languageOptions: {
      parser: ts.parser,
    },
  },
];
