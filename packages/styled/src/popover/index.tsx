'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;
const Anchor = PopoverPrimitive.Anchor;
const Portal = PopoverPrimitive.Portal;
const Close = PopoverPrimitive.Close;
const Arrow = PopoverPrimitive.Arrow;

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 6, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-xl border border-border bg-popover/95 backdrop-blur-glass p-4 text-popover-foreground shadow-overlay outline-none',
        'origin-[var(--aura-ui-popper-transform-origin,center)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1',
        'data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
Content.displayName = 'Popover.Content';

export { Root, Trigger, Anchor, Portal, Close, Arrow, Content };
