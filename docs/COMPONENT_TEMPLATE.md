# Component Template

This is the **canonical template** for creating a new component. Follow it exactly to ensure consistency.

---

## Folder structure

For a component called `Switch`:

### Headless package
```
packages/primitives/src/switch/
├── switch.tsx              # Implementation
├── switch.types.ts         # Type definitions
├── switch.test.tsx         # Unit + interaction tests
├── switch.stories.tsx      # Storybook story
└── index.ts                # Public exports
```

### Styled package
```
packages/styled/src/switch/
├── switch.tsx              # Tailwind-styled wrapper
├── switch.variants.ts      # Variant definitions
├── switch.test.tsx         # Tests
├── switch.stories.tsx      # Storybook story
└── index.ts                # Public exports
```

### Docs
```
apps/docs/content/components/switch.mdx
```

---

## Step-by-step

### 1. Headless types — `switch.types.ts`

```ts
import type * as React from 'react';

export type SwitchProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> & {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** When true, the switch is disabled */
  disabled?: boolean;
  /** When true, indicates the switch is required */
  required?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Value attribute for form submission */
  value?: string;
};
```

### 2. Headless implementation — `switch.tsx`

```tsx
'use client';

import * as React from 'react';
import { Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import type { SwitchProps } from './switch.types';

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, forwardedRef) => {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    name,
    value = 'on',
    onClick,
    ...rest
  } = props;

  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <Primitive.button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-required={required}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      value={value}
      {...rest}
      ref={forwardedRef}
      onClick={composeEventHandlers(onClick, () => {
        if (disabled) return;
        setChecked((prev) => !prev);
      })}
    />
  );
});

Switch.displayName = 'Switch';

export { Switch };
```

### 3. Index — `index.ts`

```ts
export { Switch } from './switch';
export type { SwitchProps } from './switch.types';
```

### 4. Tests — `switch.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './switch';

describe('Switch (primitive)', () => {
  it('renders with role=switch', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('respects defaultChecked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles on click', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(<Switch checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch checked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('exposes data-state attribute', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch aria-label="Notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

### 5. Story — `switch.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
export const DefaultChecked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};
```

### 6. Styled wrapper — `packages/styled/src/switch/switch.tsx`

```tsx
'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { switchVariants } from './switch.variants';

type SwitchPrimitiveProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive>;
type SwitchVariantProps = Parameters<typeof switchVariants>[0];

export interface StyledSwitchProps extends SwitchPrimitiveProps, SwitchVariantProps {}

const Switch = React.forwardRef<HTMLButtonElement, StyledSwitchProps>(
  ({ className, size, ...props }, ref) => (
    <SwitchPrimitive
      ref={ref}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
          'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
          size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4',
        )}
      />
    </SwitchPrimitive>
  ),
);

Switch.displayName = 'Switch';

export { Switch };
```

### 7. Variants — `switch.variants.ts`

```ts
import { tv } from 'tailwind-variants';

export const switchVariants = tv({
  base: [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full',
    'border-2 border-transparent transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  ],
  variants: {
    size: {
      sm: 'h-4 w-7',
      md: 'h-6 w-11',
      lg: 'h-8 w-14',
    },
  },
  defaultVariants: { size: 'md' },
});
```

### 8. Docs page — `apps/docs/content/components/switch.mdx`

```mdx
---
title: Switch
description: A two-state toggle control.
---

A switch is a control for toggling a single setting on or off.

## Anatomy

```tsx
import { Switch } from '@aura-ui/styled';

<Switch />
```

## API Reference

### Switch

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onCheckedChange` | `(checked: boolean) => void` | — | Callback when state changes |
| `disabled` | `boolean` | `false` | Disable the switch |
| `required` | `boolean` | `false` | Mark as required |
| `name` | `string` | — | Form name |
| `value` | `string` | `'on'` | Form value when checked |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Visual size |

### Data attributes

| Attribute | Values |
|---|---|
| `[data-state]` | `'checked' \| 'unchecked'` |
| `[data-disabled]` | Present when disabled |

## Accessibility

Follows the [WAI-ARIA Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).

### Keyboard interactions

| Key | Action |
|---|---|
| `Space` | Toggle the switch |
| `Enter` | Toggle the switch |
```

### 9. Changeset

```bash
pnpm changeset
```

Pick the `@aura-ui/primitives` and `@aura-ui/styled` packages. Select minor (new feature). Write:

```
Add Switch component to primitives and styled packages with size variants.
```

---

## Checklist before opening PR

- [ ] Headless primitive in `packages/primitives/src/<name>/`
- [ ] Styled wrapper in `packages/styled/src/<name>/`
- [ ] Types in `<name>.types.ts`
- [ ] Tests pass: `pnpm test`
- [ ] A11y tests pass: `pnpm test:a11y`
- [ ] Story added
- [ ] Docs MDX added
- [ ] Changeset added
- [ ] `pnpm typecheck` clean
- [ ] `pnpm lint` clean
- [ ] `displayName` set on all components
- [ ] Refs forwarded
- [ ] `asChild` supported (where applicable)
- [ ] Controlled + uncontrolled (where stateful)
- [ ] `data-state` attributes exposed
