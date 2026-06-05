# Getting Started

This page mirrors the essentials. For the full guide with live examples, see
**[structyl.com/docs/getting-started](https://www.structyl.com/docs/getting-started)**.

## Install

```bash
pnpm add @structyl/styled @structyl/themes
# or: npm install @structyl/styled @structyl/themes
# or: yarn add @structyl/styled @structyl/themes
```

`@structyl/styled` re-exports everything you need for styled components;
`@structyl/themes` provides the `ThemeProvider` and runtime theming.

## Add the Tailwind preset

```ts
// tailwind.config.ts
import preset from '@structyl/styled/tailwind-preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

## Wrap your app

```tsx
import { ThemeProvider, ThemeScript } from '@structyl/themes';
import { Toaster } from '@structyl/styled';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevents a flash of unstyled content before hydration */}
        <ThemeScript defaultTheme="structyl" defaultMode="system" />
      </head>
      <body>
        <ThemeProvider defaultTheme="structyl" defaultMode="system">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Use a component

```tsx
import { Button } from '@structyl/styled';

export default function Page() {
  return <Button variant="default">Hello, structyl</Button>;
}
```

## Or use the CLI

Copy component source directly into your project (shadcn-style):

```bash
npx structyl init
npx structyl add button dialog select
```

## Next steps

- Browse all components: [structyl.com/docs](https://www.structyl.com/docs)
- Learn theming: [Theming docs](https://www.structyl.com/docs/themes)
- Common questions: [FAQ](FAQ) · fixes in [Troubleshooting](Troubleshooting)
