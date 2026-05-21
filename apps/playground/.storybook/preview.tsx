import * as React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@your-lib/themes';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'slate',
      toolbar: {
        icon: 'paintbrush',
        items: ['slate', 'zinc', 'rose'],
        showName: true,
      },
    },
    mode: {
      name: 'Mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider
        defaultTheme={context.globals.theme as string}
        defaultMode={context.globals.mode as 'light' | 'dark'}
      >
        <div className="p-6 bg-bg text-fg min-h-[200px]">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
