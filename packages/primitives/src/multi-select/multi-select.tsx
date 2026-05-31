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
} from '@structyl/core';
import { useControllableState, useId, useComposedRefs } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';

const OPEN_KEYS = ['ArrowUp', 'ArrowDown', 'Enter', ' '];
const SELECTION_KEYS = ['Enter', ' '];

export interface MultiSelectFilterOption {
  value: string;
  textValue: string;
}

export interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  textValue?: string;
  disabled?: boolean;
}

export interface MultiSelectSelectedOption extends MultiSelectOption {
  textValue: string;
}

interface MultiSelectContextValue {
  trigger: HTMLButtonElement | null;
  onTriggerChange: (node: HTMLButtonElement | null) => void;
  searchInput: HTMLInputElement | null;
  onSearchInputChange: (node: HTMLInputElement | null) => void;
  contentId: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  onValueAdd: (value: string) => void;
  onValueToggle: (value: string) => void;
  open: boolean;
  required: boolean;
  onOpenChange: (open: boolean) => void;
  dir: 'ltr' | 'rtl';
  triggerPointerDownPosRef: React.RefObject<{ x: number; y: number } | null>;
  disabled?: boolean;
  searchable: boolean;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  filterOption: (option: MultiSelectFilterOption, searchValue: string) => boolean;
  onCreateOption?: (value: string) => void;
  createOptionLabel?: React.ReactNode | ((value: string) => React.ReactNode);
}

const [MultiSelectProvider, useMultiSelectContext] =
  createContext<MultiSelectContextValue>('MultiSelect');

const defaultFilterOption = (option: MultiSelectFilterOption, searchValue: string) => {
  const query = normalizeSearch(searchValue);
  if (!query) return true;
  return (
    normalizeSearch(option.textValue).includes(query) ||
    normalizeSearch(option.value).includes(query)
  );
};

export interface MultiSelectRootProps {
  children?: React.ReactNode;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dir?: 'ltr' | 'rtl';
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (value: string) => void;
  filterOption?: (option: MultiSelectFilterOption, searchValue: string) => boolean;
  onCreateOption?: (value: string) => void;
  createOptionLabel?: React.ReactNode | ((value: string) => React.ReactNode);
  resetSearchOnClose?: boolean;
}

const Root: React.FC<MultiSelectRootProps> = ({
  children,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  dir,
  name,
  autoComplete,
  disabled,
  required = false,
  searchable = false,
  searchValue: searchValueProp,
  defaultSearchValue = '',
  onSearchValueChange,
  filterOption = defaultFilterOption,
  onCreateOption,
  createOptionLabel,
  resetSearchOnClose = true,
}) => {
  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);
  const [searchInput, setSearchInput] = React.useState<HTMLInputElement | null>(null);
  const direction = useDirection(dir);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [value = [], setValue] = useControllableState<string[]>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [searchValue = '', setSearchValue] = useControllableState<string>({
    prop: searchValueProp,
    defaultProp: defaultSearchValue,
    onChange: onSearchValueChange,
  });
  const triggerPointerDownPosRef = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (!open && resetSearchOnClose) setSearchValue('');
  }, [open, resetSearchOnClose, setSearchValue]);

  const handleValueAdd = React.useCallback(
    (nextValue: string) => {
      setValue((current = []) =>
        current.includes(nextValue) ? current : [...current, nextValue],
      );
    },
    [setValue],
  );

  const handleValueToggle = React.useCallback(
    (nextValue: string) => {
      setValue((current = []) =>
        current.includes(nextValue)
          ? current.filter((itemValue) => itemValue !== nextValue)
          : [...current, nextValue],
      );
    },
    [setValue],
  );

  return (
    <Popper.Root>
      <MultiSelectProvider
        trigger={trigger}
        onTriggerChange={setTrigger}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        contentId={useId('multi-select-content')}
        value={value}
        onValueChange={React.useCallback((nextValue: string[]) => setValue(nextValue), [setValue])}
        onValueAdd={handleValueAdd}
        onValueToggle={handleValueToggle}
        open={open}
        required={required}
        onOpenChange={React.useCallback((nextOpen: boolean) => setOpen(nextOpen), [setOpen])}
        dir={direction}
        triggerPointerDownPosRef={triggerPointerDownPosRef}
        disabled={disabled}
        searchable={searchable}
        searchValue={searchValue}
        onSearchValueChange={React.useCallback(
          (nextSearchValue: string) => setSearchValue(nextSearchValue),
          [setSearchValue],
        )}
        filterOption={filterOption}
        onCreateOption={onCreateOption}
        createOptionLabel={createOptionLabel}
      >
        {children}
        {name ? (
          <BubbleSelect
            aria-hidden
            tabIndex={-1}
            name={name}
            autoComplete={autoComplete}
            value={value}
            disabled={disabled}
            required={required}
          />
        ) : null}
      </MultiSelectProvider>
    </Popper.Root>
  );
};
Root.displayName = 'MultiSelect.Root';

