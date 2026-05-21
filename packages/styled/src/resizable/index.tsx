'use client';

import * as React from 'react';
import { GripVertical } from '@aura-ui/icons';
import { Resizable as ResizablePrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Group = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.Group>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.Group
    ref={ref}
    className={cn('flex h-full w-full', className)}
    {...props}
  />
));
Group.displayName = 'Resizable.Group';

const Panel = ResizablePrimitive.Panel;

const Handle = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.Handle>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.Handle> & { withHandle?: boolean }
>(({ className, withHandle, ...props }, ref) => (
  <ResizablePrimitive.Handle
    ref={ref}
    className={cn(
      'relative flex w-px items-center justify-center bg-border',
      'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.Handle>
));
Handle.displayName = 'Resizable.Handle';

export { Group, Panel, Handle };
