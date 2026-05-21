import type { Config } from 'tailwindcss';
import preset from '@your-lib/styled/tailwind-preset';

export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/styled/src/**/*.{ts,tsx}',
  ],
} satisfies Config;
