'use client';

import * as React from 'react';
import { ChevronRight } from '@your-lib/icons';
import { Tree as TreePrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof TreePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TreePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TreePrimitive.Root ref={ref} className={cn('text-sm', className)} {...props} />
));
Root.displayName = 'Tree.Root';

const Item = TreePrimitive.Item;

const Trigger = React.forwardRef<
  React.ElementRef<typeof TreePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TreePrimitive.Trigger> & { hasChildren?: boolean }
>(({ className, hasChildren, children, ...props }, ref) => (
  <TreePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex items-center gap-1 rounded px-2 py-1 hover:bg-accent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'data-[selected]:bg-accent',
      className,
    )}
    {...props}
  >
    {hasChildren !== false && (
      <ChevronRight className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-90" />
    )}
    {children}
  </TreePrimitive.Trigger>
));
Trigger.displayName = 'Tree.Trigger';

const Group = React.forwardRef<
  React.ElementRef<typeof TreePrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof TreePrimitive.Group>
>(({ className, ...props }, ref) => (
  <TreePrimitive.Group ref={ref} className={cn('ml-4 border-l border-border pl-2', className)} {...props} />
));
Group.displayName = 'Tree.Group';

export { Root, Item, Trigger, Group };
