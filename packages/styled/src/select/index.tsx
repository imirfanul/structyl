'use client';

import * as React from 'react';
import { Check, ChevronDown } from '@aura-ui/icons';
import { Select as SelectPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;
const Value = SelectPrimitive.Value;

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'group flex h-9 w-full items-center justify-between gap-2 rounded-md border border-border bg-bg px-3 py-1 text-sm shadow-xs',
      'transition-[border-color,box-shadow,background-color,transform] duration-snappy ease-smooth',
      'hover:border-border-strong hover:bg-accent/30',
      'data-[placeholder]:text-muted-foreground/70',
      'focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30',
      'data-[state=open]:border-ring data-[state=open]:ring-2 data-[state=open]:ring-ring/30',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'active:scale-[0.98] active:duration-instant',
      '[&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-smooth ease-spring group-data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = 'Select.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover/95 backdrop-blur-glass text-popover-foreground shadow-overlay',
        'origin-[var(--aura-ui-popper-transform-origin,center)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1',
        'data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--aura-ui-popper-anchor-height)] w-full min-w-[var(--aura-ui-popper-anchor-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = 'Select.Content';

const Label = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground', className)}
    {...props}
  />
));
Label.displayName = 'Select.Label';

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm outline-none',
      'transition-colors duration-instant',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[state=checked]:font-medium',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary animate-in zoom-in-50 duration-150" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = 'Select.Item';

const Separator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
));
Separator.displayName = 'Select.Separator';

export { Root, Group, Value, Trigger, Content, Label, Item, Separator };
