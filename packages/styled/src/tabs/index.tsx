'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = TabsPrimitive.Root;

const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted/70 p-1 text-muted-foreground gap-0.5',
      'border border-border/50',
      className,
    )}
    {...props}
  />
));
List.displayName = 'Tabs.List';

const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium',
      'transition-[background-color,color,box-shadow,transform] duration-smooth ease-spring',
      'hover:text-fg/80',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:scale-[0.97]',
      'data-[state=active]:bg-bg data-[state=active]:text-fg data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
));
Trigger.displayName = 'Tabs.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3',
      'data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:duration-comfortable',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md',
      className,
    )}
    {...props}
  />
));
Content.displayName = 'Tabs.Content';

export { Root, List, Trigger, Content };