interface BubbleSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'defaultValue'> {
  value: string[];
}

const BubbleSelect: React.FC<BubbleSelectProps> = ({ value, ...props }) => (
  <select
    {...props}
    multiple
    value={value}
    onChange={() => {}}
    style={{
      transform: 'translateX(-100%)',
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: 0,
    }}
  >
    {value.map((itemValue) => (
      <option key={itemValue} value={itemValue} />
    ))}
  </select>
);

export interface MultiSelectTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

const Trigger = React.forwardRef<HTMLButtonElement, MultiSelectTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useMultiSelectContext('MultiSelect.Trigger');
    const isDisabled = ctx.disabled || props.disabled;
    const composedRef = useComposedRefs(forwardedRef, ctx.onTriggerChange);

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
          aria-haspopup="listbox"
          aria-required={ctx.required}
          aria-autocomplete={ctx.searchable ? 'list' : 'none'}
          dir={ctx.dir}
          data-state={ctx.open ? 'open' : 'closed'}
          disabled={isDisabled}
          data-disabled={isDisabled ? '' : undefined}
          data-placeholder={ctx.value.length === 0 ? '' : undefined}
          {...props}
          ref={composedRef}
          onClick={composeEventHandlers(props.onClick, (event) => {
            event.currentTarget.focus();
          })}
          onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
            const target = event.target as HTMLElement;
            if (
              typeof target.hasPointerCapture === 'function' &&
              target.hasPointerCapture(event.pointerId)
            ) {
              target.releasePointerCapture(event.pointerId);
            }
            if (event.button === 0 && event.ctrlKey === false) {
              handleOpen(event);
              event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            const isTypeahead =
              event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey;
            if (isTypeahead) {
              if (ctx.searchable) ctx.onSearchValueChange(event.key);
              handleOpen();
              event.preventDefault();
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
Trigger.displayName = 'MultiSelect.Trigger';

export interface MultiSelectValueProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  asChild?: boolean;
  placeholder?: React.ReactNode;
  options?: MultiSelectOption[];
  separator?: React.ReactNode;
  children?: React.ReactNode | ((selected: MultiSelectSelectedOption[]) => React.ReactNode);
}

const Value = React.forwardRef<HTMLSpanElement, MultiSelectValueProps>((props, forwardedRef) => {
  const { placeholder, options = [], separator = ', ', children, ...rest } = props;
  const ctx = useMultiSelectContext('MultiSelect.Value');
  const optionMap = React.useMemo(
    () => new Map(options.map((option) => [option.value, option])),
    [options],
  );
  const selected = React.useMemo<MultiSelectSelectedOption[]>(
    () =>
      ctx.value.map((itemValue) => {
        const option = optionMap.get(itemValue);
        return {
          value: itemValue,
          label: option?.label ?? itemValue,
          textValue: option ? getOptionTextValue(option) : itemValue,
          disabled: option?.disabled,
        };
      }),
    [ctx.value, optionMap],
  );
  const hasValue = selected.length > 0;
  const content =
    typeof children === 'function'
      ? children(selected)
      : (children ??
        selected.map((option, index) => (
          <React.Fragment key={option.value}>
            {index > 0 ? separator : null}
            <Primitive.span data-multi-select-value-item="">{option.label}</Primitive.span>
          </React.Fragment>
        )));

  return (
    <Primitive.span style={{ pointerEvents: 'none' }} {...rest} ref={forwardedRef}>
      {hasValue ? content : placeholder}
    </Primitive.span>
  );
});
Value.displayName = 'MultiSelect.Value';

const Icon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.span aria-hidden {...props} ref={forwardedRef}>
    {props.children ?? '▼'}
  </Primitive.span>
));
Icon.displayName = 'MultiSelect.Icon';

