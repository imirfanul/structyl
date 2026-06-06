/**
 * Internal preset for structyl's own packages: react preset + Storybook rules.
 * This is the config the workspace root consumes.
 */
import storybook from 'eslint-plugin-storybook';
import react from './react.js';

/** @type {import('eslint').Linter.Config[]} */
export default [...react, ...storybook.configs['flat/recommended']];
