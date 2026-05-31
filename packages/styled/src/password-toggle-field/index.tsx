'use client';

import * as React from 'react';
import { Eye, EyeOff } from '@structyl/icons';
import { PasswordToggleField as PtfPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof PtfPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PtfPrimitive.Root>
>(({ className, ...props }, ref) => (
  <PtfPrimitive.Root ref={ref} className={cn('relative', className)} {...props} />
));
Root.displayName = 'PasswordToggleField.Root';

const Input = React.forwardRef<
  React.ElementRef<typeof PtfPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof PtfPrimitive.Input>
>(({ className, ...props }, ref) => (
  <PtfPrimitive.Input
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'PasswordToggleField.Input';

const Toggle = React.forwardRef<
  React.ElementRef<typeof PtfPrimitive.Toggle>,
  React.ComponentPropsWithoutRef<typeof PtfPrimitive.Toggle>
>(({ className, ...props }, ref) => (
  <PtfPrimitive.Toggle
    ref={ref}
    className={cn(
      'absolute right-1 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground',
      'hover:text-fg focus:outline-none focus:ring-1 focus:ring-ring',
      className,
    )}
    {...props}
  >
    <PtfPrimitive.Icon
      visible={<EyeOff className="h-4 w-4" />}
      hidden={<Eye className="h-4 w-4" />}
    />
  </PtfPrimitive.Toggle>
));
Toggle.displayName = 'PasswordToggleField.Toggle';

export { Root, Input, Toggle };
