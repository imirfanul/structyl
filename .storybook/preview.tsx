import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider } from '@structyl/themes';
import { mswHandlers } from './msw-handlers';
import './globals.css';

initialize({ onUnhandledRequest: 'bypass' });

// Portals: Dialog/Sheet/Drawer use React.createPortal targeting document.body directly — no custom root needed.

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals['theme'] ?? 'slate';
  const mode = context.globals['mode'] ?? 'light';
  return (
    <ThemeProvider defaultTheme={theme} defaultMode={mode} storageKey={false}>
      <div style={{ background: 'hsl(var(--color-bg))', color: 'hsl(var(--color-fg))', minHeight: '100vh', padding: '2rem' }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'slate',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'slate', title: 'Slate' },
          { value: 'zinc', title: 'Zinc' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: mswHandlers },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disabled: true },
  },
  async beforeEach() {
    // ThemeProvider reads this key on mount. Seed it so stories start in a
    // known state instead of whatever the previous story left in storage.
    // storageKey={false} on the decorator's ThemeProvider skips persistence,
    // so this seed only affects components that directly read 'structyl-theme'.
    localStorage.setItem('structyl-theme', JSON.stringify({ theme: 'slate', mode: 'light' }));
  },
};

export default preview;
