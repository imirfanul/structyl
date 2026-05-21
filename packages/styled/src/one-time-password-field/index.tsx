'use client';

import * as React from 'react';
import { OneTimePasswordField as OtpPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof OtpPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof OtpPrimitive.Root>
>(({ className, ...props }, ref) => (
  <OtpPrimitive.Root ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
));
Root.displayName = 'OneTimePasswordField.Root';

const Input = React.forwardRef<
  React.ElementRef<typeof OtpPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof OtpPrimitive.Input>
>(({ className, ...props }, ref) => (
  <OtpPrimitive.Input
    ref={ref}
    className={cn(
      'h-10 w-10 rounded-md border border-input bg-transparent text-center text-base shadow-sm',
      'focus:outline-none focus:ring-1 focus:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'OneTimePasswordField.Input';

const HiddenInput = OtpPrimitive.HiddenInput;

export { Root, Input, HiddenInput };
