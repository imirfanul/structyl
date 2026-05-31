// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packagesDir = path.resolve(__dirname, '../packages');

const config: StorybookConfig = {
  stories: ['../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  staticDirs: ['../public'],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@structyl/core': path.join(packagesDir, 'core/src'),
      '@structyl/utils': path.join(packagesDir, 'utils/src'),
      '@structyl/hooks': path.join(packagesDir, 'hooks/src'),
      '@structyl/themes': path.join(packagesDir, 'themes/src'),
      '@structyl/icons': path.join(packagesDir, 'icons/src'),
      '@structyl/primitives': path.join(packagesDir, 'primitives/src'),
      '@structyl/styled': path.join(packagesDir, 'styled/src'),
      '@structyl/data-table': path.join(packagesDir, 'data-table/src'),
    };
    return config;
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
