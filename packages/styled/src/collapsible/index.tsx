'use client';

import * as React from 'react';
import { Collapsible as CollapsiblePrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = CollapsiblePrimitive.Root;

const Trigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex items-center justify-between font-medium transition-all',
      '[&[data-state=open]>svg]:rotate-180',
      className,
    )}
    {...props}
  />
));
Trigger.displayName = 'Collapsible.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm',
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      className,
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Content>
));
Content.displayName = 'Collapsible.Content';

export { Root, Trigger, Content };