export interface MultiSelectSearchInputProps extends React.ComponentPropsWithoutRef<'input'> {
  asChild?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, MultiSelectSearchInputProps>(
  (props, forwardedRef) => {
    const ctx = useMultiSelectContext('MultiSelect.SearchInput');
    const composedRef = useComposedRefs(forwardedRef, ctx.onSearchInputChange);

    if (!ctx.searchable) return null;

    const focusFirstItem = () => {
      const firstItem = document.querySelector<HTMLElement>(
        `[data-multi-select-content="${ctx.contentId}"] [role="option"]:not([data-disabled]):not([hidden])`,
      );
      firstItem?.focus({ preventScroll: true });
    };

    const createSearchValue = () => {
      const value = ctx.searchValue.trim();
      if (!value || !ctx.onCreateOption) return false;
      ctx.onCreateOption(value);
      ctx.onValueAdd(value);
      ctx.onSearchValueChange('');
      ctx.searchInput?.focus({ preventScroll: true });
      return true;
    };

    return (
      <Primitive.input
        type="search"
        role="searchbox"
        aria-controls={ctx.contentId}
        autoComplete="off"
        spellCheck={false}
        {...props}
        ref={composedRef}
        value={ctx.searchValue}
        onChange={composeEventHandlers(props.onChange, (event) => {
          ctx.onSearchValueChange(event.currentTarget.value);
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusFirstItem();
          } else if (event.key === 'Enter') {
            const firstItem = document.querySelector<HTMLElement>(
              `[data-multi-select-content="${ctx.contentId}"] [role="option"]:not([data-disabled]):not([hidden])`,
            );
            if (!firstItem || firstItem.hasAttribute('data-multi-select-create-option')) {
              if (createSearchValue()) event.preventDefault();
            }
          } else if (event.key === 'Escape') {
            ctx.onOpenChange(false);
          }
        })}
      />
    );
  },
);
SearchInput.displayName = 'MultiSelect.SearchInput';

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

export interface MultiSelectPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

const Portal: React.FC<MultiSelectPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useMultiSelectContext('MultiSelect.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'MultiSelect.Portal';

interface MultiSelectContentContextValue {
  contentRef: React.RefObject<HTMLDivElement | null>;
  itemRefCallback: (node: HTMLDivElement | null, value: string, disabled?: boolean) => void;
  selectedItem: HTMLDivElement | null;
}

const [MultiSelectContentContextProvider, useMultiSelectContentContext] =
  createContext<MultiSelectContentContextValue>('MultiSelectContent');

export interface MultiSelectContentProps extends React.ComponentPropsWithoutRef<'div'> {
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

const Content = React.forwardRef<HTMLDivElement, MultiSelectContentProps>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useMultiSelectContext('MultiSelect.Content');
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
    const composedRef = useComposedRefs(forwardedRef, contentRef);

    useScrollLock(ctx.open);

    const itemRefCallback = React.useCallback(
      (node: HTMLDivElement | null, itemValue: string, disabled?: boolean) => {
        if (!disabled && node && ctx.value.includes(itemValue)) setSelectedItem(node);
      },
      [ctx.value],
    );

    return (
      <Presence present={forceMount || ctx.open}>
        <MultiSelectContentContextProvider
          contentRef={contentRef}
          itemRefCallback={itemRefCallback}
          selectedItem={selectedItem}
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
                  if (ctx.searchable) ctx.searchInput?.focus({ preventScroll: true });
                  else if (selectedItem) selectedItem.focus({ preventScroll: true });
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
                  aria-multiselectable="true"
                  data-state={ctx.open ? 'open' : 'closed'}
                  data-position={position}
                  dir={ctx.dir}
                  tabIndex={-1}
                  data-multi-select-content={ctx.contentId}
                  {...rest}
                  ref={composedRef}
                  onContextMenu={(event) => event.preventDefault()}
                />
              </FocusScope>
            </DismissableLayer>
          </Popper.Content>
        </MultiSelectContentContextProvider>
      </Presence>
    );
  },
);
Content.displayName = 'MultiSelect.Content';

const Viewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div
    data-structyl-multi-select-viewport
    role="presentation"
    {...props}
    ref={forwardedRef}
    style={{ position: 'relative', flex: 1, overflow: 'auto', ...props.style }}
  />
));
Viewport.displayName = 'MultiSelect.Viewport';

interface MultiSelectItemContextValue {
  value: string;
  textId: string;
  isSelected: boolean;
}

const [MultiSelectItemContextProvider, useMultiSelectItemContext] =
  createContext<MultiSelectItemContextValue>('MultiSelectItem');

export interface MultiSelectItemProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
  textValue?: string;
}

const Item = React.forwardRef<HTMLDivElement, MultiSelectItemProps>((props, forwardedRef) => {
  const { value, disabled, textValue, children, ...rest } = props;
  const ctx = useMultiSelectContext('MultiSelect.Item');
  const contentCtx = useMultiSelectContentContext('MultiSelect.Item');
  const isSelected = ctx.value.includes(value);
  const textId = useId('multi-select-item-text');
  const itemRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(forwardedRef, itemRef, (node) =>
    contentCtx.itemRefCallback(node, value, disabled),
  );
  const resolvedTextValue = textValue ?? getTextContent(children) ?? value;
  const isVisible =
    !ctx.searchable ||
    !ctx.searchValue.trim() ||
    ctx.filterOption({ value, textValue: resolvedTextValue }, ctx.searchValue);

  const handleSelect = () => {
    if (!disabled) ctx.onValueToggle(value);
  };

  if (!isVisible) return null;

  return (
    <MultiSelectItemContextProvider value={value} textId={textId} isSelected={isSelected}>
      <Primitive.div
        role="option"
        aria-labelledby={textId}
        aria-selected={isSelected && !disabled}
        data-value={value}
        data-highlighted={undefined}
        data-state={isSelected ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? undefined : -1}
        {...rest}
        ref={composedRef}
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
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            focusAdjacentOption(event.currentTarget, event.key === 'ArrowDown' ? 1 : -1);
          }
          if (SELECTION_KEYS.includes(event.key)) {
            event.preventDefault();
            handleSelect();
          }
        })}
      >
        {children}
      </Primitive.div>
    </MultiSelectItemContextProvider>
  );
});
Item.displayName = 'MultiSelect.Item';

export interface MultiSelectCreateItemProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  asChild?: boolean;
  value?: string;
  children?: React.ReactNode | ((value: string) => React.ReactNode);
}

