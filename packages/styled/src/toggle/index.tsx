'use client';

import * as React from 'react';
import { Toggle as TogglePrimitive, type ToggleProps as TogglePrimitiveProps } from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium',
    'ring-offset-bg transition-colors',
    'hover:bg-muted hover:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
    },
    color: {
      default: 'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      primary: 'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
      secondary: 'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground',
      error: 'data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground',
      warning: 'data-[state=on]:bg-warning data-[state=on]:text-warning-foreground',
      info: 'data-[state=on]:bg-info data-[state=on]:text-info-foreground',
      success: 'data-[state=on]:bg-success data-[state=on]:text-success-foreground',
    },
    size: {
      default: 'h-10 px-3',
      sm: 'h-9 px-2.5',
      lg: 'h-11 px-5',
    },
  },
  defaultVariants: { variant: 'default', size: 'default', color: 'default' },
});

export interface ToggleProps
  extends Omit<TogglePrimitiveProps, 'color'>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, color, ...props }, ref) => (
    <TogglePrimitive
      ref={ref}
      className={cn(toggleVariants({ variant, size, color }), className)}
      {...props}
    />
  ),
);
Toggle.displayName = 'Toggle';

export { Toggle };
