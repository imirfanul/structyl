import type { Config } from 'tailwindcss';
import preset from '@structyl/styled/tailwind-preset';

export default {
  presets: [preset],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    '../../packages/data-table/src/**/*.{ts,tsx}',
    '../../packages/styled/src/**/*.{ts,tsx}',
  ],
} satisfies Config;