const CreateItem = React.forwardRef<HTMLDivElement, MultiSelectCreateItemProps>(
  (props, forwardedRef) => {
    const { value: valueProp, children, ...rest } = props;
    const ctx = useMultiSelectContext('MultiSelect.CreateItem');
    const contentCtx = useMultiSelectContentContext('MultiSelect.CreateItem');
    const textId = useId('multi-select-create-item-text');
    const value = (valueProp ?? ctx.searchValue).trim();

    if (!ctx.searchable || !ctx.onCreateOption || !value) return null;

    const label =
      typeof children === 'function'
        ? children(value)
        : (children ??
          (typeof ctx.createOptionLabel === 'function'
            ? ctx.createOptionLabel(value)
            : (ctx.createOptionLabel ?? `Create "${value}"`)));

    const handleCreate = () => {
      ctx.onCreateOption?.(value);
      ctx.onValueAdd(value);
      ctx.onSearchValueChange('');
      ctx.searchInput?.focus({ preventScroll: true });
    };

    return (
      <Primitive.div
        role="option"
        aria-labelledby={textId}
        aria-selected={false}
        data-multi-select-create-option=""
        data-state="unchecked"
        tabIndex={-1}
        {...rest}
        ref={forwardedRef}
        onPointerMove={composeEventHandlers(rest.onPointerMove, (event) => {
          (event.currentTarget as HTMLElement).focus({ preventScroll: true });
        })}
        onPointerLeave={composeEventHandlers(rest.onPointerLeave, (event) => {
          if ((event.currentTarget as HTMLElement) === document.activeElement) {
            contentCtx.contentRef.current?.focus({ preventScroll: true });
          }
        })}
        onClick={composeEventHandlers(rest.onClick, (event) => {
          (event.currentTarget as HTMLElement).focus();
          handleCreate();
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            focusAdjacentOption(event.currentTarget, event.key === 'ArrowDown' ? 1 : -1);
          }
          if (SELECTION_KEYS.includes(event.key)) {
            event.preventDefault();
            handleCreate();
          }
        })}
      >
        <Primitive.span id={textId}>{label}</Primitive.span>
      </Primitive.div>
    );
  },
);
CreateItem.displayName = 'MultiSelect.CreateItem';

export interface MultiSelectItemTextProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

const ItemText = React.forwardRef<HTMLSpanElement, MultiSelectItemTextProps>(
  (props, forwardedRef) => {
    const itemCtx = useMultiSelectItemContext('MultiSelect.ItemText');
    return <Primitive.span id={itemCtx.textId} {...props} ref={forwardedRef} />;
  },
);
ItemText.displayName = 'MultiSelect.ItemText';

const ItemIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean }
>((props, forwardedRef) => {
  const itemCtx = useMultiSelectItemContext('MultiSelect.ItemIndicator');
  return itemCtx.isSelected ? <Primitive.span aria-hidden {...props} ref={forwardedRef} /> : null;
});
ItemIndicator.displayName = 'MultiSelect.ItemIndicator';

export interface MultiSelectOptionsProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  options: MultiSelectOption[];
  itemHeight?: number;
  overscan?: number;
  visibleItemCount?: number;
  emptyMessage?: React.ReactNode;
  itemClassName?: string;
  itemTextClassName?: string;
  itemIndicatorClassName?: string;
  renderOption?: (option: MultiSelectOption) => React.ReactNode;
  renderItemIndicator?: (option: MultiSelectOption) => React.ReactNode;
}

