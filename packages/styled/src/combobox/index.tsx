'use client';

import * as React from 'react';
import { Check } from '@aura-ui/icons';
import { Combobox as ComboboxPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = ComboboxPrimitive.Root;
const Group = ComboboxPrimitive.Group;

const Input = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Input
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Combobox.Input';

const Content = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 max-h-96 min-w-[8rem] overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        className,
      )}
      {...props}
    />
  </ComboboxPrimitive.Portal>
));
Content.displayName = 'Combobox.Content';

const Item = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <span className="hidden group-data-[state=checked]:block">
        <Check className="h-4 w-4" />
      </span>
    </span>
  </ComboboxPrimitive.Item>
));
Item.displayName = 'Combobox.Item';

const Empty = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <ComboboxPrimitive.Empty
      ref={ref as never}
      className={cn('py-6 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
);
Empty.displayName = 'Combobox.Empty';

export { Root, Group, Input, Content, Item, Empty };
