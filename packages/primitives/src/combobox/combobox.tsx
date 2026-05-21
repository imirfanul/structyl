'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  DismissableLayer,
  Popper,
  useDirection,
} from '@your-lib/core';
import { useControllableState, useId, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

interface ComboboxContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inputValue: string;
  onInputValueChange: (value: string) => void;
  value?: string;
  onValueChange: (value: string) => void;
  contentId: string;
  triggerRef: React.RefObject<HTMLInputElement | null>;
  highlightedItem: string | null;
  onHighlightedItemChange: (value: string | null) => void;
  dir: 'ltr' | 'rtl';
  disabled?: boolean;
}

const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContextValue>('Combobox');

export interface ComboboxRootProps {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dir?: 'ltr' | 'rtl';
  disabled?: boolean;
}

const Root: React.FC<ComboboxRootProps> = ({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  inputValue: inputValueProp,
  defaultInputValue = '',
  onInputValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  dir,
  disabled,
}) => {
  const direction = useDirection(dir);
  const triggerRef = React.useRef<HTMLInputElement>(null);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [value, setValue] = useControllableState<string | undefined>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: (v) => onValueChange?.(v as string),
  });
  const [inputValue = '', setInputValue] = useControllableState<string>({
    prop: inputValueProp,
    defaultProp: defaultInputValue,
    onChange: onInputValueChange,
  });
  const [highlightedItem, setHighlightedItem] = React.useState<string | null>(null);
  return (
    <Popper.Root>
      <ComboboxProvider
        open={open}
        onOpenChange={React.useCallback((v: boolean) => setOpen(v), [setOpen])}
        inputValue={inputValue}
        onInputValueChange={React.useCallback((v: string) => setInputValue(v), [setInputValue])}
        value={value}
        onValueChange={React.useCallback((v: string) => setValue(v), [setValue])}
        contentId={useId('combobox-content')}
        triggerRef={triggerRef}
        highlightedItem={highlightedItem}
        onHighlightedItemChange={setHighlightedItem}
        dir={direction}
        disabled={disabled}
      >
        {children}
      </ComboboxProvider>
    </Popper.Root>
  );
};
Root.displayName = 'Combobox.Root';

export interface ComboboxInputProps extends React.ComponentPropsWithoutRef<'input'> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  (props, forwardedRef) => {
    const ctx = useComboboxContext('Combobox.Input');
    const composedRef = useComposedRefs(forwardedRef, ctx.triggerRef);
    const getItems = () =>
      Array.from(document.querySelectorAll<HTMLElement>(`#${ctx.contentId} [role="option"]:not([data-disabled])`));

    return (
      <Popper.Anchor asChild>
        <Primitive.input
          type="text"
          role="combobox"
          aria-controls={ctx.contentId}
          aria-expanded={ctx.open}
          aria-autocomplete="list"
          aria-activedescendant={ctx.highlightedItem || undefined}
          autoComplete="off"
          spellCheck={false}
          value={ctx.inputValue}
          disabled={ctx.disabled || props.disabled}
          {...props}
          ref={composedRef}
          onChange={composeEventHandlers(props.onChange, (event) => {
            ctx.onInputValueChange(event.currentTarget.value);
            if (!ctx.open) ctx.onOpenChange(true);
          })}
          onFocus={composeEventHandlers(props.onFocus, () => {
            ctx.onOpenChange(true);
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            const items = getItems();
            if (!items.length) return;
            const currentIdx = ctx.highlightedItem
              ? items.findIndex((i) => i.getAttribute('data-value') === ctx.highlightedItem)
              : -1;
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              if (!ctx.open) ctx.onOpenChange(true);
              const next = items[(currentIdx + 1) % items.length];
              if (next) ctx.onHighlightedItemChange(next.getAttribute('data-value'));
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              const prev = items[(currentIdx - 1 + items.length) % items.length];
              if (prev) ctx.onHighlightedItemChange(prev.getAttribute('data-value'));
            } else if (event.key === 'Enter') {
              if (ctx.highlightedItem) {
                event.preventDefault();
                ctx.onValueChange(ctx.highlightedItem);
                const item = items.find((i) => i.getAttribute('data-value') === ctx.highlightedItem);
                ctx.onInputValueChange(item?.textContent ?? ctx.highlightedItem);
                ctx.onOpenChange(false);
              }
            } else if (event.key === 'Escape') {
              ctx.onOpenChange(false);
            }
          })}
        />
      </Popper.Anchor>
    );
  },
);
Input.displayName = 'Combobox.Input';

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

export interface ComboboxPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

const Portal: React.FC<ComboboxPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useComboboxContext('Combobox.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'Combobox.Portal';

export interface ComboboxContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  avoidCollisions?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

const Content = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useComboboxContext('Combobox.Content');
    const {
      forceMount = portalCtx.forceMount,
      side = 'bottom',
      sideOffset = 4,
      align = 'start',
      avoidCollisions = true,
      onEscapeKeyDown,
      ...rest
    } = props;
    return (
      <Presence present={forceMount || ctx.open}>
        <Popper.Content
          side={side}
          sideOffset={sideOffset}
          align={align}
          avoidCollisions={avoidCollisions}
        >
          <DismissableLayer
            asChild
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={(event) => {
              const target = event.target as HTMLElement;
              if (ctx.triggerRef.current?.contains(target)) event.preventDefault();
            }}
            onDismiss={() => ctx.onOpenChange(false)}
          >
            <Primitive.div
              role="listbox"
              id={ctx.contentId}
              data-state={ctx.open ? 'open' : 'closed'}
              dir={ctx.dir}
              {...rest}
              ref={forwardedRef}
            />
          </DismissableLayer>
        </Popper.Content>
      </Presence>
    );
  },
);
Content.displayName = 'Combobox.Content';

export interface ComboboxItemProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
  textValue?: string;
}

const Item = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  (props, forwardedRef) => {
    const { value, disabled, textValue, ...rest } = props;
    const ctx = useComboboxContext('Combobox.Item');
    const isSelected = ctx.value === value;
    const isHighlighted = ctx.highlightedItem === value;
    const itemId = useId('combobox-item');
    return (
      <Primitive.div
        id={itemId}
        role="option"
        aria-selected={isSelected}
        data-value={value}
        data-highlighted={isHighlighted ? '' : undefined}
        data-state={isSelected ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        aria-disabled={disabled || undefined}
        {...rest}
        ref={forwardedRef}
        onPointerMove={composeEventHandlers(rest.onPointerMove, () => {
          if (!disabled) ctx.onHighlightedItemChange(value);
        })}
        onClick={composeEventHandlers(rest.onClick, () => {
          if (disabled) return;
          ctx.onValueChange(value);
          ctx.onInputValueChange(textValue ?? value);
          ctx.onOpenChange(false);
          ctx.triggerRef.current?.focus();
        })}
      />
    );
  },
);
Item.displayName = 'Combobox.Item';

const Empty = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />,
);
Empty.displayName = 'Combobox.Empty';

const Group = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div role="group" {...props} ref={forwardedRef} />
));
Group.displayName = 'Combobox.Group';

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div role="separator" {...props} ref={forwardedRef} />
));
Separator.displayName = 'Combobox.Separator';

export { Root, Input, Portal, Content, Item, Empty, Group, Separator };
