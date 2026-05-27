'use client';

import * as React from 'react';
import { Circle } from '@aura-ui/icons';
import { RadioGroup as RadioGroupPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

type RadioColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const colorMap: Record<RadioColor, { border: string; fill: string }> = {
  primary: { border: 'border-primary text-primary', fill: 'fill-primary' },
  secondary: { border: 'border-secondary text-secondary-dark', fill: 'fill-secondary' },
  error: { border: 'border-destructive text-destructive', fill: 'fill-destructive' },
  warning: { border: 'border-warning text-warning', fill: 'fill-warning' },
  info: { border: 'border-info text-info', fill: 'fill-info' },
  success: { border: 'border-success text-success', fill: 'fill-success' },
};

const Root = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-2', className)} {...props} />
));
Root.displayName = 'RadioGroup.Root';

interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  color?: RadioColor;
}

const Item = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, color = 'primary', ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'aspect-square h-4 w-4 cursor-pointer rounded-full border shadow',
      'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      colorMap[color].border,
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className={cn('h-2.5 w-2.5', colorMap[color].fill)} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
Item.displayName = 'RadioGroup.Item';

export { Root, Item };
