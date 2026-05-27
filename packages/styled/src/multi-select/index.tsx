'use client';

import * as React from 'react';
import { Check, ChevronDown, Plus } from '@aura-ui/icons';
import { MultiSelect as MultiSelectPrimitive } from '@aura-ui/primitives';
import type { MultiSelectOption, MultiSelectSelectedOption } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = MultiSelectPrimitive.Root;
const Group = MultiSelectPrimitive.Group;

const itemClassName = cn(
  'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm outline-none',
  'duration-instant transition-colors',
  'focus:bg-accent focus:text-accent-foreground',
  'data-[state=checked]:font-medium',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
);

const itemIndicatorClassName = 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center';

const Trigger = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <MultiSelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'border-border bg-bg shadow-xs group flex min-h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-sm',
      'duration-snappy ease-smooth transition-[border-color,box-shadow,background-color,transform]',
      'hover:border-border-strong hover:bg-accent/30',
      'data-[placeholder]:text-muted-foreground/70',
      'focus:border-ring focus:ring-ring/30 focus:outline-none focus:ring-2',
      'data-[state=open]:border-ring data-[state=open]:ring-ring/30 data-[state=open]:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'active:duration-instant active:scale-[0.98]',
      className,
    )}
    {...props}
  >
    {children}
    <MultiSelectPrimitive.Icon asChild>
      <ChevronDown className="text-muted-foreground duration-smooth ease-spring h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
    </MultiSelectPrimitive.Icon>
  </MultiSelectPrimitive.Trigger>
));
Trigger.displayName = 'MultiSelect.Trigger';

type MultiSelectValueProps = Omit<
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Value>,
  'children'
> & {
  children?: React.ReactNode | ((selected: MultiSelectSelectedOption[]) => React.ReactNode);
  itemClassName?: string;
  overflowClassName?: string;
  maxVisible?: number;
};

const Value = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Value>,
  MultiSelectValueProps
>(
  (
    {
      className,
      children,
      itemClassName: selectedItemClassName,
      overflowClassName,
      maxVisible,
      ...props
    },
    ref,
  ) => (
    <MultiSelectPrimitive.Value
      ref={ref}
      className={cn('flex min-w-0 flex-1 flex-wrap items-center gap-1 text-left', className)}
      {...props}
    >
      {children ??
        ((selected: MultiSelectSelectedOption[]) => {
          const visibleItems =
            typeof maxVisible === 'number' ? selected.slice(0, maxVisible) : selected;
          const overflowCount =
            typeof maxVisible === 'number' ? selected.length - visibleItems.length : 0;

          return (
            <>
              {visibleItems.map((option: MultiSelectSelectedOption) => (
                <span
                  key={option.value}
                  className={cn(
                    'bg-secondary text-secondary-foreground inline-flex max-w-full items-center rounded px-1.5 py-0.5 text-xs font-medium',
                    selectedItemClassName,
                  )}
                >
                  {option.label}
                </span>
              ))}
              {overflowCount > 0 ? (
                <span
                  className={cn(
                    'bg-muted text-muted-foreground inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium',
                    overflowClassName,
                  )}
                >
                  +{overflowCount}
                </span>
              ) : null}
            </>
          );
        })}
    </MultiSelectPrimitive.Value>
  ),
);
Value.displayName = 'MultiSelect.Value';

const SearchInput = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.SearchInput>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.SearchInput>
>(({ className, placeholder = 'Search options...', ...props }, ref) => (
  <MultiSelectPrimitive.SearchInput
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
SearchInput.displayName = 'MultiSelect.SearchInput';

type MultiSelectContentProps = React.ComponentPropsWithoutRef<
  typeof MultiSelectPrimitive.Content
> & {
  options?: MultiSelectOption[];
  optionHeight?: number;
  optionOverscan?: number;
  optionEmptyMessage?: React.ReactNode;
  renderOption?: (option: MultiSelectOption) => React.ReactNode;
  showCreateItem?: boolean;
};

const Content = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Content>,
  MultiSelectContentProps
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
      ...props
    },
    ref,
  ) => (
    <MultiSelectPrimitive.Portal>
      <MultiSelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          'border-border bg-popover/95 backdrop-blur-glass text-popover-foreground shadow-overlay relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border',
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
        <SearchInput />
        <MultiSelectPrimitive.Viewport
          className={cn(
            'max-h-80 p-1',
            position === 'popper' && 'w-full min-w-[var(--aura-ui-popper-anchor-width)]',
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
        </MultiSelectPrimitive.Viewport>
      </MultiSelectPrimitive.Content>
    </MultiSelectPrimitive.Portal>
  ),
);
Content.displayName = 'MultiSelect.Content';

const Label = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MultiSelectPrimitive.Label
    ref={ref}
    className={cn(
      'text-muted-foreground px-2 py-1.5 text-xs font-semibold uppercase tracking-wide',
      className,
    )}
    {...props}
  />
));
Label.displayName = 'MultiSelect.Label';

const Item = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <MultiSelectPrimitive.Item ref={ref} className={cn(itemClassName, className)} {...props}>
    <span className={itemIndicatorClassName}>
      <MultiSelectPrimitive.ItemIndicator>
        <Check className="text-primary animate-in zoom-in-50 h-4 w-4 duration-150" />
      </MultiSelectPrimitive.ItemIndicator>
    </span>
    <MultiSelectPrimitive.ItemText>{children}</MultiSelectPrimitive.ItemText>
  </MultiSelectPrimitive.Item>
));
Item.displayName = 'MultiSelect.Item';

const CreateItem = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.CreateItem>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.CreateItem>
>(({ className, children, ...props }, ref) => (
  <MultiSelectPrimitive.CreateItem ref={ref} className={cn(itemClassName, className)} {...props}>
    {(value: string) => (
      <>
        <span className="text-primary flex h-4 w-4 items-center justify-center">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>
          {typeof children === 'function' ? children(value) : (children ?? `Create "${value}"`)}
        </span>
      </>
    )}
  </MultiSelectPrimitive.CreateItem>
));
CreateItem.displayName = 'MultiSelect.CreateItem';

const Options = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Options>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Options>
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
    <MultiSelectPrimitive.Options
      ref={ref}
      className={cn('min-h-0', className)}
      itemClassName={cn(itemClassName, optionItemClassName)}
      itemIndicatorClassName={cn(itemIndicatorClassName, optionIndicatorClassName)}
      renderItemIndicator={(option: MultiSelectOption) =>
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
Options.displayName = 'MultiSelect.Options';

const Separator = React.forwardRef<
  React.ElementRef<typeof MultiSelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MultiSelectPrimitive.Separator
    ref={ref}
    className={cn('bg-border -mx-1 my-1 h-px', className)}
    {...props}
  />
));
Separator.displayName = 'MultiSelect.Separator';

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
