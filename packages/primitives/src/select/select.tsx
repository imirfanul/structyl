'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  DismissableLayer,
  FocusScope,
  Popper,
  useScrollLock,
  useDirection,
} from '@aura-ui/core';
import { useControllableState, useId, useComposedRefs } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

const OPEN_KEYS = ['ArrowUp', 'ArrowDown', 'Enter', ' '];
const SELECTION_KEYS = ['Enter', ' '];

interface SelectContextValue {
  trigger: HTMLButtonElement | null;
  onTriggerChange: (node: HTMLButtonElement | null) => void;
  valueNode: HTMLSpanElement | null;
  onValueNodeChange: (node: HTMLSpanElement | null) => void;
  valueNodeHasChildren: boolean;
  onValueNodeHasChildrenChange: (has: boolean) => void;
  contentId: string;
  value?: string;
  onValueChange: (value: string) => void;
  open: boolean;
  required: boolean;
  onOpenChange: (open: boolean) => void;
  dir: 'ltr' | 'rtl';
  triggerPointerDownPosRef: React.RefObject<{ x: number; y: number } | null>;
  disabled?: boolean;
}

const [SelectProvider, useSelectContext] = createContext<SelectContextValue>('Select');

export interface SelectRootProps {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dir?: 'ltr' | 'rtl';
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}

const Root: React.FC<SelectRootProps> = ({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  dir,
  name,
  autoComplete,
  disabled,
  required = false,
}) => {
  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);
  const [valueNode, setValueNode] = React.useState<HTMLSpanElement | null>(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = React.useState(false);
  const direction = useDirection(dir);
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
  const triggerPointerDownPosRef = React.useRef<{ x: number; y: number } | null>(null);
  return (
    <Popper.Root>
      <SelectProvider
        trigger={trigger}
        onTriggerChange={setTrigger}
        valueNode={valueNode}
        onValueNodeChange={setValueNode}
        valueNodeHasChildren={valueNodeHasChildren}
        onValueNodeHasChildrenChange={setValueNodeHasChildren}
        contentId={useId('select-content')}
        value={value}
        onValueChange={React.useCallback((v: string) => setValue(v), [setValue])}
        open={open}
        required={required}
        onOpenChange={React.useCallback((v: boolean) => setOpen(v), [setOpen])}
        dir={direction}
        triggerPointerDownPosRef={triggerPointerDownPosRef}
        disabled={disabled}
      >
        {children}
        {name ? (
          <BubbleSelect
            aria-hidden
            tabIndex={-1}
            name={name}
            autoComplete={autoComplete}
            value={value ?? ''}
            disabled={disabled}
            required={required}
          />
        ) : null}
      </SelectProvider>
    </Popper.Root>
  );
};
Root.displayName = 'Select.Root';

const BubbleSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    style={{
      transform: 'translateX(-100%)',
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: 0,
    }}
  >
    <option value={props.value as string} />
  </select>
);

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useSelectContext('Select.Trigger');
    const isDisabled = ctx.disabled || props.disabled;
    const composedRef = useComposedRefs(forwardedRef, ctx.onTriggerChange);
    const getItems = () => Array.from(document.querySelectorAll(`[data-select-content="${ctx.contentId}"] [role="option"]`)) as HTMLElement[];

    const handleOpen = (pointerEvent?: React.MouseEvent | React.PointerEvent) => {
      if (!isDisabled) {
        ctx.onOpenChange(true);
        if (pointerEvent)
          ctx.triggerPointerDownPosRef.current = {
            x: Math.round(pointerEvent.pageX),
            y: Math.round(pointerEvent.pageY),
          };
      }
    };

    return (
      <Popper.Anchor asChild>
        <Primitive.button
          type="button"
          role="combobox"
          aria-controls={ctx.contentId}
          aria-expanded={ctx.open}
          aria-required={ctx.required}
          aria-autocomplete="none"
          dir={ctx.dir}
          data-state={ctx.open ? 'open' : 'closed'}
          disabled={isDisabled}
          data-disabled={isDisabled ? '' : undefined}
          data-placeholder={ctx.value === undefined ? '' : undefined}
          {...props}
          ref={composedRef}
          onClick={composeEventHandlers(props.onClick, (event) => {
            event.currentTarget.focus();
          })}
          onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
            const target = event.target as HTMLElement;
            if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
            if (event.button === 0 && event.ctrlKey === false) {
              handleOpen(event);
              event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            const isTypeahead = event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey;
            if (isTypeahead) {
              // delegate to content
              handleOpen();
              return;
            }
            if (OPEN_KEYS.includes(event.key)) {
              handleOpen();
              event.preventDefault();
            }
          })}
        />
      </Popper.Anchor>
    );
  },
);
Trigger.displayName = 'Select.Trigger';

