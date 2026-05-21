'use client';

import * as React from 'react';
import { TimePicker as TimePickerPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof TimePickerPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TimePickerPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TimePickerPrimitive.Root
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center gap-0.5 rounded-md border border-input bg-transparent px-3 text-sm tabular-nums',
      className,
    )}
    {...props}
  />
));
Root.displayName = 'TimePicker.Root';

const Segment = React.forwardRef<
  React.ElementRef<typeof TimePickerPrimitive.Segment>,
  React.ComponentPropsWithoutRef<typeof TimePickerPrimitive.Segment>
>(({ className, ...props }, ref) => (
  <TimePickerPrimitive.Segment
    ref={ref}
    className={cn(
      'inline-flex h-6 min-w-[1.5ch] items-center justify-center rounded',
      'hover:bg-accent focus:bg-accent focus:outline-none',
      className,
    )}
    {...props}
  />
));
Segment.displayName = 'TimePicker.Segment';

const Separator: React.FC<{ children?: React.ReactNode }> = ({ children = ':' }) => (
  <span className="text-muted-foreground">{children}</span>
);
Separator.displayName = 'TimePicker.Separator';

export { Root, Segment, Separator };
