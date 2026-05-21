'use client';

import * as React from 'react';
import { Minus, Plus } from '@your-lib/icons';
import { NumberField as NumberFieldPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Root>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.Root
    ref={ref}
    className={cn('relative inline-flex h-9 w-32 rounded-md border border-input bg-transparent', className)}
    {...props}
  />
));
Root.displayName = 'NumberField.Root';

const Input = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Input>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.Input
    ref={ref}
    className={cn(
      'h-full w-full bg-transparent px-3 text-sm tabular-nums',
      'focus:outline-none focus:ring-1 focus:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'NumberField.Input';

const triggerCls = cn(
  'inline-flex h-full w-8 items-center justify-center border-l border-input text-muted-foreground',
  'hover:bg-accent hover:text-fg',
  'disabled:pointer-events-none disabled:opacity-50',
);

const IncrementTrigger = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.IncrementTrigger>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.IncrementTrigger>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.IncrementTrigger ref={ref} className={cn(triggerCls, className)} {...props}>
    <Plus className="h-3.5 w-3.5" />
  </NumberFieldPrimitive.IncrementTrigger>
));
IncrementTrigger.displayName = 'NumberField.IncrementTrigger';

const DecrementTrigger = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitive.DecrementTrigger>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.DecrementTrigger>
>(({ className, ...props }, ref) => (
  <NumberFieldPrimitive.DecrementTrigger ref={ref} className={cn(triggerCls, className)} {...props}>
    <Minus className="h-3.5 w-3.5" />
  </NumberFieldPrimitive.DecrementTrigger>
));
DecrementTrigger.displayName = 'NumberField.DecrementTrigger';

export { Root, Input, IncrementTrigger, DecrementTrigger };