export interface SelectValueProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  placeholder?: React.ReactNode;
}

const Value = React.forwardRef<HTMLSpanElement, SelectValueProps>((props, forwardedRef) => {
  const { placeholder, children, ...rest } = props;
  const ctx = useSelectContext('Select.Value');
  const composedRef = useComposedRefs(forwardedRef, ctx.onValueNodeChange);
  const hasValue = ctx.value !== undefined && ctx.value !== '';
  React.useEffect(() => {
    ctx.onValueNodeHasChildrenChange(Boolean(children));
  }, [ctx, children]);
  return (
    <Primitive.span style={{ pointerEvents: 'none' }} {...rest} ref={composedRef}>
      {hasValue ? children ?? ctx.value : placeholder}
    </Primitive.span>
  );
});
Value.displayName = 'Select.Value';

const Icon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.span aria-hidden {...props} ref={forwardedRef}>
    {props.children ?? '▼'}
  </Primitive.span>
));
Icon.displayName = 'Select.Icon';

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

export interface SelectPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

const Portal: React.FC<SelectPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useSelectContext('Select.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'Select.Portal';

interface SelectContentContextValue {
  contentRef: React.RefObject<HTMLDivElement | null>;
  isPositioned: boolean;
  itemRefCallback: (node: HTMLDivElement | null, value: string, disabled?: boolean) => void;
  selectedItem: HTMLDivElement | null;
  selectedItemText: HTMLSpanElement | null;
  onItemLeave?: () => void;
  itemTextRefCallback: (node: HTMLSpanElement | null, value: string, disabled?: boolean) => void;
  focusSelectedItem: () => void;
  onScrollButtonChange: (button: HTMLElement | null) => void;
}

const [SelectContentContextProvider, useSelectContentContext] =
  createContext<SelectContentContextValue>('SelectContent');

export interface SelectContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  position?: 'item-aligned' | 'popper';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: Event) => void;
}

const Content = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useSelectContext('Select.Content');
    const {
      forceMount = portalCtx.forceMount,
      position = 'popper',
      side = 'bottom',
      sideOffset = 4,
      align = 'start',
      alignOffset,
      avoidCollisions = true,
      collisionPadding,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...rest
    } = props;
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<HTMLDivElement | null>(null);
    const [selectedItemText, setSelectedItemText] = React.useState<HTMLSpanElement | null>(null);
    const composedRef = useComposedRefs(forwardedRef, contentRef);

    useScrollLock(ctx.open);

    const itemRefCallback = React.useCallback(
      (node: HTMLDivElement | null, value: string, disabled?: boolean) => {
        if (!disabled && node && value === ctx.value) setSelectedItem(node);
      },
      [ctx.value],
    );

    const itemTextRefCallback = React.useCallback(
      (node: HTMLSpanElement | null, value: string, disabled?: boolean) => {
        if (!disabled && node && value === ctx.value) setSelectedItemText(node);
      },
      [ctx.value],
    );

    return (
      <Presence present={forceMount || ctx.open}>
        <SelectContentContextProvider
          contentRef={contentRef}
          isPositioned
          itemRefCallback={itemRefCallback}
          selectedItem={selectedItem}
          selectedItemText={selectedItemText}
          itemTextRefCallback={itemTextRefCallback}
          focusSelectedItem={() => {
            if (selectedItem) selectedItem.focus({ preventScroll: true });
            else contentRef.current?.focus({ preventScroll: true });
          }}
          onScrollButtonChange={() => {}}
        >
          <Popper.Content
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionPadding={collisionPadding}
          >
            <DismissableLayer
              asChild
              onEscapeKeyDown={onEscapeKeyDown}
              onPointerDownOutside={(event) => {
                onPointerDownOutside?.(event);
              }}
              onDismiss={() => ctx.onOpenChange(false)}
            >
              <FocusScope
                loop
                trapped
                onMountAutoFocus={(event) => {
                  event.preventDefault();
                  if (selectedItem) selectedItem.focus({ preventScroll: true });
                  else contentRef.current?.focus({ preventScroll: true });
                }}
                onUnmountAutoFocus={composeEventHandlers(onCloseAutoFocus, (event) => {
                  event.preventDefault();
                  ctx.trigger?.focus({ preventScroll: true });
                })}
                style={{ display: 'contents' }}
              >
                <Primitive.div
                  role="listbox"
                  id={ctx.contentId}
                  data-state={ctx.open ? 'open' : 'closed'}
                  dir={ctx.dir}
                  tabIndex={-1}
                  data-select-content={ctx.contentId}
                  {...rest}
                  ref={composedRef}
                  onContextMenu={(event) => event.preventDefault()}
                />
              </FocusScope>
            </DismissableLayer>
          </Popper.Content>
        </SelectContentContextProvider>
      </Presence>
    );
  },
);
Content.displayName = 'Select.Content';

const Viewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => {
  return (
    <Primitive.div
      data-aura-ui-select-viewport
      role="presentation"
      {...props}
      ref={forwardedRef}
      style={{ position: 'relative', flex: 1, overflow: 'auto', ...props.style }}
    />
  );
});
Viewport.displayName = 'Select.Viewport';

interface SelectItemContextValue {
  value: string;
  textId: string;
  isSelected: boolean;
  onItemTextChange: (node: HTMLSpanElement | null) => void;
}

const [SelectItemContextProvider, useSelectItemContext] =
  createContext<SelectItemContextValue>('SelectItem');

export interface SelectItemProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
  textValue?: string;
}

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>((props, forwardedRef) => {
  const { value, disabled, textValue, ...rest } = props;
  const ctx = useSelectContext('Select.Item');
  const contentCtx = useSelectContentContext('Select.Item');
  const isSelected = ctx.value === value;
  const textId = useId('select-item-text');
  const itemRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(forwardedRef, itemRef, (node) =>
    contentCtx.itemRefCallback(node, value, disabled),
  );
  const [itemTextNode, setItemTextNode] = React.useState<HTMLSpanElement | null>(null);

  const handleSelect = () => {
    if (!disabled) {
      ctx.onValueChange(value);
      ctx.onOpenChange(false);
    }
  };

  return (
    <SelectItemContextProvider
      value={value}
      textId={textId}
      isSelected={isSelected}
      onItemTextChange={React.useCallback((node: HTMLSpanElement | null) => {
        setItemTextNode((prev) => prev ?? (node ? node : null));
      }, [])}
    >
      <Primitive.div
        role="option"
        aria-labelledby={textId}
        aria-selected={isSelected && !disabled}
        data-highlighted={undefined}
        data-state={isSelected ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? undefined : -1}
        {...rest}
        ref={composedRef}
        onFocus={composeEventHandlers(rest.onFocus, () => {
          /* highlighted */
        })}
        onPointerMove={composeEventHandlers(rest.onPointerMove, (event) => {
          if (disabled) return;
          (event.currentTarget as HTMLElement).focus({ preventScroll: true });
        })}
        onPointerLeave={composeEventHandlers(rest.onPointerLeave, (event) => {
          if ((event.currentTarget as HTMLElement) === document.activeElement) {
            contentCtx.contentRef.current?.focus({ preventScroll: true });
          }
        })}
        onClick={composeEventHandlers(rest.onClick, (event) => {
          if (!disabled) {
            (event.currentTarget as HTMLElement).focus();
            handleSelect();
          }
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          if (SELECTION_KEYS.includes(event.key)) {
            event.preventDefault();
            handleSelect();
          }
        })}
      />
    </SelectItemContextProvider>
  );
});
Item.displayName = 'Select.Item';

export interface SelectItemTextProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

const ItemText = React.forwardRef<HTMLSpanElement, SelectItemTextProps>(
  (props, forwardedRef) => {
    const ctx = useSelectContext('Select.ItemText');
    const itemCtx = useSelectItemContext('Select.ItemText');
    const contentCtx = useSelectContentContext('Select.ItemText');
    const ref = React.useRef<HTMLSpanElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref, itemCtx.onItemTextChange, (node) =>
      contentCtx.itemTextRefCallback(node, itemCtx.value),
    );
    return (
      <>
        <Primitive.span id={itemCtx.textId} {...props} ref={composedRef} />
        {itemCtx.isSelected && ctx.valueNode && !ctx.valueNodeHasChildren
          ? // SSR safe portal
            null
          : null}
      </>
    );
  },
);
ItemText.displayName = 'Select.ItemText';

const ItemIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean }
>((props, forwardedRef) => {
  const itemCtx = useSelectItemContext('Select.ItemIndicator');
  return itemCtx.isSelected ? (
    <Primitive.span aria-hidden {...props} ref={forwardedRef} />
  ) : null;
});
ItemIndicator.displayName = 'Select.ItemIndicator';

const Group = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div role="group" {...props} ref={forwardedRef} />
));
Group.displayName = 'Select.Group';

const Label = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />);
Label.displayName = 'Select.Label';

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div role="separator" aria-orientation="horizontal" {...props} ref={forwardedRef} />
));
Separator.displayName = 'Select.Separator';

export {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  Group,
  Label,
  Separator,
};
