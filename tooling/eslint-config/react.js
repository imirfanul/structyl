/**
 * React flat ESLint config: base + eslint-plugin-react + react-hooks.
 * Prettier + ignores are re-appended last so they win.
 */
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import base from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': [
        'error',
        { ignore: ['cmdk-group-heading', 'cmdk-input-wrapper'] },
      ],
    },
    settings: { react: { version: 'detect' } },
  },
  prettier,
  { ignores: ['**/dist/**', '**/.next/**', '**/node_modules/**', '**/coverage/**'] },
];
