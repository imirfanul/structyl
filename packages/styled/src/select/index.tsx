'use client';

import * as React from 'react';
import { Check, ChevronDown, Plus } from '@structyl/icons';
import { Select as SelectPrimitive } from '@structyl/primitives';
import type { SelectOption } from '@structyl/primitives';
import { cn } from '@structyl/utils';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;
const Value = SelectPrimitive.Value;

const itemClassName = cn(
  'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm outline-none',
  'duration-instant transition-colors',
  'focus:bg-accent focus:text-accent-foreground',
  'data-[state=checked]:font-medium',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
);

const itemIndicatorClassName = 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center';

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'border-border bg-bg shadow-xs group flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-1 text-sm',
      'duration-snappy ease-smooth transition-[border-color,box-shadow,background-color,transform]',
      'hover:border-border-strong hover:bg-accent/30',
      'data-[placeholder]:text-muted-foreground/70',
      'focus:border-ring focus:ring-ring/30 focus:outline-none focus:ring-2',
      'data-[state=open]:border-ring data-[state=open]:ring-ring/30 data-[state=open]:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'active:duration-instant active:scale-[0.98]',
      '[&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="text-muted-foreground duration-smooth ease-spring h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = 'Select.Trigger';

const SearchInput = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.SearchInput>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.SearchInput>
>(({ className, placeholder = 'Search options...', ...props }, ref) => (
  <SelectPrimitive.SearchInput
    ref={ref}
    {...props}
    aria-label={props['aria-label'] ?? 'Search options'}
    placeholder={placeholder}
    className={cn(
      'border-border placeholder:text-muted-foreground h-10 w-full border-b bg-transparent px-3 text-sm outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
  />
));
SearchInput.displayName = 'Select.SearchInput';

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  container?: Element | DocumentFragment | null;
  options?: SelectOption[];
  optionHeight?: number;
  optionOverscan?: number;
  optionEmptyMessage?: React.ReactNode;
  renderOption?: (option: SelectOption) => React.ReactNode;
  showCreateItem?: boolean;
};

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(
  (
    {
      className,
      children,
      position = 'popper',
      options,
      optionHeight = 36,
      optionOverscan = 6,
      optionEmptyMessage,
      renderOption,
      showCreateItem = true,
      container,
      ...props
    },
    ref,
  ) => (
    <SelectPrimitive.Portal container={container ?? undefined}>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          'border-border bg-popover/95 backdrop-blur-glass text-popover-foreground shadow-overlay relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border',
          'origin-[var(--structyl-popper-transform-origin,center)]',
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
        <SearchInput />
        <SelectPrimitive.Viewport
          className={cn(
            'max-h-80 p-1',
            position === 'popper' && 'w-full min-w-[var(--structyl-popper-anchor-width)]',
          )}
        >
          {options ? (
            <Options
              options={options}
              itemHeight={optionHeight}
              overscan={optionOverscan}
              emptyMessage={optionEmptyMessage}
              renderOption={renderOption}
            />
          ) : (
            children
          )}
          {showCreateItem ? <CreateItem /> : null}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
Content.displayName = 'Select.Content';

const Label = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'text-muted-foreground px-2 py-1.5 text-xs font-semibold uppercase tracking-wide',
      className,
    )}
    {...props}
  />
));
Label.displayName = 'Select.Label';

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn(itemClassName, className)} {...props}>
    <span className={itemIndicatorClassName}>
      <SelectPrimitive.ItemIndicator>
        <Check className="text-primary animate-in zoom-in-50 h-4 w-4 duration-150" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = 'Select.Item';

const CreateItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.CreateItem>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.CreateItem>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.CreateItem ref={ref} className={cn(itemClassName, className)} {...props}>
    {(value) => (
      <>
        <span className="text-primary flex h-4 w-4 items-center justify-center">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>
          {typeof children === 'function' ? children(value) : (children ?? `Create "${value}"`)}
        </span>
      </>
    )}
  </SelectPrimitive.CreateItem>
));
CreateItem.displayName = 'Select.CreateItem';

const Options = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Options>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Options>
>(
  (
    {
      className,
      itemClassName: optionItemClassName,
      itemIndicatorClassName: optionIndicatorClassName,
      renderItemIndicator,
      ...props
    },
    ref,
  ) => (
    <SelectPrimitive.Options
      ref={ref}
      className={cn('min-h-0', className)}
      itemClassName={cn(itemClassName, optionItemClassName)}
      itemIndicatorClassName={cn(itemIndicatorClassName, optionIndicatorClassName)}
      renderItemIndicator={(option) =>
        renderItemIndicator ? (
          renderItemIndicator(option)
        ) : (
          <Check className="text-primary animate-in zoom-in-50 h-4 w-4 duration-150" />
        )
      }
      {...props}
    />
  ),
);
Options.displayName = 'Select.Options';

const Separator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('bg-border -mx-1 my-1 h-px', className)}
    {...props}
  />
));
Separator.displayName = 'Select.Separator';

export {
  Root,
  Group,
  Value,
  Trigger,
  SearchInput,
  Content,
  Label,
  Item,
  CreateItem,
  Options,
  Separator,
};
