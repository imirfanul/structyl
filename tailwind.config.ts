import type { Config } from 'tailwindcss';
// Import from source so no build step is required for Storybook
import preset from './packages/styled/src/tailwind-preset';

export default {
  presets: [preset],
  content: [
    './.storybook/**/*.{ts,tsx}',
    './packages/*/src/**/*.{ts,tsx}',
  ],
} satisfies Config;
