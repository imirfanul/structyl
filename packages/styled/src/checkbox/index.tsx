'use client';

import * as React from 'react';
import { Check, Minus } from '@aura-ui/icons';
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator,
  type CheckboxProps as CheckboxPrimitiveProps,
} from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

type CheckboxColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const checkedColorMap: Record<CheckboxColor, string> = {
  primary: [
    'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
    'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
  ].join(' '),
  secondary: [
    'data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary',
    'data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:text-secondary-foreground data-[state=indeterminate]:border-secondary',
  ].join(' '),
  error: [
    'data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:border-destructive',
    'data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:text-destructive-foreground data-[state=indeterminate]:border-destructive',
  ].join(' '),
  warning: [
    'data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=checked]:border-warning',
    'data-[state=indeterminate]:bg-warning data-[state=indeterminate]:text-warning-foreground data-[state=indeterminate]:border-warning',
  ].join(' '),
  info: [
    'data-[state=checked]:bg-info data-[state=checked]:text-info-foreground data-[state=checked]:border-info',
    'data-[state=indeterminate]:bg-info data-[state=indeterminate]:text-info-foreground data-[state=indeterminate]:border-info',
  ].join(' '),
  success: [
    'data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=checked]:border-success',
    'data-[state=indeterminate]:bg-success data-[state=indeterminate]:text-success-foreground data-[state=indeterminate]:border-success',
  ].join(' '),
};

const hoverColorMap: Record<CheckboxColor, string> = {
  primary: 'hover:border-primary/60',
  secondary: 'hover:border-secondary/60',
  error: 'hover:border-destructive/60',
  warning: 'hover:border-warning/60',
  info: 'hover:border-info/60',
  success: 'hover:border-success/60',
};

export interface CheckboxProps extends CheckboxPrimitiveProps {
  color?: CheckboxColor;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, color = 'primary', ...props }, ref) => (
    <CheckboxPrimitive
      ref={ref}
      className={cn(
        'peer size-4 shrink-0 cursor-pointer rounded-[5px] border border-border-strong bg-bg shadow-xs',
        'transition-[background-color,border-color,box-shadow,transform] duration-snappy ease-spring',
        hoverColorMap[color],
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.92]',
        checkedColorMap[color],
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
