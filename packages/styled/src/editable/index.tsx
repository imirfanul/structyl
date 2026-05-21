'use client';

import * as React from 'react';
import { Editable as EditablePrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

const Root = EditablePrimitive.Root;

const Preview = React.forwardRef<
  React.ElementRef<typeof EditablePrimitive.Preview>,
  React.ComponentPropsWithoutRef<typeof EditablePrimitive.Preview>
>(({ className, ...props }, ref) => (
  <EditablePrimitive.Preview
    ref={ref}
    className={cn(
      'inline-block cursor-text rounded px-1 hover:bg-accent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      className,
    )}
    {...props}
  />
));
Preview.displayName = 'Editable.Preview';

const Input = React.forwardRef<
  React.ElementRef<typeof EditablePrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof EditablePrimitive.Input>
>(({ className, ...props }, ref) => (
  <EditablePrimitive.Input
    ref={ref}
    className={cn(
      'inline-block rounded border border-input bg-transparent px-1 text-sm',
      'focus:outline-none focus:ring-1 focus:ring-ring',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Editable.Input';

export { Root, Preview, Input };
