'use client';

import * as React from 'react';
import { Toolbar as ToolbarPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      'flex w-full items-center gap-1 rounded-md border border-border bg-bg p-1 shadow-sm',
      'data-[orientation=vertical]:flex-col',
      className,
    )}
    {...props}
  />
));
Root.displayName = 'Toolbar.Root';

const Button = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Button.displayName = 'Toolbar.Button';

const Separator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn(
      'shrink-0 bg-border',
      'data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full',
      'data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-px',
      className,
    )}
    {...props}
  />
));
Separator.displayName = 'Toolbar.Separator';

const Link = ToolbarPrimitive.Link;

export { Root, Button, Separator, Link };
