'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Provider = TooltipPrimitive.Provider;
const Root = TooltipPrimitive.Root;
const Trigger = TooltipPrimitive.Trigger;
const Portal = TooltipPrimitive.Portal;
const Arrow = TooltipPrimitive.Arrow;

const Content = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md bg-fg/90 px-2.5 py-1.5 text-xs font-medium text-bg shadow-md backdrop-blur-sm',
        'origin-[var(--aura-ui-popper-transform-origin,center)]',
        'animate-in fade-in-0 zoom-in-95 duration-snappy',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1',
        'data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
Content.displayName = 'Tooltip.Content';

export { Provider, Root, Trigger, Portal, Content, Arrow };
