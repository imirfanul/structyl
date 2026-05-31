'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive, type SwitchProps as SwitchPrimitiveProps } from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { tv, type VariantProps } from 'tailwind-variants';

type SwitchColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const checkedBgMap: Record<SwitchColor, string> = {
  primary: 'data-[state=checked]:bg-primary',
  secondary: 'data-[state=checked]:bg-secondary',
  error: 'data-[state=checked]:bg-destructive',
  warning: 'data-[state=checked]:bg-warning',
  info: 'data-[state=checked]:bg-info',
  success: 'data-[state=checked]:bg-success',
};

export const switchVariants = tv({
  base: [
    'peer group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5',
    'border border-transparent',
    'transition-[background-color,box-shadow] duration-smooth ease-spring',
    'shadow-inner',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=unchecked]:bg-muted',
    'active:scale-[0.97] active:transition-transform active:duration-instant',
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
    'pointer-events-none block rounded-full bg-bg',
    'shadow-[0_1px_2px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08)]',
    'transition-transform duration-smooth ease-spring',
    'group-active/switch:scale-110',
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

export interface SwitchProps extends SwitchPrimitiveProps, VariantProps<typeof switchVariants> {
  color?: SwitchColor;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, color = 'primary', ...props }, ref) => (
    <SwitchPrimitive
      ref={ref}
      className={cn(switchVariants({ size }), checkedBgMap[color], className)}
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
