'use client';

import * as React from 'react';
import { Check, Minus } from '@aura-ui/icons';
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator,
  type CheckboxProps as CheckboxPrimitiveProps,
} from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

export interface CheckboxProps extends CheckboxPrimitiveProps {}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive
      ref={ref}
      className={cn(
        'peer size-4 shrink-0 cursor-pointer rounded-[5px] border border-border-strong bg-bg shadow-xs',
        'transition-[background-color,border-color,box-shadow,transform] duration-snappy ease-spring',
        'hover:border-primary/60',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.92]',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
        className,
      )}
      {...props}
    >
      <CheckboxIndicator className={cn('flex items-center justify-center text-current animate-in zoom-in-50 duration-snappy')}>
        {props.checked === 'indeterminate' ? (
          <Minus className="size-3 stroke-[3]" />
        ) : (
          <Check className="size-3 stroke-[3]" />
        )}
      </CheckboxIndicator>
    </CheckboxPrimitive>
  ),
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
