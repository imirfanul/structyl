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
        'peer size-4 shrink-0 rounded-sm border border-primary',
        'ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <CheckboxIndicator className={cn('flex items-center justify-center text-current')}>
        {props.checked === 'indeterminate' ? (
          <Minus className="size-3" />
        ) : (
          <Check className="size-3" />
        )}
      </CheckboxIndicator>
    </CheckboxPrimitive>
  ),
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
