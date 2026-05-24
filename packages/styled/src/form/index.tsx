'use client';

import * as React from 'react';
import { Form as FormPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Root ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
));
Root.displayName = 'Form.Root';

const Field = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Field ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
));
Field.displayName = 'Form.Field';

const Label = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
));
Label.displayName = 'Form.Label';

const Control = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Control>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Control>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Control
    ref={ref}
    className={cn(
      'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      className,
    )}
    {...props}
  />
));
Control.displayName = 'Form.Control';

const Message = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Message
    ref={ref}
    className={cn('text-destructive text-xs', className)}
    {...props}
  />
));
Message.displayName = 'Form.Message';

const Submit = FormPrimitive.Submit;
const ValidityState = FormPrimitive.ValidityState;

export { Root, Field, Label, Control, Message, Submit, ValidityState };
