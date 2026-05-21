'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive, type SwitchProps as SwitchPrimitiveProps } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const switchVariants = tv({
  base: [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full',
    'border-2 border-transparent transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
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

const thumbVariants = tv({
  base: [
    'pointer-events-none block rounded-full bg-bg shadow-lg ring-0',
    'transition-transform',
    'data-[state=unchecked]:translate-x-0',
  ],
  variants: {
    size: {
      sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
      md: 'h-5 w-5 data-[state=checked]:translate-x-5',
      lg: 'h-7 w-7 data-[state=checked]:translate-x-6',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface SwitchProps extends SwitchPrimitiveProps, VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, ...props }, ref) => (
    <SwitchPrimitive
      ref={ref}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <span
        data-state={props.checked ?? props.defaultChecked ? 'checked' : 'unchecked'}
        className={thumbVariants({ size })}
      />
    </SwitchPrimitive>
  ),
);
Switch.displayName = 'Switch';

export { Switch };
