import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

export default defineWorkspace([
  // Existing package-level unit tests
  'packages/*/vitest.config.ts',
  // Storybook story tests (browser mode)
  {
    plugins: [
      storybookTest({ storybookScript: 'pnpm storybook --ci' }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium', launch: { channel: 'chrome' } }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
