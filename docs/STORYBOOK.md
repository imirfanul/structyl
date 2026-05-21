# Storybook

Storybook is configured in `apps/playground/.storybook/` and discovers stories from:

- `apps/playground/src/**/*.stories.tsx`
- `packages/styled/src/**/*.stories.tsx`
- `packages/primitives/src/**/*.stories.tsx`

## First-time setup

```bash
pnpm install         # installs storybook + addons declared in apps/playground/package.json
pnpm build           # build all workspace packages so stories resolve
pnpm storybook       # opens http://localhost:6006
```

## Adding a story

Use this template:

```tsx
// packages/styled/src/<name>/<name>.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ComponentName>;
export const Default: Story = {};
```

Seed stories that demonstrate the pattern:

- `apps/playground/src/stories/Button.stories.tsx`
- `apps/playground/src/stories/Dialog.stories.tsx`
- `apps/playground/src/stories/DataTable.stories.tsx`
- `apps/playground/src/stories/Form.stories.tsx`

## Theme + dark-mode toolbar

`apps/playground/.storybook/preview.tsx` wires the theme (`slate`/`zinc`/`rose`) and mode
(`light`/`dark`) as Storybook toolbar globals, so every story renders inside `<ThemeProvider>`.

## Building static Storybook

```bash
pnpm build-storybook   # outputs to apps/playground/storybook-static/
```

## Adding addons

Already wired:

- `@storybook/addon-essentials` — controls, docs, viewport, etc.
- `@storybook/addon-a11y` — axe-core integration in the panel
- `@storybook/addon-interactions` — play function support
- `@storybook/addon-themes` — theme switcher

Add others by updating `apps/playground/.storybook/main.ts` and
`apps/playground/package.json`.