const Options = React.forwardRef<HTMLDivElement, MultiSelectOptionsProps>(
  (props, forwardedRef) => {
    const {
      options,
      itemHeight = 36,
      overscan = 6,
      visibleItemCount = 8,
      emptyMessage = 'No options found.',
      itemClassName,
      itemTextClassName,
      itemIndicatorClassName,
      renderOption,
      renderItemIndicator,
      style,
      ...rest
    } = props;
    const ctx = useMultiSelectContext('MultiSelect.Options');
    const { filterOption, open, searchable, searchValue, value } = ctx;
    const listRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, listRef);
    const fallbackViewportHeight = itemHeight * visibleItemCount;
    const [viewportState, setViewportState] = React.useState({
      scrollTop: 0,
      height: fallbackViewportHeight,
    });

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue.trim()) return options;
      return options.filter((option) =>
        filterOption(
          {
            value: option.value,
            textValue: getOptionTextValue(option),
          },
          searchValue,
        ),
      );
    }, [filterOption, options, searchable, searchValue]);

    React.useLayoutEffect(() => {
      const node = listRef.current;
      const scrollNode = node?.parentElement;
      if (!scrollNode) return;

      const updateViewportState = () => {
        setViewportState({
          scrollTop: scrollNode.scrollTop,
          height: scrollNode.clientHeight || fallbackViewportHeight,
        });
      };

      updateViewportState();
      scrollNode.addEventListener('scroll', updateViewportState, { passive: true });

      let resizeObserver: ResizeObserver | undefined;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(updateViewportState);
        resizeObserver.observe(scrollNode);
      }

      return () => {
        scrollNode.removeEventListener('scroll', updateViewportState);
        resizeObserver?.disconnect();
      };
    }, [fallbackViewportHeight]);

    React.useLayoutEffect(() => {
      if (!open || value.length === 0) return;
      const node = listRef.current;
      const scrollNode = node?.parentElement;
      if (!scrollNode) return;
      const selectedIndex = filteredOptions.findIndex((option) => value.includes(option.value));
      if (selectedIndex >= 0) scrollNode.scrollTop = selectedIndex * itemHeight;
    }, [open, value, filteredOptions, itemHeight]);

    if (filteredOptions.length === 0) {
      return (
        <Primitive.div role="presentation" {...rest} ref={composedRef} style={style}>
          {emptyMessage}
        </Primitive.div>
      );
    }

    const startIndex = Math.max(0, Math.floor(viewportState.scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      filteredOptions.length,
      Math.ceil((viewportState.scrollTop + viewportState.height) / itemHeight) + overscan,
    );
    const visibleOptions = filteredOptions.slice(startIndex, endIndex);
    const totalHeight = filteredOptions.length * itemHeight;

    return (
      <Primitive.div
        role="presentation"
        {...rest}
        ref={composedRef}
        style={{ position: 'relative', height: totalHeight, ...style }}
      >
        {visibleOptions.map((option, index) => {
          const top = (startIndex + index) * itemHeight;
          return (
            <Item
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              textValue={getOptionTextValue(option)}
              className={itemClassName}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: itemHeight,
                transform: `translateY(${top}px)`,
              }}
            >
              {renderItemIndicator ? (
                <Primitive.span className={itemIndicatorClassName}>
                  <ItemIndicator>{renderItemIndicator(option)}</ItemIndicator>
                </Primitive.span>
              ) : null}
              <ItemText className={itemTextClassName}>
                {renderOption ? renderOption(option) : option.label}
              </ItemText>
            </Item>
          );
        })}
      </Primitive.div>
    );
  },
);
Options.displayName = 'MultiSelect.Options';

const Group = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => <Primitive.div role="group" {...props} ref={forwardedRef} />);
Group.displayName = 'MultiSelect.Group';

const Label = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />);
Label.displayName = 'MultiSelect.Label';

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div role="separator" aria-orientation="horizontal" {...props} ref={forwardedRef} />
));
Separator.displayName = 'MultiSelect.Separator';

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase();
}

function getTextContent(node: React.ReactNode): string | undefined {
  if (node == null || typeof node === 'boolean') return undefined;
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) {
    const text = node
      .map((child) => getTextContent(child))
      .filter((child): child is string => Boolean(child))
      .join(' ')
      .trim();
    return text || undefined;
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }
  return undefined;
}

function getOptionTextValue(option: MultiSelectOption) {
  return option.textValue ?? getTextContent(option.label) ?? option.value;
}

function focusAdjacentOption(currentItem: HTMLElement, direction: 1 | -1) {
  const content = currentItem.closest('[data-multi-select-content]');
  const items = Array.from(
    content?.querySelectorAll<HTMLElement>('[role="option"]:not([data-disabled]):not([hidden])') ??
      [],
  );
  if (!items.length) return;

  const currentIndex = items.indexOf(currentItem);
  const nextIndex =
    currentIndex === -1
      ? direction === 1
        ? 0
        : items.length - 1
      : (currentIndex + direction + items.length) % items.length;
  items[nextIndex]?.focus({ preventScroll: true });
}

export {
  Root,
  Trigger,
  Value,
  Icon,
  SearchInput,
  Portal,
  Content,
  Viewport,
  Item,
  CreateItem,
  ItemText,
  ItemIndicator,
  Options,
  Group,
  Label,
  Separator,
};
